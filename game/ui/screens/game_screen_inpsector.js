GameScreen.prototype.on_layer_change = function(object){
    
    var value = object.value;
    this.active_layer = this.layers[value];
    
};

GameScreen.prototype.on_name_change = function (object) {

    var value = object.value;

    if (this.selected_obsticle) {
        this.selected_obsticle.name = value;
    }

};

GameScreen.prototype.on_z_index_change = function (object) {

    var value = object.value;

    if (this.selected_obsticle) {
        this.selected_obsticle.z_index = value;
    }

};


GameScreen.prototype.on_tag_change = function (object) {

    var value = object.value;

    if (this.selected_obsticle) {
        this.selected_obsticle.tag = value;
    }

};

GameScreen.prototype.on_x_position_change = function (object) {

    var value = object.value;

    if (this.selected_obsticle) {
        var pos = this.selected_obsticle.get_position();
        this.selected_obsticle.set_position(Math.round(value), pos.y);
    }

};

GameScreen.prototype.on_y_position_change = function (object) {

    var value = object.value;

    if (this.selected_obsticle) {
        var pos = this.selected_obsticle.get_position();
        this.selected_obsticle.set_position(pos.x, Math.round(value));
    }

};

GameScreen.prototype.on_type_change = function (object) {

    var value = object.value;

    if (this.selected_obsticle) {
        this.selected_obsticle.type = value;
    }

};

GameScreen.prototype.on_set_parent = function () {

    if (this.selected_obsticle) {
        input_state.set(States.main_states.set_parent);
    }

};

GameScreen.prototype.update_inspector_with_obsticle = function (obsticle) {

    if (obsticle) {

        this.name_label.value = obsticle.name;
        this.z_index_label.value = obsticle.z_index;
        this.tag_label.value = obsticle.tag;
        this.type_selector.selectedIndex = obsticle.type;
        this.x_position_label.value = obsticle.get_position().x;
        this.y_position_label.value = obsticle.get_position().y;

    } else {

        this.name_label.value = '';
        this.z_index_label.value = '';
        this.tag_label.value = '';
        this.type_selector.selectedIndex = 0;
        this.x_position_label.value = '';
        this.y_position_label.value = '';
    }

};

GameScreen.prototype.list_files = function (files) {

    var base_url = window.document.URL.replace("index.html", "library") + '/';

    files = [
        {name: "attack-trail.png"},
        {name: "child.png"},
        {name: "face.png"}
    ];

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
        log(name);
    }

    ContentManager.download_resources(this.stage, function () {
    });


};

GameScreen.prototype.on_image_click = function (element, name) {
    this.deselect_images();


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