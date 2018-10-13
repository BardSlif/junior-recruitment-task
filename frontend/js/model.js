import { EventEmitter } from './extra.js'


class Model extends EventEmitter {
    constructor() {
        super();
        this.tasks = [];
        //Boolean for initial loading information
        this.start = true;
    }

    /**
     * GET all data from API
     */

    fetchTasks() {

        this.tasks = [];

        fetch('https://todo-simple-api.herokuapp.com/todos', {
            method: 'GET',
        })
            .then(response => response.json())
            .then(res => this.addFetchedData(res.data))
            .catch((e) => this.emit('state', { string: e, isSuccess: false }));

            if (this.start) {
                this.emit('loadingState', {string: 'Loading...', state: true});
            }
            
    }

    /**
     * Get fetched array of data and add them to this.tasks
     * @param {array} data fetched array of data
     */

    addFetchedData(data) {
        //console.log(data);
        this.tasks = [...data];
        this.emit('update');
        if (this.start) {
            this.emit('loadingState', {string: '', state: false})
            this.start = false;
        }
    }

    /**
     * Add single task
     * @param {object} data task
     */

    addSingleTask(data) {
        this.tasks.push(data);
        this.emit('update');
    }

    /**
     * POST task to the API
     * @param {data} data task 
     */

    newTask(data) {

        const headers = {
            "Content-Type": "application/json",
        }

        const successString = 'Added new task!';

        fetch('https://todo-simple-api.herokuapp.com/todos', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(res => this.addSingleTask(res.data))
            .then(() => this.emit('state', { string: successString, isSuccess: true }))
            .catch((e) => this.emit('state', { string: e, isSuccess: false }));
    }


    /**
     * DELETE task from API and fetch tasks again
     * @param {number} id 
     */

    removeTask(id) {

        const successString = 'Selected task removed!';

        fetch(`https://todo-simple-api.herokuapp.com/todos/${id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(() => this.emit('state', { string: successString, isSuccess: true }))
            .then(() => this.fetchTasks())
            .catch((e) => this.emit('state', { string: e, isSuccess: false }))
    }

    /**
     * Get object by id, update it with PUT and fetch tasks again
     * @param {number} id of task
     */

    updateTask(id) {

        //Find object by ID
        const object = this.tasks.filter(element => element.id === id);
        //It's 1-length array so get the first element - object
        const obj = object[0];

        const successString = 'Selected task updated!';

        const headers = {
            "Content-Type": "application/json",
        }

        fetch(`https://todo-simple-api.herokuapp.com/todos/${id}`, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify({
                title: obj.title,
                description: obj.description,
                isComplete: !obj.isComplete
            })
        })
            .then(response => response.json())
            .then(() => this.emit('state', { string: successString, isSuccess: true }))
            .then(() => this.fetchTasks())
            .catch((e) => this.emit('state', { string: e, isSuccess: false }));
    }

}

export default Model;