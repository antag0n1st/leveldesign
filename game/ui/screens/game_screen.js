(function(window, undefined) {

    function GameScreen() {
        this.initialize();
    }

    GameScreen.prototype = new Screen();
    GameScreen.prototype.screen_initialize = GameScreen.prototype.initialize;

    GameScreen.prototype.initialize = function() {
        this.screen_initialize();  
        
        
        this.obsticles = [];
        this.queue = [];
        this.layers = [];
        
        var layer = new Layer();
        layer.set_position(0,0);
        layer.set_size( Config.screen_width, Config.screen_height );
        this.layers.push(layer);
        this.add_child(layer);
        
        this.active_layer = layer;
        
        
        this.modes_button = new Button({image: ContentManager.images.blank_black });
        
        this.modes_button.text_color = "#ffffff";
        this.modes_button.set_position(130,20);
        this.modes_button.on_mouse_up = GameScreen.prototype.on_modes_button.bind(this);
        this.modes_button.on_mouse_down = GameScreen.prototype.on_modes_button_down.bind(this);
        
        this.mouse_position_label = new Label();
        this.mouse_position_label.set({text:"x:0  y:0",text_color:"#ffffff"});
        this.mouse_position_label.set_position(20,20);
        
        this.modes = [ States.main_states.polygon_draw ,
            States.main_states.circle_draw ,
            States.main_states.graphics_draw ,
            States.main_states.path_draw ];
        this.mode_count = 0;
        
        this.current_mode = 'polygon';
        
        this.current_mode = this.modes[this.mode_count%this.modes.length];
        this.modes_button.text = this.current_mode.replace('_draw','');
        
        this.add_child(this.modes_button);
        this.add_child(this.mouse_position_label);
        
        input_state.subscribe('*',this);
        
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
    
    GameScreen.prototype.on_state = function(prev_state,current_state,data){        
        
        if(current_state.name === States.main_states.polygon_draw ){
            log("polygon draw state");
        }
        
    };
    
    GameScreen.prototype.on_modes_button = function(event){
        this.mode_count++;
        
        this.current_mode = this.modes[this.mode_count%this.modes.length];
        this.modes_button.text = this.current_mode.replace('_draw','');
        
        input_state.set(this.current_mode);
        
    };
    
    GameScreen.prototype.on_modes_button_down = function(event){
        event.stop_propagation();
    };
    
    GameScreen.prototype.on_mouse_down = function(event){
             
    };
    
    GameScreen.prototype.on_mouse_up = function(event){
        
        if(input_state.get() === States.main_states.polygon_draw ){
            this.queue.push(new Vector(event.point.x,event.point.y));
        }
        
    };
    
    GameScreen.prototype.on_mouse_move = function(event){
       
    };
    
    GameScreen.prototype.on_right_mouse_down = function(event){
       
       if(input_state.get() === States.main_states.polygon_draw ){
            this.end_polygon();
       }
       
    };

    GameScreen.prototype.game_over = function() {
        this.is_game_over = true;
    };

    GameScreen.prototype.update = function() {
        
        
        this.mouse_position_label.set({text: "x: "+game.input.point.x+"  y: "+game.input.point.y});
        

    };
    
    GameScreen.prototype.draw = function(context){
        Screen.prototype.draw.call(this,context);
        
        this.draw_queue(context);
        
        var strokeStyle =  context.strokeStyle;
       var lineWidth = context.lineWidth;
       
       context.lineWidth = 1;       
       context.strokeStyle = 'yellow';
       
       context.beginPath();
       
       context.moveTo( this.width/2,0 );
       context.lineTo( this.width/2, this.height );
       
       context.moveTo(0,Config.tile_height*10);
       context.lineTo(this.width,Config.tile_height*10);
       
       context.stroke();
       context.closePath();
       
       
       context.strokeStyle = strokeStyle;
       
       context.lineWidth = lineWidth;
        
    };
    
    GameScreen.prototype.draw_queue = function(context) {

        context.fillStyle = '#f00';
        context.beginPath();
        var alpha = context.globalAlpha;

        context.globalAlpha = 0.3;

        var first = true;
        for (var ind in this.queue) {

            var c = this.queue[ind];

            if (first) {
                first = false;
                context.moveTo(c.x, c.y);
            } else {
                context.lineTo(c.x, c.y);
            }
        }


        if (this.queue.length > 0 && !this.is_space_pressed) {
            context.lineTo(game.input.point.x, game.input.point.y);
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

            this.obsticles.push(obsticle);
            this.active_layer.add_child(obsticle);

        }
        this.queue = [];
        return false;
    };

    window.GameScreen = GameScreen;

}(window));