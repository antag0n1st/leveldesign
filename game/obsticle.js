(function(window,undefined){
    
    function Obsticle(){
        this.initialize();
        
        this.type = 0;
        this.response = new Response();
        this.name = '';
        this.is_selected = false;
        this.normal_color = null;
    }    
    
    Obsticle.prototype = new Drawable();
    Obsticle.prototype.drawable_initialize = Obsticle.prototype.initialize;    
    Obsticle.prototype.initialize = function(){        
        this.drawable_initialize();
        
    };
    
    
    Obsticle.prototype.on_added_to_parent = function(parent){
        Drawable.prototype.on_added_to_parent.call(this,parent);
        
    };
    
    Obsticle.prototype.on_remove_from_parent = function(parent){
        Drawable.prototype.on_remove_from_parent.call(this,parent);
        
    };
    
    Obsticle.prototype.draw = function(context){
        
        var fillStyle = context.fillStyle;
        var alpha = context.globalAlpha;
        
        if(this.normal_color && !this.is_selected){
            context.fillStyle = this.normal_color;
        }else{
            context.fillStyle = "blue";
        }
        
        
        this.debug_bounds(context);
        
        if(this.is_selected){
            context.globalAlpha = 0.3;
            
        }
        
        if(this.normal_color || this.is_selected){
            context.fill();
        }
        
        context.fillStyle = fillStyle;
        context.globalAlpha = alpha;
    };
    
    Obsticle.prototype.clear = function(context){
        
    };
    
    window.Obsticle = Obsticle;
    
}(window));