(function (window, undefined) {

    function GameScreen() {
        this.initialize();
    }

    GameScreen.prototype = new Screen();
    GameScreen.prototype.screen_initialize = GameScreen.prototype.initialize;

    GameScreen.prototype.initialize = function () {
        this.screen_initialize();
        game.input.snap_mode = true;

        this.obsticles = [];
        this.queue_points = [];
        this.queue_box = null;
        this.queue_circle = null;
        this.layers = [];
        this.mouse_has_moved = false;

        var layer = new Layer();
        layer.set_position(Config.screen_width / 2, Config.screen_height / 2);
        layer.set_size(Config.screen_width, Config.screen_height);
        this.layers.push(layer);
        this.add_child(layer);

        this.active_layer = layer;


        //////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////








//        knight = new SpineAnimation('child');
//        knight.set_position(0,0);
//        knight.play('run');
//        //knight.set_scale(0.4,0.4);
//        knight.z_index = -10;
//        this.active_layer.add_child(knight);
//        Config.slow_motion_factor = 0.2;











        ////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////

        this.start_drag_point = new Vector();
        this.start_drag_screen_position = new Vector();
        this.last_move_position = new Vector();
        this.start_obsticle_position = new Vector();
        this.box_reference_point = new Vector();
        this.circle_reference_poiont = new Vector();

        this.snap_axis_mode = 0;

        this.name_label = document.getElementById('name');
        this.z_index_label = document.getElementById('z_index');
        this.tag_label = document.getElementById('tag');
        this.type_label = document.getElementById('type');
        this.x_position_label = document.getElementById('x_position');
        this.y_position_label = document.getElementById('y_position');

        var button_distance = 100;
        var button_padding = 10;
        
        /////////////// mode buttons

        // polygon
        this.polygon_button = new Button({image: Images.blank_black,selected_image:Images.blank_black_highlighted});
        this.polygon_button.tag = 0;
        this.polygon_button.is_selected = true;
        this.polygon_button.text = "Polygon";
        this.polygon_button.text_color = "#ffffff";
        this.polygon_button.set_position(button_padding + button_distance * 0, 20);
        this.polygon_button.on_mouse_up = GameScreen.prototype.on_modes_button.bind(this);
        this.polygon_button.on_mouse_down = GameScreen.prototype.on_modes_button_down.bind(this);
        
        //box
        this.box_button = new Button({image: Images.blank_black,selected_image:Images.blank_black_highlighted});
        this.box_button.tag = 1;
        this.box_button.text = "Box";
        this.box_button.text_color = "#ffffff";
        this.box_button.set_position(button_padding + button_distance * 1, 20);
        this.box_button.on_mouse_up = GameScreen.prototype.on_modes_button.bind(this);
        this.box_button.on_mouse_down = GameScreen.prototype.on_modes_button_down.bind(this);
        
        // circle
        this.circle_button = new Button({image: Images.blank_black,selected_image:Images.blank_black_highlighted});
        this.circle_button.tag = 2;
        this.circle_button.text = "Circle";
        this.circle_button.text_color = "#ffffff";
        this.circle_button.set_position(button_padding + button_distance * 2, 20);
        this.circle_button.on_mouse_up = GameScreen.prototype.on_modes_button.bind(this);
        this.circle_button.on_mouse_down = GameScreen.prototype.on_modes_button_down.bind(this);
        
        // point
        this.point_button = new Button({image: Images.blank_black,selected_image:Images.blank_black_highlighted});
        this.point_button.tag = 3;
        this.point_button.text = "Point";
        this.point_button.text_color = "#ffffff";
        this.point_button.set_position(button_padding + button_distance * 3, 20);
        this.point_button.on_mouse_up = GameScreen.prototype.on_modes_button.bind(this);
        this.point_button.on_mouse_down = GameScreen.prototype.on_modes_button_down.bind(this);
        
        // path
        this.path_button = new Button({image: Images.blank_black,selected_image:Images.blank_black_highlighted});
        this.path_button.tag = 4;
        this.path_button.text = "Path";
        this.path_button.text_color = "#ffffff";
        this.path_button.set_position(button_padding + button_distance * 4, 20);
        this.path_button.on_mouse_up = GameScreen.prototype.on_modes_button.bind(this);
        this.path_button.on_mouse_down = GameScreen.prototype.on_modes_button_down.bind(this);
        
        // grapics
        this.graphics_button = new Button({image: Images.blank_black,selected_image:Images.blank_black_highlighted});
        this.graphics_button.tag = 5;
        this.graphics_button.text = "Graphics";
        this.graphics_button.text_color = "#ffffff";
        this.graphics_button.set_position(button_padding + button_distance * 5, 20);
        this.graphics_button.on_mouse_up = GameScreen.prototype.on_modes_button.bind(this);
        this.graphics_button.on_mouse_down = GameScreen.prototype.on_modes_button_down.bind(this);
        
        ////////////////////////////////

        this.undo_button = new Button({image: Images.blank_black});
        this.undo_button.text_color = "#ffffff";
        this.undo_button.text = "Undo";
        this.undo_button.set_position(button_padding + button_distance * 7, 20);
        this.undo_button.on_mouse_up = GameScreen.prototype.on_undo_button.bind(this);
        this.undo_button.on_mouse_down = GameScreen.prototype.on_undo_button_down.bind(this);       

        this.snap_axis_button = new Button({image: Images.blank_black});
        this.snap_axis_button.text_color = "#ffffff";
        this.snap_axis_button.text = "Free Mode";
        this.snap_axis_button.set_position(button_padding + button_distance * 8, 20);
        this.snap_axis_button.on_mouse_up = GameScreen.prototype.on_snap_axis_button.bind(this);
        this.snap_axis_button.on_mouse_down = GameScreen.prototype.on_snap_axis_button_down.bind(this);

        this.mouse_position_label = new Label();
        this.mouse_position_label.set({text: "x:0  y:0", text_color: "#ffffff"});
        this.mouse_position_label.set_position(20, 60);

        this.modes = [
            States.main_states.polygon_draw,
            States.main_states.box_draw,
            States.main_states.circle_draw,
            States.main_states.point_draw,            
            States.main_states.path_draw,
            States.main_states.graphics_draw
        ];
        this.mode_count = 0;

        this.current_mode = 'polygon';

        this.current_mode = this.modes[this.mode_count % this.modes.length];

        this.add_child(this.polygon_button);
        this.add_child(this.box_button);
        this.add_child(this.circle_button);
        this.add_child(this.point_button);
        this.add_child(this.path_button);
        this.add_child(this.graphics_button);
        
        this.add_child(this.mouse_position_label);
        this.add_child(this.undo_button);
        this.add_child(this.snap_axis_button);

        input_state.subscribe('*', this);

        input_state.set(States.main_states.polygon_draw);

        this.is_space_pressed = false;
        var that = this;

        this.kibo = new Kibo();

        this.kibo.down('space', function () {
            that.is_space_pressed = true;
            game.stage.context.canvas.style.cursor = 'pointer';
        });

        this.kibo.up('space', function () {
            that.is_space_pressed = false;
            game.stage.context.canvas.style.cursor = 'default';
        });



    };

    GameScreen.prototype.on_state = function (prev_state, current_state, data) {
        
        if (current_state.name === States.main_states.polygon_draw) {

        }

        this.end_polygon();

    };
    
    GameScreen.prototype.deselect_buttons = function(){
        
        this.polygon_button.is_selected = false;
        this.box_button.is_selected = false;
        this.circle_button.is_selected = false;
        this.point_button.is_selected = false;
        this.path_button.is_selected = false;
        this.graphics_button.is_selected = false;
        
    };

    GameScreen.prototype.on_modes_button = function (event,element) {
      
      this.deselect_buttons(); // deselect the others
      element.is_selected = true;
            
        if(element.tag === 0){
            input_state.set(States.main_states.polygon_draw);
        }else if(element.tag === 1){
            input_state.set(States.main_states.box_draw);
        }else if(element.tag === 2){
            input_state.set(States.main_states.circle_draw);
        }else if(element.tag === 3){
            input_state.set(States.main_states.point_draw);
        }else if(element.tag === 4){
            input_state.set(States.main_states.path_draw);
        }else if(element.tag === 5){
            input_state.set(States.main_states.graphics_draw);
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

    

    GameScreen.prototype.on_mouse_move = function (event) {
        
        this.mouse_has_moved = true;        
        event.point.x = Math.round(event.point.x);
        event.point.y = Math.round(event.point.y);
        
        if (this.is_space_pressed) {

            if (!game.input.snap_mode) {
                alert("Can't move the screen position in Free Mode");
                return;
            }

            var v = new V(event.point.x, event.point.y);
            v.sub(this.start_drag_point.clone());
            var p = this.start_drag_screen_position.clone().add(v);

            this.active_layer.set_position(p.x, p.y);

            if (this.queue_points.length > 0) {

                // lets move some points

                var v = new V(event.point.x, event.point.y);
                v.sub(this.last_move_position.clone());

                for (var i = 0; i < this.queue_points.length; i++) {
                    //   this.queue_points[i].add(v);
                }

                this.last_move_position = new V(event.point.x, event.point.y);

            }

        } else {

            // we are probably moveing some polgons

            for (var i = 0; i < this.obsticles.length; i++) {
                var obsticle = this.obsticles[i];

                if (obsticle.is_selected) {
                    // move the obsticle
                    var v = new V(event.point.x, event.point.y);
                    v.sub(this.start_drag_point.clone());
                    var p = this.start_obsticle_position.clone().add(v);

                    obsticle.set_position(p.x, p.y);
                    this.update_inspector_with_obsticle(obsticle);
                    break;
                }

            }

            if (input_state.get() === States.main_states.box_draw && !this.selected_obsticle) {

                var bp = new Vector().copy(this.box_reference_point);


                var v = new V(event.point.x, event.point.y).sub(this.active_layer.get_position());

                var width = v.x - bp.x;
                var height = v.y - bp.y;

                if (width < 0) {
                    bp.x += width;
                    width *= -1;
                }

                if (height < 0) {
                    bp.y += height;
                    height *= -1;
                }

                if (width > 2 && height > 2) {
                    if (this.queue_box) {
                        this.queue_box.remove_from_parent();
                    }

                    this.queue_box = new Obsticle();
                    var bb = new Box(bp, width, height).toPolygon();
                    this.queue_box.bounds = bb;
                    this.queue_box.set_position(bb.pos.x, bb.pos.y);
                    this.active_layer.add_child(this.queue_box);
                }



            }else if (input_state.get() === States.main_states.circle_draw && !this.selected_obsticle) {
                var bp = new Vector().copy(this.circle_reference_poiont);


                var v = new V(event.point.x, event.point.y).sub(this.active_layer.get_position());
                 v.sub(bp);
                 var r = v.len();
                 
                 if(this.queue_circle){
                     this.queue_circle.remove_from_parent();
                 }
                
                    this.queue_circle = new Obsticle();
                    var bb = new Circle(new V().copy(bp),r);
                    this.queue_circle.bounds = bb;
                    this.queue_circle.set_position(bb.pos.x, bb.pos.y);
                    this.active_layer.add_child(this.queue_circle);
                
            }


        }

    };
    
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
                 input_state.get() === States.main_states.circle_draw)) {



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


            if (this.queue_points.length < 2 && !this.mouse_has_moved ) {

                for (var i = 0; i < this.obsticles.length; i++) {
                    
                    var obsticle = this.obsticles[i].bounds;
                    
                    var hasCollided = false;
                    
                    if(obsticle instanceof Polygon){
                        if(SAT.pointInPolygon(event.point, obsticle)){
                            hasCollided = true;
                        }
                    }else if(obsticle instanceof Circle){
                        if(SAT.pointInCircle(event.point, obsticle)){
                            hasCollided = true;
                        }
                    }
                    
                    if (hasCollided) {

                        this.obsticles[i].is_selected = true;
                        this.start_obsticle_position = new Vector(this.obsticles[i].get_position().x, this.obsticles[i].get_position().y);
                        this.selected_obsticle = this.obsticles[i];

                        this.update_inspector_with_obsticle(this.obsticles[i]);

                        this.end_polygon(); // it will remove the previous point added

                        break;
                    }
                }

            }
        }
        
        if(!this.is_space_pressed && input_state.get() === States.main_states.circle_draw){
                    
                if (this.queue_circle !== null && !this.selected_obsticle) {
                    this.obsticles.push(this.queue_circle);
                    this.queue_circle = null;
                    this.selected_obsticle = null;
                }
        }
        this.mouse_has_moved = false;
    };

    GameScreen.prototype.on_right_mouse_down = function (event) {
        
        event.point.x = Math.round(event.point.x);
        event.point.y = Math.round(event.point.y);

        if (input_state.get() === States.main_states.polygon_draw ||
            input_state.get() === States.main_states.box_draw  ||
            input_state.get() === States.main_states.circle_draw ) {
        
            this.end_polygon();

            for (var i = 0; i < this.obsticles.length; i++) {

                if (this.obsticles[i].is_selected) {

                    var obsticle = this.obsticles[i].bounds;
                    
                    if(obsticle instanceof Polygon){
                        
                        if (SAT.pointInPolygon(event.point, obsticle)) {

                            this.obsticles[i].remove_from_parent();
                            this.obsticles.splice(i, 1);
                            break;
                        }
                        
                    }else if(obsticle instanceof Circle){
                        if (SAT.pointInCircle(event.point, obsticle)) {

                            this.obsticles[i].remove_from_parent();
                            this.obsticles.splice(i, 1);
                            break;
                        }
                    }

                    

                }

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



    };

    GameScreen.prototype.on_draw_finished = function (context) {
        Screen.prototype.on_draw_finished.call(this, context);

        this.draw_queue(context);

        var strokeStyle = context.strokeStyle;
        var lineWidth = context.lineWidth;

        context.lineWidth = 1;
        context.strokeStyle = 'yellow';

        context.beginPath();

        var p = this.active_layer.bounds.pos.clone();

        context.moveTo(p.x + 0, p.y - this.height);
        context.lineTo(p.x + 0, p.y + this.height);

        context.moveTo(p.x - this.width, p.y);
        context.lineTo(p.x + this.width, p.y);

//        context.moveTo(p.x+this.width / 2, p.y+ 0);
//        context.lineTo(p.x+this.width / 2, p.y+this.height);
//
//        context.moveTo(p.x+0,p.y+ Config.tile_height * 15);
//        context.lineTo(p.x+this.width, p.y+Config.tile_height * 15);

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
            } else if (this.snap_axis_mode === 1) {
                context.lineTo(game.input.point.x, last.y);
            } else if (this.snap_axis_mode === 2) {
                context.lineTo(last.x, game.input.point.y);
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