GameScreen.prototype.on_mouse_down = function (event) {

    event.point.x = Math.round(event.point.x);
    event.point.y = Math.round(event.point.y);

    this.start_drag_point = new Vector(event.point.x, event.point.y);

    if (this.is_space_pressed) {

        this.start_drag_point = new Vector(event.point.x, event.point.y);
        this.start_drag_screen_position = new Vector(this.active_layer.get_position().x, this.active_layer.get_position().y);
        this.last_move_position = new Vector(this.start_drag_point.x, this.start_drag_point.y);

    }

    if (input_state.get() === States.main_states.box_draw && !this.is_space_pressed) {

        if (this.queue_box === null) {
            var p = this.active_layer.get_position();
            var pp = new Vector(event.point.x, event.point.y);
            pp.sub(p);
            this.box_reference_point.copy(pp);
        }
    }

    if (input_state.get() === States.main_states.circle_draw && !this.is_space_pressed) {

        if (this.queue_circle === null) {
            var p = this.active_layer.get_position();
            var pp = new Vector(event.point.x, event.point.y);
            pp.sub(p);
            this.circle_reference_poiont.copy(pp);
        }
    }


};