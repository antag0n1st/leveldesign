GameScreen.prototype.on_right_mouse_down = function (event) {

    if (!this.active_layer.is_visible) { // do not interact with invisible layers
        return;
    }

    event.point.x = Math.round(event.point.x);
    event.point.y = Math.round(event.point.y);

    if (input_state.get() === States.main_states.polygon_draw ||
            input_state.get() === States.main_states.box_draw ||
            input_state.get() === States.main_states.circle_draw ||
            input_state.get() === States.main_states.point_draw ||
            input_state.get() === States.main_states.path_draw ||
            input_state.get() === States.main_states.graphics_draw) {

        this.end_polygon();

        if (this.queue_path !== null) {
            this.obsticles.push(this.queue_path);
            this.queue_path = null;
        }

        var collided = this.is_point_in_obsticles(event.point);
        if (collided) {
            if (collided.is_selected) {
                this.remove_obsticle(collided);
                collided.remove_from_parent();
            }
        }

        if (this.selected_obsticle) {
            this.selected_obsticle.is_selected = false;
        }
        this.selected_obsticle = null;

    }

    if (input_state.get() === States.main_states.graphics_draw) {
        this.deselect_images();
        this.deselect_graphics();
    }

    this.update_inspector_with_obsticle();

};