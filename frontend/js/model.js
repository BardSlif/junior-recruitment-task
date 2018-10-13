import { EventEmitter } from './extra.js'


class Model extends EventEmitter {
    constructor() {
        super();
        this.tasks = [];
    }

    /**
     * Fetch data from API
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
     * Get fetched array of data and itarate over them to call addTask function
     * @param {array} data fetched array of data
     */

    addFetchedData(data) {
        //console.log(data);
        this.tasks = [...data];
        this.emit('update');
    }

}

export default Model;