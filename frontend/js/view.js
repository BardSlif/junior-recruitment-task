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

        //Dragged item
        this.dragItem = null;
    }

    /**
     * Validate input, if it's not empty emit 'add' function 
     * @param {event} evt 
     */

    validateInput(evt) {
        evt.preventDefault();
        if (!this.inputField.value) {
            return this.createStateInfo(false, 'Input value cannot be empty!');
        }

        return this.emit('add', this.inputField.value);
    }

    /**
     * Add event listeners to the elements in list node element
     * @param {object} item 'li' element
     */

    addEventListeners(item) {

        this.dragAndDropFunc(item);

        const trashIcon = item.querySelector('.trash-icon');
        const checkBox = item.querySelector('input[type=checkbox]');

        trashIcon.addEventListener('click', (e) => this.handleRemove(e));
        checkBox.addEventListener('click', (e) => this.handleStatus(e));

        return item;
    }

    /**
     * Display loading information at initial fetch
     * @param {object} state 
     */
    
    createLoadingStateInfo(state) {

        if (state.state == true) {
            this.toDoListContainer.insertAdjacentHTML('beforebegin',
                `<h2 class='operation-info'>${state.string}</h2>`
            );
        }
        else {
            const elem = document.querySelector('.operation-info');
            elem.parentNode.removeChild(elem);
        }
    }

    /**
     * Create message to communicate error or success when action is taken
     * @param {boolean} isSuccess type of message
     * @param {String} info output message
     */

    createStateInfo(isSuccess = null, info) {

        this.toDoListContainer.insertAdjacentHTML('beforebegin',
            `<h2 class='operation-info ${isSuccess ? 'success' : 'error'}'>${info}</h2>`
        );

        setTimeout(() => {
            const elem = document.querySelector('.operation-info');
            elem.parentNode.removeChild(elem);
        }, 1000)

    }

    /**
     * Get ID and emit 'update' function
     * @param {event} evt 
     */

    handleStatus(evt) {
        const element = evt.target;
        const id = parseInt(element.id.substring(5));

        return this.emit('update', id);
    }

    /**
     * Get ID and emit 'remove' function
     * @param {event} evt  
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

    /**
     * Add drag and drop functionality by adding event listeners
     * @param {object} item li element 
     */

    dragAndDropFunc(item) {
        item.addEventListener('dragstart', (evt) => this.handleDragStart(evt));
        item.addEventListener('dragover', (evt) => this.handleDragOver(evt));
        item.addEventListener('dragleave', (evt) => this.handleDragLeave(evt));
        item.addEventListener('dragend', (evt) => this.handleDragEnd(evt));
        item.addEventListener('drop', (evt) => this.handleDrop(evt));
    }

    /**
     * When drag is started
     * @param {event} evt drag event
     */

    handleDragStart(evt) {

        this.dragItem = evt.target;

        evt.dataTransfer.effectAllowed = 'move';
        evt.dataTransfer.setData('text/html', evt.target.outerHTML);
        evt.target.classList.add('drag-item');
    }

    /**
     * When dragging over 
     * @param {event} evt drag event
     */

    handleDragOver(evt) {
        evt.preventDefault();

        evt.target.classList.add('over');
        evt.dataTransfer.dropEffect = 'move';

    }

    /**
     * When dragged element leaves a valid drop target
     * @param {event} evt drag event
     */

    handleDragLeave(evt) {
        evt.target.classList.remove('over');
    }

    /**
     * When finish drag event
     * @param {event} evt drag event
     */

    handleDragEnd(evt) {
        evt.target.classList.remove('over');
    }

    /**
     * When drop dragged element
     * @param {event} evt drop event
     */

    handleDrop(evt) {

        evt.stopPropagation();

        // Don't do anything if dropping the same column u started to drag
        if (this.dragItem != evt.target) {
            evt.target.parentNode.removeChild(this.dragItem);
            const dropHTML = evt.dataTransfer.getData('text/html');
            evt.target.insertAdjacentHTML('beforebegin', dropHTML);
            const dropElem = evt.target.previousSibling;
            this.dragAndDropFunc(dropElem);
        }

        evt.target.classList.remove('over');

    }
}

export default View;