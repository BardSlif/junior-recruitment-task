import { EventEmitter } from './extra.js'
import { setAttributes } from './extra.js'

class View extends EventEmitter {
    constructor() {
        super();

        //Section container
        this.toDoListContainer = document.querySelector('.to-do-list-container');

        //Tasks container
        this.tasksListNode = document.querySelector('.list-of-tasks');

        //Create new task button and event handler
        this.addTaskButton = document.querySelector('.add-task-button');
        this.addTaskButton.addEventListener('click', (evt) => { this.validateInput(evt) })
        this.inputField = document.getElementById('text-field');
    }

    /**
     * Validate input, if it's not empty emit 'add' function 
     * @param {object} evt event
     */

    validateInput(evt) {
        evt.preventDefault();
        if (!this.inputField.value) {
            return this.createStatusInfo(false, 'Input value cannot be empty!');
        }

        return this.emit('add', this.inputField.value);
    }

    /**
     * Add event listeners to the elements in list node element
     * @param {object} item 'li' element
     */

    addEventListeners(item) {

        const trashIcon = item.querySelector('.trash-icon');
        const checkBox = item.querySelector('input[type=checkbox]');

        trashIcon.addEventListener('click', (e) => this.handleRemove(e));
        checkBox.addEventListener('click', (e) => this.handleStatus(e));

        return item;
    }

    /**
     * Create message to communicate error or success when action is taken
     * @param {boolean} isSuccess type of message
     * @param {String} info output message
     */

    createStatusInfo(isSuccess = null, info) {

        this.toDoListContainer.insertAdjacentHTML('beforebegin',
            `<h2 class='operation-info ${isSuccess ? 'success' : 'error'}'>${info}</h2>`
        );

        setTimeout(() => {
            const elem = document.querySelector('.operation-info');
            elem.parentNode.removeChild(elem);
        }, 1500)

    }

    /**
     * Get ID and emit 'update' function
     * @param {obj} evt event
     */

    handleStatus(evt) {
        const element = evt.target;
        const id = parseInt(element.id.substring(5));

        return this.emit('update', id);
    }

    /**
     * Get ID and emit 'remove' function
     * @param {obj} evt event 
     */

    handleRemove(evt) {
        const item = evt.target;
        const id = parseInt(item.dataset.id);

        return this.emit('remove', id);
    }

    /**
     * Based on object data create task element
     * @param {object} item task object data 
     */

    createTask(item) {

        // Create elements for tasks
        const newElement = document.createElement('li');
        const newInput = document.createElement('input');
        const newLabel = document.createElement('label');
        const newImgDiv = document.createElement('div');

        //Set attributes for 'li' 
        setAttributes(newElement, { draggable: true, class: 'container-row' });

        //Set attributes for checkbox 'input'
        setAttributes(newInput, { type: 'checkbox', id: `item-${item.id}`, name: `${item.title}`, value: `${item.title}` });
        item.isComplete ? newInput.setAttribute('checked', '') : '';

        //Set attributes for 'label'
        setAttributes(newLabel, { for: `item-${item.id}` });
        newLabel.innerText = `${item.title}`;

        //Set attributes for 'div' with trash icon
        setAttributes(newImgDiv, { 'data-id': `${item.id}`, class: 'trash-icon' });

        //Append elements in li
        newElement.appendChild(newInput);
        newElement.appendChild(newLabel);
        newElement.appendChild(newImgDiv);

        //Add event listeners
        return this.addEventListeners(newElement);
    }

    /**
     * Call createTask and append to the parent element
     * @param {object} item 
     */

    addTask(item) {
        this.inputField.value = '';

        const element = this.createTask(item);
        return this.tasksListNode.appendChild(element);
    }

    /**
     * Clear view, iterate over taskList to render tasks
     * @param {array} tasksList task array from model 
     */

    render(tasksList) {

        this.tasksListNode.innerHTML = '';

        tasksList.forEach(element => {
            this.addTask(element);
        });

    }

}

export default View;