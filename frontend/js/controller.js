class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // Handle 'update' call from model
        model.handle('update', () => this.renderView());

        //Handle 'add' call from view 
        view.handle('add', (data) => this.addTask(data));

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
     * Render view
     */

    renderView() {
        return this.view.render(this.model.tasks);
    }
}

export default Controller;