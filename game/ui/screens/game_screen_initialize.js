GameScreen.prototype.initialize = function () {
    this.screen_initialize();
    game.input.snap_mode = true;

    this.obsticles = [];
    this.queue_points = [];
    this.queue_box = null;
    this.queue_circle = null;
    this.queue_path = null;
    this.layers = [];
    this.mouse_has_moved = false;
    this.selected_image = null;

    var layer = new Layer();
    layer.set_position(Config.screen_width / 2, Config.screen_height / 2);
    layer.set_size(Config.screen_width, Config.screen_height);
    this.layers.push(layer);
    this.add_child(layer);

    this.active_layer = layer;

    this.inspector = document.getElementById('inspector');
    this.name_label = document.getElementById('name');
    this.z_index_label = document.getElementById('z_index');
    this.tag_label = document.getElementById('tag');
    this.type_selector = document.getElementById('type');
    this.x_position_label = document.getElementById('x_position');
    this.y_position_label = document.getElementById('y_position');
    this.library = document.getElementById('library');
    
    this.inspector.style.height = (Config.screen_height-13)+"px";

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

    var button_distance = 100;
    var button_padding = 10;

    /////////////// mode buttons

    // polygon
    this.polygon_button = new Button({image: Images.blank_black, selected_image: Images.blank_black_highlighted});
    this.polygon_button.tag = 0;
    this.polygon_button.is_selected = true;
    this.polygon_button.text = "Polygon";
    this.polygon_button.text_color = "#ffffff";
    this.polygon_button.set_position(button_padding + button_distance * 0, 20);
    this.polygon_button.on_mouse_up = GameScreen.prototype.on_modes_button.bind(this);
    this.polygon_button.on_mouse_down = GameScreen.prototype.on_modes_button_down.bind(this);

    //box
    this.box_button = new Button({image: Images.blank_black, selected_image: Images.blank_black_highlighted});
    this.box_button.tag = 1;
    this.box_button.text = "Box";
    this.box_button.text_color = "#ffffff";
    this.box_button.set_position(button_padding + button_distance * 1, 20);
    this.box_button.on_mouse_up = GameScreen.prototype.on_modes_button.bind(this);
    this.box_button.on_mouse_down = GameScreen.prototype.on_modes_button_down.bind(this);

    // circle
    this.circle_button = new Button({image: Images.blank_black, selected_image: Images.blank_black_highlighted});
    this.circle_button.tag = 2;
    this.circle_button.text = "Circle";
    this.circle_button.text_color = "#ffffff";
    this.circle_button.set_position(button_padding + button_distance * 2, 20);
    this.circle_button.on_mouse_up = GameScreen.prototype.on_modes_button.bind(this);
    this.circle_button.on_mouse_down = GameScreen.prototype.on_modes_button_down.bind(this);

    // point
    this.point_button = new Button({image: Images.blank_black, selected_image: Images.blank_black_highlighted});
    this.point_button.tag = 3;
    this.point_button.text = "Point";
    this.point_button.text_color = "#ffffff";
    this.point_button.set_position(button_padding + button_distance * 3, 20);
    this.point_button.on_mouse_up = GameScreen.prototype.on_modes_button.bind(this);
    this.point_button.on_mouse_down = GameScreen.prototype.on_modes_button_down.bind(this);

    // path
    this.path_button = new Button({image: Images.blank_black, selected_image: Images.blank_black_highlighted});
    this.path_button.tag = 4;
    this.path_button.text = "Path";
    this.path_button.text_color = "#ffffff";
    this.path_button.set_position(button_padding + button_distance * 4, 20);
    this.path_button.on_mouse_up = GameScreen.prototype.on_modes_button.bind(this);
    this.path_button.on_mouse_down = GameScreen.prototype.on_modes_button_down.bind(this);

    // grapics
    this.graphics_button = new Button({image: Images.blank_black, selected_image: Images.blank_black_highlighted});
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


    for (var i = 0; i < ContentManager.object_types.length; i++) {

        var type = ContentManager.object_types[i];

        var opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = type;
        this.type_selector.appendChild(opt);
    }

/////////////////////////////////////

};