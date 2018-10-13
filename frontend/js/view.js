import { EventEmitter } from './extra.js'
import { setAttributes } from './extra.js'

class View extends EventEmitter {
    constructor() {
        super();
        //List container
        this.tasksListNode = document.querySelector('.list-of-tasks');

        //Create new task button and event handler
        this.addTaskButton = document.querySelector('.add-task-button');
        this.addTaskButton.addEventListener('click', (evt) => { this.validateInput(evt) })
        this.inputField = document.getElementById('text-field');
    }

    /**
     * Validate input, if not empty emit 'add' function 
     * @param {objet} evt  
     */

    validateInput(evt) {
        evt.preventDefault();
        if (!this.inputField.value) {
            return console.log('nope');
        }

        this.emit('add', this.inputField.value);
    }

    /**
     * Add event listeners to the elements in list node element
     * @param {object} item 'li' element
     */

    addEventListeners(item) {

        const trashIcon = item.querySelector('.trash-icon');
        trashIcon.addEventListener('click', (e) => this.handleRemove(e));

        return item;
    }

    /**
     * Get ID and emit 'remove' function
     * @param {obj} evt event 
     */

    handleRemove(evt) {
        const item = evt.target;
        const id = parseInt(item.dataset.id);

        this.emit('remove', id);
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
        const element = this.createTask(item);
        this.tasksListNode.appendChild(element);
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