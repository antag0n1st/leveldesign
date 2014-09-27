(function (window, undefined) {

    function GameScreen() {
        this.initialize();
    }

    GameScreen.prototype = new Screen();
    GameScreen.prototype.screen_initialize = GameScreen.prototype.initialize;



    GameScreen.prototype.on_state = function (prev_state, current_state, data) {

        if (current_state.name === States.main_states.polygon_draw) {

        }

        this.end_polygon();
    };

    GameScreen.prototype.deselect_buttons = function () {

        this.polygon_button.is_selected = false;
        this.box_button.is_selected = false;
        this.circle_button.is_selected = false;
        this.point_button.is_selected = false;
        this.path_button.is_selected = false;
        this.graphics_button.is_selected = false;

    };

    GameScreen.prototype.on_modes_button = function (event, element) {

        this.deselect_buttons(); // deselect the others
        element.is_selected = true;

        if (element.tag === 0) {
            input_state.set(States.main_states.polygon_draw);
        } else if (element.tag === 1) {
            input_state.set(States.main_states.box_draw);
        } else if (element.tag === 2) {
            input_state.set(States.main_states.circle_draw);
        } else if (element.tag === 3) {
            input_state.set(States.main_states.point_draw);
        } else if (element.tag === 4) {
            input_state.set(States.main_states.path_draw);
        } else if (element.tag === 5) {
            input_state.set(States.main_states.graphics_draw);
        }

        if (this.selected_obsticle) {
            this.selected_obsticle.is_selected = false;
            this.selected_obsticle = null;
        }

    };

    GameScreen.prototype.on_undo_button = function (event) {

        if (this.queue_points.length > 0) {
            this.queue_points.splice(this.queue_points.length - 1, 1);
        } else {

            if (this.obsticles.length > 0) {
                var obsticle = this.obsticles[this.obsticles.length - 1];
                obsticle.remove_from_parent();
                this.obsticles.splice(this.obsticles.length - 1, 1);
            }

        }

    };


    GameScreen.prototype.on_snap_axis_button = function (event) {

        this.snap_axis_mode++;

        this.snap_axis_mode = this.snap_axis_mode % 3;

        if (this.snap_axis_mode == 0) {
            this.snap_axis_button.text = 'Free';
        } else if (this.snap_axis_mode == 1) {
            this.snap_axis_button.text = 'Snap X';
        } else if (this.snap_axis_mode == 2) {
            this.snap_axis_button.text = 'Snap Y';
        }

    };

    GameScreen.prototype.on_snap_axis_button_down = function (event) {
        event.stop_propagation();
    };

    GameScreen.prototype.on_undo_button_down = function (event) {
        event.stop_propagation();
    };

    GameScreen.prototype.on_modes_button_down = function (event) {
        event.stop_propagation();
    };

    GameScreen.prototype.is_point_in_obsticles = function (point) {

        for (var i = this.obsticles.length - 1; i >= 0; i--) {

            var obsticle = this.obsticles[i];
            if (obsticle.check(point)) {
                return obsticle;
            }
        }
        return false;

    };

    GameScreen.prototype.on_right_mouse_down = function (event) {

        event.point.x = Math.round(event.point.x);
        event.point.y = Math.round(event.point.y);

        if (input_state.get() === States.main_states.polygon_draw ||
                input_state.get() === States.main_states.box_draw ||
                input_state.get() === States.main_states.circle_draw ||
                input_state.get() === States.main_states.point_draw ||
                input_state.get() === States.main_states.path_draw) {

            this.end_polygon();

            if (this.queue_path !== null) {
                this.obsticles.push(this.queue_path);
                this.queue_path = null;
            }

            var collided = this.is_point_in_obsticles(event.point);
            if (collided) {
                if (collided.is_selected) {
                    collided.remove_from_parent();
                    var index = this.obsticles.indexOf(collided);
                    if (index !== -1) {
                        this.obsticles.splice(index, 1);
                    }
                }
            }

            if (this.selected_obsticle) {
                this.selected_obsticle.is_selected = false;
            }
            this.selected_obsticle = null;

        }

    };

    GameScreen.prototype.on_name_change = function (value) {
        if (this.selected_obsticle) {
            this.selected_obsticle.name = value;
        }
    };

    GameScreen.prototype.on_z_index_change = function (value) {
        if (this.selected_obsticle) {
            this.selected_obsticle.z_index = parseInt(value);
        }
    };

    GameScreen.prototype.on_type_change = function (value) {
        if (this.selected_obsticle) {
            this.selected_obsticle.type = value;
        }
    };

    GameScreen.prototype.on_tag_change = function (value) {
        if (this.selected_obsticle) {
            this.selected_obsticle.tag = value;
        }
    };

    GameScreen.prototype.on_x_change = function (value) {
        if (this.selected_obsticle) {
            this.selected_obsticle.set_position(parseInt(value), null);
        }
    };

    GameScreen.prototype.on_y_change = function (value) {
        if (this.selected_obsticle) {
            this.selected_obsticle.set_position(null, parseInt(value));
        }
    };

    GameScreen.prototype.update_inspector_with_obsticle = function (obsticle) {

//        if(obsticle){
//            
//            this.name_label.value = obsticle.name;
//            this.z_index_label.value = obsticle.z_index;
//            this.tag_label.value = obsticle.tag;
//            this.type_label.value = obsticle.type;
//            this.x_position_label.value =  obsticle.get_position().x;
//            this.y_position_label.value =  obsticle.get_position().y;
//                             
//        }else{
//            
//            this.name_label.value = '';
//            this.z_index_label.value = '';
//            this.tag_label.value = '';
//            this.type_label.value = '';
//            this.x_position_label.value = '';
//            this.y_position_label.value = '';
//        }

    };

    GameScreen.prototype.update = function () {

        var p = this.active_layer.get_position();
        var m = new Vector(game.input.point.x, game.input.point.y);
        m.sub(p);
        this.mouse_position_label.set({text: "x: " + Math.round_decimal(m.x, 2) + "  y: " + Math.round_decimal(m.y, 2)});


    };

    GameScreen.prototype.draw = function (context) {

        context.fillStyle = "#094837";
        context.fillRect(0, 0, Config.screen_width, Config.screen_height);

        Screen.prototype.draw.call(this, context);

        this.draw_path_last_point(context);
    };

    GameScreen.prototype.draw_path_last_point = function (context) {
        if (this.queue_path !== null) {

            var p = this.active_layer.bounds.pos.clone();
            var new_point = new V(game.input.point.x, game.input.point.y);

            var last_point = this.queue_path.points[this.queue_path.points.length - 1].clone();
            last_point.add(p);


            //////////////////

            if (this.snap_axis_mode === 0) {

            } else if (this.snap_axis_mode === 1) {                
                // snap x
                new_point = new V(game.input.point.x, last_point.y);
                
            } else if (this.snap_axis_mode === 2) {
                // snap y
                new_point = new V(last_point.x, game.input.point.y);
                
            }
            
            this.queue_path.buffer_point = new_point.clone().sub(p);

            context.beginPath();
            context.moveTo(last_point.x, last_point.y);
            context.lineTo(new_point.x, new_point.y);
            context.closePath();
            context.stroke();
        }


    };

    GameScreen.prototype.on_draw_finished = function (context) {
        Screen.prototype.on_draw_finished.call(this, context);

        this.draw_queue(context);

        var strokeStyle = context.strokeStyle;
        var lineWidth = context.lineWidth;

        context.lineWidth = 1;
        context.strokeStyle = 'white';

        context.beginPath();

        var p = this.active_layer.bounds.pos.clone();

        context.moveTo(p.x + 0, p.y - this.height);
        context.lineTo(p.x + 0, p.y + this.height);

        context.moveTo(p.x - this.width, p.y);
        context.lineTo(p.x + this.width, p.y);

        context.stroke();
        context.closePath();

        context.strokeStyle = strokeStyle;

        context.lineWidth = lineWidth;
    };

    GameScreen.prototype.export_polygons = function () {
        this.end_polygon();
        // console.log(JSON.stringify(this.obsticles));

        var json = [];
        var the_pos = this.active_layer.position.clone();
        this.active_layer.set_position(0, 0);

        var create_string = "";

        for (var i = 0; i < this.obsticles.length; i++) {
            var o = {};
            o.pos = this.obsticles[i].bounds.pos;
            o.points = this.obsticles[i].bounds.points;
            json.push(o);

            create_string += " var bounds = new Polygon(new Vector(" + 0 + "," + 0 + "), [";
            for (var j = 0; j < o.points.length; j++) {
                var pp = o.points[j];
                create_string += " new Vector(" + pp.x + "," + pp.y + "),";
            }
            create_string = create_string.slice(0, -1);
            create_string += " ]); ";
            create_string += " bounds.translate(" + o.pos.x + "," + o.pos.y + "); ";

        }

        log(JSON.stringify(json));
        log("");
        log(create_string);


        this.active_layer.set_position(the_pos.x, the_pos.y);

    };

    GameScreen.prototype.draw_queue = function (context) {

        context.fillStyle = '#f00';
        context.beginPath();
        var alpha = context.globalAlpha;

        context.globalAlpha = 0.3;

        var p = this.active_layer.get_position();

        var first = true;
        for (var ind in this.queue_points) {

            var c = this.queue_points[ind].clone();
            c.add(p);

            if (first) {
                first = false;
                context.moveTo(c.x, c.y);
            } else {
                context.lineTo(c.x, c.y);
            }
        }


        if (this.queue_points.length > 0 && !this.is_space_pressed) {

            var last = this.queue_points[this.queue_points.length - 1].clone();
            last.add(p);

            if (this.snap_axis_mode === 0) {
                context.lineTo(game.input.point.x, game.input.point.y);

                if (this.queue_path !== null) {
                    this.queue_path.buffer_point = new V(game.input.point.x, game.input.point.y);
                }

            } else if (this.snap_axis_mode === 1) {
                context.lineTo(game.input.point.x, last.y);
                if (this.queue_path !== null) {
                    this.queue_path.buffer_point = new V(game.input.point.x, last.y);
                }
            } else if (this.snap_axis_mode === 2) {
                context.lineTo(last.x, game.input.point.y);
                if (this.queue_path !== null) {
                    this.queue_path.buffer_point = new V(last.x, game.input.point.y);
                }
            }


        }

        context.closePath();

        context.fill();
        context.stroke();

        context.globalAlpha = alpha;

    };



    GameScreen.prototype.show = function () {
        Screen.prototype.show.call(this);
        game.input.add(this);
        game.input.add(this.polygon_button);
        game.input.add(this.box_button);
        game.input.add(this.circle_button);
        game.input.add(this.point_button);
        game.input.add(this.path_button);
        game.input.add(this.graphics_button);

        game.input.add(this.undo_button);
        game.input.add(this.snap_axis_button);
    };

    GameScreen.prototype.hide = function () {
        Screen.prototype.hide.call(this);
    };

    GameScreen.prototype.end_polygon = function () {
        // create polygon 
        if (this.queue_points.length > 2) {

            var o = this.queue_points;
            var polygon_vectors = [];
            var first_vector;
            for (var j = 0; j < o.length; j++) {
                var v = o[j];
                var current_vector = new SAT.Vector(v.x, v.y);
                if (j === 0) {
                    first_vector = new SAT.Vector(v.x, v.y);
                }
                polygon_vectors.push(current_vector.sub(first_vector));
            }
            var cv = new SAT.Polygon(new SAT.Vector(0, 0), polygon_vectors);
            cv.pos = first_vector.sub(this.get_position());
            cv.recalc();

            var obsticle = new Obsticle();
            obsticle.bounds = cv;
            obsticle.set_position(cv.pos.x, cv.pos.y);

            // check if it is counter clockwise

            var sum = 0.0;
            for (var i = 0; i < obsticle.bounds.points.length; i++) {
                var v1 = obsticle.bounds.points[i];
                var v2 = obsticle.bounds.points[(i + 1) % obsticle.bounds.points.length];
                sum += (v2.x - v1.x) * (v2.y + v1.y);
            }

            if (sum < 0) {

                this.obsticles.push(obsticle);
                this.active_layer.add_child(obsticle);

            } else {
                alert("polygon points must be defined clockwise");
            }

        }
        this.queue_points = [];
        return false;
    };

    window.GameScreen = GameScreen;

}(window));