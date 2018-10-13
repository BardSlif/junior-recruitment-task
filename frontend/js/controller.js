class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // Handle 'update' call from model
        model.handle('update', () => this.renderView());
        //Handle 'status' call from model
        model.handle('status', (status) => this.showStatusInfo(status));

        //Handle 'add' call from view 
        view.handle('add', (data) => this.addTask(data));
        //Handle 'remove' call from view
        view.handle('remove', (id) => this.removeTask(id));
        //Handle 'update' from view
        view.handle('update', (id) => this.updateTask(id));

        // Start with fetching task list from API
        model.fetchTasks();
    }

    /**
     * Get input value, create object and call newTask
     * @param {String} title text input value 
     */

    addTask(title) {

        return this.model.newTask({
            title: title,
            description: '',
            isComplete: false
        })
    }

    /**
     * Call removTask function
     * @param {number} id number of task
     */

    removeTask(id) {
        return this.model.removeTask(id);
    }

    /**
     * Call updateTask function
     * @param {number} id number of task
     */

    updateTask(id) {
        return this.model.updateTask(id);
    }

    /**
     * Call createStatusInfo function with proper message type 
     * @param {object} status  success or error
     */

    showStatusInfo(status) {
        return this.view.createStatusInfo(status.isSuccess, status.string);
    }

    /**
     * Render view
     */

    renderView() {
        return this.view.render(this.model.tasks);
    }
}

export default Controller;