class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // Handle 'update' call from model
        model.handle('update', () => this.renderView());

        //Handle 'add' call from view 
        view.handle('add', (data) => this.addTask(data));
        //Handle 'remove call' from view
        view.handle('remove', (id) => this.removeTask(id));

        // Start with fetching task list from API
        model.fetchTasks();
    }

    /**
     * Get input value, create object and call newTask
     * @param {String} title text input value 
     */

    addTask(title) {

        this.model.newTask({
            title: title,
            description: '',
            isComplete: false
        })
    }

    /**
     * Call removTask function
     * @param {number} id id number of task
     */

    removeTask(id) {
        this.model.removeTask(id);
    }

    /**
     * Render view
     */

    renderView() {
        return this.view.render(this.model.tasks);
    }
}

export default Controller;