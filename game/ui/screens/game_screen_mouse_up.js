GameScreen.prototype.on_mouse_up = function (event) {

    event.point.x = Math.round(event.point.x);
    event.point.y = Math.round(event.point.y);

    var p = this.active_layer.get_position();
    var pp = new Vector(event.point.x, event.point.y);
    pp.sub(p);


    if (input_state.get() === States.main_states.polygon_draw && !this.is_space_pressed) {


        // determine the snap acording the last point
        if (this.queue_points.length > 0) {
            var last = this.queue_points[this.queue_points.length - 1];
            if (this.snap_axis_mode === 1) {
                pp.y = last.y;
            } else if (this.snap_axis_mode === 2) {
                pp.x = last.x;
            }
        }

        this.queue_points.push(pp);



    } else if (input_state.get() === States.main_states.box_draw && !this.is_space_pressed) {

        if (this.queue_box !== null && !this.selected_obsticle) {
            //  this.box_reference_point.copy(pp);
            this.obsticles.push(this.queue_box);
            this.queue_box = null;
            this.selected_obsticle = null;

        }

    }


    if (!this.is_space_pressed &&
            (input_state.get() === States.main_states.polygon_draw ||
                    input_state.get() === States.main_states.box_draw ||
                    input_state.get() === States.main_states.circle_draw ||
                    input_state.get() === States.main_states.point_draw ||
                    input_state.get() === States.main_states.path_draw)) {



        // check if we are selecting existing polugon
        // but first deselect all of them
        for (var i = 0; i < this.obsticles.length; i++) {
            if (this.obsticles[i].is_selected) {
                this.obsticles[i].is_selected = false;
                this.selected_obsticle = null;
                this.end_polygon(); // it will remove the previous point added
                this.update_inspector_with_obsticle(null);
            }
        }


        if (this.queue_points.length < 2 && !this.mouse_has_moved && this.queue_path === null) {
            var collided = this.is_point_in_obsticles(event.point);
            if (collided) {
                collided.is_selected = true;
                this.start_obsticle_position = new Vector(collided.get_position().x, collided.get_position().y);
                this.selected_obsticle = collided;

                this.update_inspector_with_obsticle(collided);

                this.end_polygon(); // it will remove the previous point added


            }

        }
    }

    if (!this.is_space_pressed && input_state.get() === States.main_states.circle_draw) {

        if (this.queue_circle !== null && !this.selected_obsticle) {
            this.obsticles.push(this.queue_circle);
            this.queue_circle = null;
            this.selected_obsticle = null;
        }
    }

    if (input_state.get() === States.main_states.point_draw && !this.is_space_pressed) {

        var collided = this.is_point_in_obsticles(event.point);

        if (collided) {

        } else {
            var p = this.active_layer.get_position();
            var pp = new Vector(event.point.x, event.point.y);
            pp.sub(p);

            var obsticle = new Obsticle();
            var bb = new Circle(new V().copy(pp), 10);
            obsticle.bounds = bb;
            obsticle.normal_color = 'yellow';
            obsticle.set_position(bb.pos.x, bb.pos.y);
            this.obsticles.push(obsticle);
            this.active_layer.add_child(obsticle);
        }



    }

    if (input_state.get() === States.main_states.path_draw && !this.is_space_pressed) {


        if(!this.selected_obsticle && !this.mouse_has_moved){
            var p = this.active_layer.get_position();
            var pp = new Vector(event.point.x, event.point.y);
            pp.sub(p);

            if (this.queue_path === null) {
                this.queue_path = new Path();
                this.queue_path.add_point(pp);
                this.active_layer.add_child(this.queue_path);
            } else {
                this.queue_path.add_point(pp);
            }
        }



    }

    this.mouse_has_moved = false;
};