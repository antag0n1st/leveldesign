//(function(window,undefined){

function Graphic(image_name) {
    this.initialize(image_name);
}

Graphic.prototype = new Sprite();
Graphic.prototype.sprite_initialize = Graphic.prototype.initialize;
Graphic.prototype.initialize = function (image_name) {
    this.sprite_initialize(image_name); // your image name

    this.layer_name = "";
    this.layer = null;
    this.type = "";
    this.response = new Response();
    this.name = '';
    this.is_selected = false;
    this.normal_color = null;
    this.inner_type = "Graphic";
    this.c_index = 0;
    this.value = "";
    this.properties = {};

};

Graphic.prototype.check = function (point) {

    var bounds = this.bounds;

    if (!this.layer.is_visible) {
        return false;
    }

    if (bounds instanceof Circle) {

        if (SAT.pointInCircle(point, bounds)) {
            return this;
        }

    } else if (bounds instanceof Polygon) {
        if (SAT.pointInPolygon(point, bounds)) {
            return this;
        }
    }

    return false;

};

Graphic.prototype.on_added_to_parent = function (parent) {
    Drawable.prototype.on_added_to_parent.call(this, parent);

};

Graphic.prototype.on_remove_from_parent = function (parent) {
    Drawable.prototype.on_remove_from_parent.call(this, parent);
    if (parent instanceof Obsticle || parent instanceof Path || parent instanceof Graphic) {
        game.navigator.current_screen.remove_obsticle(this);
    }
};

Graphic.prototype.draw = function (context) {
    
    var alpha = this.alpha;
    
    if (this.is_selected) {
        this.alpha = 0.5;
    }

    Sprite.prototype.draw.call(this, context);

    var fillStyle = context.fillStyle;
    var pos = this.bounds.pos;

    context.fillStyle = 'yellow';
    context.beginPath();
    context.arc(pos.x, pos.y, 2, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
    context.fillStyle = fillStyle;

    this.alpha = alpha;
};

Graphic.prototype.update = function (dt) {

};


//    window.Graphic = Graphic;

//}(window));