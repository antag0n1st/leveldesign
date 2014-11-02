GameScreen.prototype.on_layer_change = function(object){
    
    var value = object.value;
    this.active_layer = this.get_layer_by_name(value);
    this.layer_visibility.checked = this.active_layer.is_visible;
    
};

GameScreen.prototype.on_generic_value_change = function(object){
    
    if (this.selected_obsticle) {
        this.selected_obsticle.value = object.value;
    }
    
};

GameScreen.prototype.on_layer_visibility_change = function(object){
    
    this.active_layer.is_visible = object.checked;
    
};

GameScreen.prototype.on_opacity_change = function (object) {

    if( isNaN(object.value)){
        return;
    }

    var value = object.value;

    if (this.selected_obsticle) {
        this.selected_obsticle.set_alpha(value);
    }

};

GameScreen.prototype.on_scale_x_change = function (object) {

    if( isNaN(object.value)){
        return;
    }

    var value = object.value;

    if (this.selected_obsticle) {
        this.selected_obsticle.set_scale_x(value);
    }

};

GameScreen.prototype.on_scale_y_change = function (object) {

    if( isNaN(object.value)){
        return;
    }

    var value = object.value;

    if (this.selected_obsticle) {
        this.selected_obsticle.set_scale_y(value);
    }

};

GameScreen.prototype.on_width_change = function (object) {

    if( isNaN(object.value)){
        return;
    }

    var value = object.value;

    if (this.selected_obsticle) {        
        this.selected_obsticle.set_size(value,this.selected_obsticle.height);
    }

};

GameScreen.prototype.on_height_change = function (object) {

    if( isNaN(object.value)){
        return;
    }

    var value = object.value;

    if (this.selected_obsticle) {
        this.selected_obsticle.set_size(this.selected_obsticle.width,value);
    }

};

GameScreen.prototype.on_radius_change = function (object) {

    if( isNaN(object.value)){
        return;
    }

    var value = object.value;

    if (this.selected_obsticle && value > 3) {
        this.selected_obsticle.bounds.r = value;
    }

};



GameScreen.prototype.on_rotation_change = function (object) {

    if( isNaN(object.value)){
        return;
    }

    var value = object.value;


    if (this.selected_obsticle) {
        this.selected_obsticle.rotate_to(Math.degrees_to_radians(value));
    }

};

GameScreen.prototype.on_anchor_y_position_change = function (object) {

    if( isNaN(object.value)){
        return;
    }

    var value = object.value;

    if (this.selected_obsticle) {
        var x = this.selected_obsticle.get_anchor().x;
        this.selected_obsticle.set_anchor(x,value);
    }

};

GameScreen.prototype.on_anchor_x_position_change = function (object) {

    if( isNaN(object.value)){
        return;
    }

    var value = object.value;

    if (this.selected_obsticle) {
        var y = this.selected_obsticle.get_anchor().y;
        this.selected_obsticle.set_anchor(value,y);
    }

};



GameScreen.prototype.on_name_change = function (object) {

    var value = object.value;

    if (this.selected_obsticle) {
        this.selected_obsticle.name = value;
    }

};

GameScreen.prototype.on_z_index_change = function (object) {

    if( isNaN(object.value)){
        return;
    }

    var value = object.value;

    if (this.selected_obsticle) {
        this.selected_obsticle.z_index = value;
    }

};

GameScreen.prototype.on_c_index_change = function (object) {

    if( isNaN(object.value)){
        return;
    }

    var value = object.value;

    if (this.selected_obsticle) {
        this.selected_obsticle.c_index = value;
    }
};


GameScreen.prototype.on_tag_change = function (object) {

    if( isNaN(object.value)){
        return;
    }

    var value = object.value;

    if (this.selected_obsticle) {
        this.selected_obsticle.tag = value;
    }

};

GameScreen.prototype.on_x_position_change = function (object) {

    var value = Math.round_decimal(object.value,2);

    if (this.selected_obsticle) {
        var pos = this.selected_obsticle.get_position();
        this.selected_obsticle.set_position(Math.round(value), pos.y);
    }

};

GameScreen.prototype.on_y_position_change = function (object) {

    var value = Math.round_decimal(object.value,2);

    if (this.selected_obsticle) {
        var pos = this.selected_obsticle.get_position();
        this.selected_obsticle.set_position(pos.x, Math.round(value));
    }

};

GameScreen.prototype.on_type_change = function (object) {

    var value = object.value;

    if (this.selected_obsticle) {
        
        var type = this.find_type_by_name(value);
        
        this.selected_obsticle.type = type.name;
        this.selected_obsticle.normal_color = type.color;
    }

};

GameScreen.prototype.on_set_parent = function () {

    if (this.selected_obsticle) {
        
        if(this.selected_obsticle instanceof Path){
            Popup.show("can't add childs to path",this);
        }else{
            input_state.set(States.main_states.set_parent);
        }
        
        
    }

};

GameScreen.prototype.find_type_by_name = function(name){
    for(var i=0;i<ContentManager.object_types.length;i++){
        var type = ContentManager.object_types[i];
        if(type.name === name){
            return type;
        }
    }
};

GameScreen.prototype.update_inspector_with_obsticle = function (obsticle) {

    this.set_all_properties('block');
    this.remove_properties_for_obsticle(obsticle);

    if (obsticle) {

        this.name_label.value = obsticle.name;
        this.z_index_label.value = obsticle.z_index;
        this.c_index_label.value = obsticle.c_index;
        this.tag_label.value = obsticle.tag;
        
        var object_type = this.find_type_by_name(obsticle.type);
        
        if(object_type){
            
            for(var i=0;i<ContentManager.object_types.length;i++){
                var type = ContentManager.object_types[i];
                if(type.name === obsticle.type){
                    this.type_selector.selectedIndex = i;
                    break;
                }
            }
            
        }else{
            this.type_selector.selectedIndex = -1;
        }
        
//        var ind = ContentManager.object_types.indexOf(obsticle.type);
//        if(ind !== -1){
//            this.type_selector.selectedIndex = ind;
//        }else{
//            this.type_selector.selectedIndex = -1;
//        }
        
        this.x_position_label.value = obsticle.get_position().x;
        this.y_position_label.value = obsticle.get_position().y;
        
        this.opacity_field.value = obsticle.alpha;
        this.rotation_field.value = Math.radians_to_degrees(obsticle.angle);
        this.anchor_x_position.value = obsticle.get_anchor().x;
        this.anchor_y_position.value = obsticle.get_anchor().y;
        
        this.width_field.value = obsticle.width;
        this.height_field.value = obsticle.height;
        
        this.scale_x_field.value = obsticle.scale_x;
        this.scale_y_field.value = obsticle.scale_y;
        
        this.generic_value_field.value = obsticle.value;
        
        if(obsticle.inner_type === "Circle"){
            this.radius_field.value = obsticle.bounds.r;
        }

    } else {

        this.name_label.value = '';
        this.z_index_label.value = 0;
        this.c_index_label.value = 0;
        this.tag_label.value = 0;
        this.type_selector.selectedIndex = 0;
        this.x_position_label.value = 0;
        this.y_position_label.value = 0;
        this.opacity_field.value = 0;
        this.rotation_field.value = 0;
        this.anchor_x_position.value = 0;
        this.anchor_y_position.value = 0;
        this.width_field.value = 0;
        this.height_field.value = 0;
        this.radius_field.value = 0;
        this.scale_x_field.value = 0;
        this.scale_y_field.value = 0;
        this.generic_value_field.value = "";
    }

};

GameScreen.prototype.set_all_properties = function(value){
        this.z_index_label.parentElement.style.display = value;
        this.c_index_label.parentElement.style.display = value;
        this.tag_label.parentElement.style.display = value;
        this.type_selector.parentElement.style.display = value;
        this.opacity_field.parentElement.style.display = value;
        this.rotation_field.parentElement.style.display = value;
        this.anchor_x_position.parentElement.style.display = value;
        this.anchor_y_position.parentElement.style.display = value;  
        this.set_child_button.parentElement.style.display = value;
        this.radius_field.parentElement.style.display = value;
        this.width_field.parentElement.style.display = value;
        this.height_field.parentElement.style.display = value;
        this.scale_x_field.parentElement.style.display = value;
        this.scale_y_field.parentElement.style.display = value;
        this.generic_value_field.parentElement.style.display = value;
};

GameScreen.prototype.remove_properties_for_obsticle = function(obsticle){
    
    if(!obsticle){
        this.set_all_properties('none');
        return;
    }
    
    if(obsticle.inner_type === "Circle"){
        this.anchor_y_position.parentElement.style.display = 'none';
        this.anchor_x_position.parentElement.style.display = 'none';
        this.rotation_field.parentElement.style.display = 'none';
        this.width_field.parentElement.style.display = 'none';
        this.height_field.parentElement.style.display = 'none';
        this.opacity_field.parentElement.style.display = 'none';
        this.scale_x_field.parentElement.style.display = 'none';
        this.scale_y_field.parentElement.style.display = 'none';
        
    }else if(obsticle.inner_type === "Box"){
        this.radius_field.parentElement.style.display = 'none';
        this.opacity_field.parentElement.style.display = 'none';
        this.scale_x_field.parentElement.style.display = 'none';
        this.scale_y_field.parentElement.style.display = 'none';
    }else if(obsticle.inner_type === "Polygon"){
        this.anchor_y_position.parentElement.style.display = 'none';
        this.anchor_x_position.parentElement.style.display = 'none';
        this.opacity_field.parentElement.style.display = 'none';
        this.width_field.parentElement.style.display = 'none';
        this.height_field.parentElement.style.display = 'none';
        this.radius_field.parentElement.style.display = 'none';
        this.scale_x_field.parentElement.style.display = 'none';
        this.scale_y_field.parentElement.style.display = 'none';
    }else if(obsticle.inner_type === "Point"){
        this.anchor_y_position.parentElement.style.display = 'none';
        this.anchor_x_position.parentElement.style.display = 'none';
        this.rotation_field.parentElement.style.display = 'none';
        this.opacity_field.parentElement.style.display = 'none';
        this.width_field.parentElement.style.display = 'none';
        this.height_field.parentElement.style.display = 'none';
        this.radius_field.parentElement.style.display = 'none';
        this.scale_x_field.parentElement.style.display = 'none';
        this.scale_y_field.parentElement.style.display = 'none';
    }else if(obsticle.inner_type === "Path"){
        this.anchor_y_position.parentElement.style.display = 'none';
        this.anchor_x_position.parentElement.style.display = 'none';
        this.rotation_field.parentElement.style.display = 'none';
        this.opacity_field.parentElement.style.display = 'none';
        this.width_field.parentElement.style.display = 'none';
        this.height_field.parentElement.style.display = 'none';
        this.radius_field.parentElement.style.display = 'none';
        this.scale_x_field.parentElement.style.display = 'none';
        this.scale_y_field.parentElement.style.display = 'none';
    }else if(obsticle.inner_type === "Graphic"){
        this.radius_field.parentElement.style.display = 'none';
        this.width_field.parentElement.style.display = 'none';
        this.height_field.parentElement.style.display = 'none';
    }
    
};

GameScreen.prototype.list_files = function (files) {

    var base_url = window.document.URL.replace("index.html", "library") + '/';

    for (var i = 0; i < files.length; i++) {

        var name = files[i].name;

        var key = name.replace('.', '_');

        var image_with_full_path = base_url + name;

        ContentManager.add_image(key, image_with_full_path);

        var element = "<img ";
        element += " src='" + image_with_full_path + "' ";
        element += " id='" + key + "' ";
        element += " onclick=\"game.navigator.current_screen.on_image_click(this,'" + key + "')\" ";
        element += " />";

        game.navigator.current_screen.library.innerHTML += element;

    }

    ContentManager.download_resources(this.stage, function () {
    });


};

GameScreen.prototype.on_image_click = function (element, name) {
    
    this.deselect_images(); 
    this.deselect_graphics();


    if (input_state.get() === States.main_states.graphics_draw) {

        element.style.backgroundColor = "blue";

        if (this.selected_image) {
            this.selected_image.remove_from_parent();
            this.selected_image = null;
        }

        this.selected_image = new Sprite(name);
        this.selected_image.set_alpha(0.6);
        this.add_child(this.selected_image);
    }

};

GameScreen.prototype.deselect_images = function () {

    var childs = this.library.children;

    for (var i = 0; i < childs.length; i++) {
        var child = childs[i];
        child.style.backgroundColor = "transparent";
    }
    
    if(this.selected_image){
        this.selected_image.remove_from_parent();
        this.selected_image = null;
    }

};

GameScreen.prototype.on_mouse_wheel = function(event,increment,fn){
    
    
    var val = Math.abs(event.target.value);
    if(val < 1){
        increment = 0.1;
    }
    
    if(event.deltaY < 0){
        val = event.target.value/1.0 + increment;
    }else{
        val = event.target.value/1.0 - increment;
    }
    
    val = Math.round_decimal(val,2);
    
    event.target.value = val;
    
    this[fn](event.target);
};