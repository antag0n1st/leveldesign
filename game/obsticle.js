(function (window, undefined) {

    function Obsticle() {
        this.initialize();        
    }

    Obsticle.prototype = new Sprite();
    Obsticle.prototype.sprite_initialize = Obsticle.prototype.initialize;
    Obsticle.prototype.initialize = function () {
        
        this.sprite_initialize();
        this.layer_name = "";
        this.layer = null;
        this.type = "";
        this.response = new Response();
        this.name = '';
        this.is_selected = false;
        this.normal_color = null;
        this.c_index = 0;
        this.inner_type = "Polygon";

    };


    Obsticle.prototype.on_added_to_parent = function (parent) {
        Sprite.prototype.on_added_to_parent.call(this, parent);

    };

    Obsticle.prototype.on_remove_from_parent = function (parent) {
        Sprite.prototype.on_remove_from_parent.call(this, parent);
        if(parent instanceof Obsticle || parent instanceof Path || parent instanceof Graphic){
            game.navigator.current_screen.remove_obsticle(this);
        }
          
    };

    Obsticle.prototype.check = function (point) {

        if(!this.layer.is_visible){
            return false;
        }
        
        var bounds = this.bounds;

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
    
    Obsticle.prototype.draw = function(context,x,y){
        
        Sprite.prototype.draw.call(this,context);
        
        var fillStyle = context.fillStyle;
        var alpha = context.globalAlpha;

        if (this.normal_color && !this.is_selected) {
            context.fillStyle = this.normal_color;
            context.globalAlpha = 0.3;
        } else {
            context.fillStyle = "blue";
        }


        this.debug_bounds(context);

        if (this.is_selected || this.normal_color) {
            context.globalAlpha = 0.3;

        }

        if (this.normal_color || this.is_selected) {
            context.fill();
        }

        context.fillStyle = fillStyle;
        context.globalAlpha = alpha;
        
    };

//    Obsticle.prototype.draw = function (context) {
//
//      Sprite.prototype.draw.call(this,context);
//        
//      this.debug_bounds(context);
//      
//      
////        var fillStyle = context.fillStyle;
////        var alpha = context.globalAlpha;
////
////        if (this.normal_color && !this.is_selected) {
////            context.fillStyle = this.normal_color;
////            context.globalAlpha = 0.3;
////        } else {
////            context.fillStyle = "blue";
////        }
////
////
////        this.debug_bounds(context);
////
////        if (this.is_selected || this.normal_color) {
////            context.globalAlpha = 0.3;
////
////        }
////
////        if (this.normal_color || this.is_selected) {
////            context.fill();
////        }
////
////        context.fillStyle = fillStyle;
////        context.globalAlpha = alpha;
//    };

    Obsticle.prototype.clear = function (context) {

    };

    window.Obsticle = Obsticle;

}(window));