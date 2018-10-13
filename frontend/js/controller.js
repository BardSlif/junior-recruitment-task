class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        
        // Handle 'update' call from model
        model.handle('update', () => this.renderView());

        // Start with fetching task list from API
        model.fetchTasks();
    }

    /**
     * Render view
     */

    renderView() {
        return this.view.render(this.model.tasks);
    }
}

export default Controller;