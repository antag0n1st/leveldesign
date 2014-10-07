//(function(window,undefined){
    
    function Graphic(image_name){
        this.initialize(image_name);
    }    
    
    Graphic.prototype = new Sprite();
    Graphic.prototype.sprite_initialize = Graphic.prototype.initialize;    
    Graphic.prototype.initialize = function(image_name){        
        this.sprite_initialize(image_name); // your image name
        
        this.layer_name = "";
        this.type = 0;
        this.response = new Response();
        this.name = '';
        this.is_selected = false;
        this.normal_color = null;
        
    };
    
    Graphic.prototype.check = function (point) {

        var bounds = this.bounds;

        if (bounds instanceof Circle) {

            if (SAT.pointInCircle(point, bounds)) {
                return true;
            }

        } else if (bounds instanceof Polygon) {
            if (SAT.pointInPolygon(point, bounds)) {
                return true;
            }
        }

        return false;

    };
    
    Graphic.prototype.on_added_to_parent = function(parent){
        Drawable.prototype.on_added_to_parent.call(this,parent);
        
    };
    
    Graphic.prototype.on_remove_from_parent = function(parent){
        Drawable.prototype.on_remove_from_parent.call(this,parent);
        if(parent instanceof Obsticle || parent instanceof Path || parent instanceof Graphic){
            game.navigator.current_screen.remove_obsticle(this);
        }
    };
    
    Graphic.prototype.on_draw = function(context){
        
    };
    
    Graphic.prototype.update = function(dt){
        if(this.is_selected){
            this.alpha = 0.5;
        }else{
            this.alpha = 1;
        }
    };
    
    
//    window.Graphic = Graphic;
    
//}(window));