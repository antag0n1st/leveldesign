(function(window, undefined) {

    function GameScreen() {
        this.initialize();
    }

    GameScreen.prototype = new Screen();
    GameScreen.prototype.screen_initialize = GameScreen.prototype.initialize;

    GameScreen.prototype.initialize = function() {
        this.screen_initialize();
                game.input.snap_mode = true;

        this.polygons = [];
        this.queue = [];
        this.layers = [];

        var layer = new Layer();
        layer.set_position(400, 300);
        layer.set_size(Config.screen_width, Config.screen_height);
        this.layers.push(layer);
        this.add_child(layer);

        this.active_layer = layer;
        
        
        //////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////
        
        
        
        
        
        
        
        
        var knight = new SpineAnimation('knight');
        knight.set_position(0,0);
        knight.play('run');
        knight.z_index = -10;
        this.active_layer.add_child(knight);
        
        
        
        
        
        
        
        
        
        
        
        
        ////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////

        this.start_drag_point = new Vector();
        this.start_drag_screen_position = new Vector();
        this.last_move_position = new Vector();
        this.start_obsticle_position = new Vector();
        
        this.snap_axis_mode = 0;

        this.name_label = document.getElementById('name');
        this.z_index_label = document.getElementById('z_index');
        this.tag_label = document.getElementById('tag');
        this.type_label = document.getElementById('type');
        this.x_position_label = document.getElementById('x_position');
        this.y_position_label = document.getElementById('y_position');

        this.modes_button = new Button({image: Images.blank_black});
        this.modes_button.text_color = "#ffffff";
        this.modes_button.set_position(150, 20);
        this.modes_button.on_mouse_up = GameScreen.prototype.on_modes_button.bind(this);
        this.modes_button.on_mouse_down = GameScreen.prototype.on_modes_button_down.bind(this);

        this.undo_button = new Button({image: Images.blank_black});
        this.undo_button.text_color = "#ffffff";
        this.undo_button.text = "Undo";
        this.undo_button.set_position(250, 20);
        this.undo_button.on_mouse_up = GameScreen.prototype.on_undo_button.bind(this);
        this.undo_button.on_mouse_down = GameScreen.prototype.on_undo_button_down.bind(this);
        
        this.snap_button = new Button({image: Images.blank_black});
        this.snap_button.text_color = "#ffffff";
        this.snap_button.text = "Snap";
        this.snap_button.set_position(350, 20);
        this.snap_button.on_mouse_up = GameScreen.prototype.on_snap_button.bind(this);
        this.snap_button.on_mouse_down = GameScreen.prototype.on_snap_button_down.bind(this);
        
        this.snap_axis_button = new Button({image: Images.blank_black});
        this.snap_axis_button.text_color = "#ffffff";
        this.snap_axis_button.text = "Free Mode";
        this.snap_axis_button.set_position(450, 20);
        this.snap_axis_button.on_mouse_up = GameScreen.prototype.on_snap_axis_button.bind(this);
        this.snap_axis_button.on_mouse_down = GameScreen.prototype.on_snap_axis_button_down.bind(this);

        this.mouse_position_label = new Label();
        this.mouse_position_label.set({text: "x:0  y:0", text_color: "#ffffff"});
        this.mouse_position_label.set_position(20, 20);

        this.modes = [States.main_states.polygon_draw,
            States.main_states.circle_draw,
            States.main_states.graphics_draw,
            States.main_states.path_draw];
        this.mode_count = 0;

        this.current_mode = 'polygon';

        this.current_mode = this.modes[this.mode_count % this.modes.length];
        this.modes_button.text = this.current_mode.replace('_draw', '');

        this.add_child(this.modes_button);
        this.add_child(this.mouse_position_label);
        this.add_child(this.undo_button);
        this.add_child(this.snap_button);
        this.add_child(this.snap_axis_button);

        input_state.subscribe('*', this);

        input_state.set(States.main_states.polygon_draw);

        this.is_space_pressed = false;
        var that = this;

        this.kibo = new Kibo();

        this.kibo.down('space', function() {
            that.is_space_pressed = true;
            game.stage.context.canvas.style.cursor = 'pointer';
        });

        this.kibo.up('space', function() {
            that.is_space_pressed = false;
            game.stage.context.canvas.style.cursor = 'default';
        });



    };

    GameScreen.prototype.on_state = function(prev_state, current_state, data) {

        if (current_state.name === States.main_states.polygon_draw) {
            log("polygon draw state");
        }

        this.end_polygon();

    };

    GameScreen.prototype.on_modes_button = function(event) {
        this.mode_count++;

        this.current_mode = this.modes[this.mode_count % this.modes.length];
        this.modes_button.text = this.current_mode.replace('_draw', '');

        input_state.set(this.current_mode);

    };

    GameScreen.prototype.on_undo_button = function(event) {

        if (this.queue.length > 0) {
            this.queue.splice(this.queue.length - 1, 1);
        }else{
            
            if(this.polygons.length > 0){
                var obsticle = this.polygons[this.polygons.length - 1];
                obsticle.remove_from_parent();
                this.polygons.splice( this.polygons.length - 1 , 1 );
            }
            
        }

    };
    
    GameScreen.prototype.on_snap_button = function(event){
       
       game.input.snap_mode = !game.input.snap_mode;
       
       if(game.input.snap_mode){
           this.snap_button.text = "Snap Mode";
       }else{
           this.snap_button.text = "Free Mode";
       }
       
    };
    
    GameScreen.prototype.on_snap_axis_button = function(event){
        
        this.snap_axis_mode++;
        
        this.snap_axis_mode = this.snap_axis_mode % 3;
        
        if(this.snap_axis_mode == 0){
            this.snap_axis_button.text = 'Free';
        }else if(this.snap_axis_mode == 1){
            this.snap_axis_button.text = 'Snap X';
        }else if(this.snap_axis_mode == 2){
            this.snap_axis_button.text = 'Snap Y';
        }
        
    };
    
    GameScreen.prototype.on_snap_axis_button_down = function(event){
        event.stop_propagation();
    };
    
    GameScreen.prototype.on_snap_button_down = function(event){
        event.stop_propagation();
    };

    GameScreen.prototype.on_undo_button_down = function(event) {
        event.stop_propagation();
    };

    GameScreen.prototype.on_modes_button_down = function(event) {
        event.stop_propagation();
    };

    GameScreen.prototype.on_mouse_down = function(event) {

        this.start_drag_point = new Vector(event.point.x, event.point.y);

        if (this.is_space_pressed) {

            this.start_drag_point = new Vector(event.point.x, event.point.y);
            this.start_drag_screen_position = this.active_layer.get_position();
            this.last_move_position = this.start_drag_point.clone();

        }

    };

    GameScreen.prototype.on_mouse_up = function(event) {

        if (input_state.get() === States.main_states.polygon_draw && !this.is_space_pressed) {


            var p = this.active_layer.get_position();
            var pp = new Vector(event.point.x, event.point.y);
            pp.sub(p);
            
            if(this.queue.length > 0){
                var last = this.queue[this.queue.length-1];
                if(this.snap_axis_mode === 1){                
                    pp.y = last.y;
                }else if(this.snap_axis_mode === 2){
                    pp.x = last.x;
                }
            }
            
            
            
            this.queue.push(pp);


            // check if we are selecting existing polugon
            // but first deselect all of them
            for (var i = 0; i < this.polygons.length; i++) {

                if (this.polygons[i].is_selected) {
                    this.polygons[i].is_selected = false;
                    this.selected_obsticle = null;
                    this.end_polygon(); // it will remove the previous point added
                    this.update_inspector_with_obsticle(null);
                }


            }

            if (this.queue.length < 2) {

                for (var i = 0; i < this.polygons.length; i++) {
                    var poly = this.polygons[i].bounds;

                    if (SAT.pointInPolygon(event.point, poly)) {

                        this.polygons[i].is_selected = true;
                        this.start_obsticle_position = this.polygons[i].get_position();
                        this.selected_obsticle = this.polygons[i];

                        this.update_inspector_with_obsticle(this.polygons[i]);

                        this.end_polygon(); // it will remove the previous point added

                        break;
                    }
                }

            }




        }

    };

    GameScreen.prototype.on_mouse_move = function(event) {

        if (this.is_space_pressed) {
            
            if(!game.input.snap_mode){
                alert("Can't move the screen position in Free Mode");
                return;
            }

            var v = new V(event.point.x, event.point.y);
            v.sub(this.start_drag_point.clone());
            var p = this.start_drag_screen_position.clone().add(v);

            this.active_layer.set_position(p.x, p.y);

            if (this.queue.length > 0) {

                // lets move some points

                var v = new V(event.point.x, event.point.y);
                v.sub(this.last_move_position.clone());

                for (var i = 0; i < this.queue.length; i++) {
                    //   this.queue[i].add(v);
                }

                this.last_move_position = new V(event.point.x, event.point.y);

            }

        } else {

            // we are probably moveing some polgons

            if (input_state.get() === States.main_states.polygon_draw) {

                for (var i = 0; i < this.polygons.length; i++) {
                    var obsticle = this.polygons[i];

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

            }



        }

    };

    GameScreen.prototype.on_right_mouse_down = function(event) {

        if (input_state.get() === States.main_states.polygon_draw) {
            this.end_polygon();

            for (var i = 0; i < this.polygons.length; i++) {

                if (this.polygons[i].is_selected) {
                    
                    var poly = this.polygons[i].bounds;
                    
                    if (SAT.pointInPolygon(event.point, poly)) {
                        
                        this.polygons[i].remove_from_parent();
                        this.polygons.splice(i,1);
                        break;
                    }
                    
                }

            }

        }

    };
    
    GameScreen.prototype.on_name_change = function(value){  
        if(this.selected_obsticle){
            this.selected_obsticle.name = value;
        }      
    };
    
    GameScreen.prototype.on_z_index_change = function(value){     
         if(this.selected_obsticle){
             this.selected_obsticle.z_index = parseInt(value);
         }      
    };
    
    GameScreen.prototype.on_type_change = function(value){     
         if(this.selected_obsticle){
             this.selected_obsticle.type = value;
         }      
    };
    
    GameScreen.prototype.on_tag_change = function(value){     
         if(this.selected_obsticle){
             this.selected_obsticle.tag = value;
         }      
    };
    
    GameScreen.prototype.on_x_change = function(value){ 
            if(this.selected_obsticle){
                this.selected_obsticle.set_position(parseInt(value),null);
            }     
    };
    
    GameScreen.prototype.on_y_change = function(value){ 
        if(this.selected_obsticle){
             this.selected_obsticle.set_position(null,parseInt(value));
        }        
    };

    GameScreen.prototype.update_inspector_with_obsticle = function(obsticle){
        
        if(obsticle){
            
            this.name_label.value = obsticle.name;
            this.z_index_label.value = obsticle.z_index;
            this.tag_label.value = obsticle.tag;
            this.type_label.value = obsticle.type;
            this.x_position_label.value =  obsticle.get_position().x;
            this.y_position_label.value =  obsticle.get_position().y;
                             
        }else{
            
            this.name_label.value = '';
            this.z_index_label.value = '';
            this.tag_label.value = '';
            this.type_label.value = '';
            this.x_position_label.value = '';
            this.y_position_label.value = '';
        }
        
    };

    GameScreen.prototype.update = function() {

        var p = this.active_layer.get_position();
        var m = new Vector(game.input.point.x, game.input.point.y);
        m.sub(p);
        this.mouse_position_label.set({text: "x: " + m.x + "  y: " + m.y});


    };

    GameScreen.prototype.draw = function(context) {
        Screen.prototype.draw.call(this, context);

        

    };
    
    GameScreen.prototype.on_draw_finished = function(context){
        Screen.prototype.on_draw_finished.call(this,context);
        
        this.draw_queue(context);

        var strokeStyle = context.strokeStyle;
        var lineWidth = context.lineWidth;

        context.lineWidth = 1;
        context.strokeStyle = 'yellow';

        context.beginPath();
        
        var p = this.active_layer.bounds.pos.clone();
        
        context.moveTo(p.x+0, p.y-this.height);
        context.lineTo(p.x+0, p.y+this.height);
        
        context.moveTo(p.x-this.width, p.y);
        context.lineTo(p.x+this.width, p.y);

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
    
    GameScreen.prototype.export_polygons = function() {
        this.end_polygon();
       // console.log(JSON.stringify(this.obsticles));
       
       var json = [];
       
       this.active_layer.set_position(0,0);
       
       var create_string = "";
       
       for(var i=0;i<this.polygons.length;i++){
           var o = {};
           o.pos = this.polygons[i].bounds.pos;
           o.points = this.polygons[i].bounds.points;
           json.push(o);
         
            create_string += " var bounds = new Polygon(new Vector("+0+","+0+"), [";
            for(var j=0;j<o.points.length;j++){
                var pp = o.points[j];
                create_string += " new Vector("+pp.x+","+pp.y+"),";
            }
            create_string = create_string.slice(0, - 1);    
            create_string += " ]); ";
            create_string += " bounds.translate("+o.pos.x+","+o.pos.y+"); ";
         
       }
       
       log(JSON.stringify(json));
       log("");
       log(create_string);
       
    };

    GameScreen.prototype.draw_queue = function(context) {

        context.fillStyle = '#f00';
        context.beginPath();
        var alpha = context.globalAlpha;

        context.globalAlpha = 0.3;

        var p = this.active_layer.get_position();

        var first = true;
        for (var ind in this.queue) {

            var c = this.queue[ind].clone();
            c.add(p);

            if (first) {
                first = false;
                context.moveTo(c.x, c.y);
            } else {
                context.lineTo(c.x, c.y);
            }
        }


        if (this.queue.length > 0 && !this.is_space_pressed) {
            
            var last = this.queue[this.queue.length-1].clone();
            last.add(p);
            
            if(this.snap_axis_mode === 0){
                context.lineTo(game.input.point.x, game.input.point.y);
            }else if(this.snap_axis_mode === 1){                
                context.lineTo(game.input.point.x, last.y);
            }else if(this.snap_axis_mode === 2){
                context.lineTo(last.x, game.input.point.y);
            }
            
            
        }

        context.closePath();


        context.fill();
        context.stroke();
        context.globalAlpha = alpha;

    };



    GameScreen.prototype.show = function() {
        Screen.prototype.show.call(this);
        game.input.add(this);
        game.input.add(this.modes_button);
        game.input.add(this.undo_button);
        game.input.add(this.snap_button);
        game.input.add(this.snap_axis_button);
    };

    GameScreen.prototype.hide = function() {
        Screen.prototype.hide.call(this);
    };

    GameScreen.prototype.end_polygon = function() {
        // create polygon 
        if (this.queue.length > 2) {

            var o = this.queue;
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
          
            if(sum < 0){
                
                this.polygons.push(obsticle);
                this.active_layer.add_child(obsticle);
                
            }else{
                alert("polygon points must be defined clockwise");
            }
            

            

        }
        this.queue = [];
        return false;
    };

    window.GameScreen = GameScreen;

}(window));