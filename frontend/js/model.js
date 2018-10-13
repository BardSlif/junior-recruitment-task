import { EventEmitter } from './extra.js'


class Model extends EventEmitter {
    constructor() {
        super();
        this.tasks = [];
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
            .catch((e) => console.log(e));
    }

    /**
     * Get fetched array of data and add them to this.tasks
     * @param {array} data fetched array of data
     */

    addFetchedData(data) {
        //console.log(data);
        this.tasks = [...data];
        this.emit('update');
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

        fetch('https://todo-simple-api.herokuapp.com/todos', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(res => this.addSingleTask(res.data))
            .catch((e) => console.log(e));
    }


    /**
     * DELETE task from API and fetch tasks again
     * @param {number} id 
     */

    removeTask(id) {

        fetch(`https://todo-simple-api.herokuapp.com/todos/${id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(() => this.fetchTasks())
            .catch((e) => console.log(e));
    }

}

export default Model;