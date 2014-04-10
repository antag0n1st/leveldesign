(function(window,undefined){
    
    function Obsticle(){
        this.initialize();
        
        this.type = 0;
        this.response = new Response();
        this.name = '';
        this.is_selected = false;
    }    
    
    Obsticle.prototype = new Drawable();
    Obsticle.prototype.drawable_initialize = Obsticle.prototype.initialize;    
    Obsticle.prototype.initialize = function(){        
        this.drawable_initialize();
        
    };
    
    Obsticle.prototype.resolve = function(object){
        
        
           var polygon = this.bounds;
           
           if(SAT.testPolygonPolygon(object.bounds, polygon, this.response)){
               
               if(this.type === 0){
                                      
                    var overlap = this.response.overlapV;
                    var pos = object.get_position();
                   
                    pos.sub(overlap);
                    object.set_position(pos.x,pos.y);
                   
                    
                   
                    
                    if(overlap.y !== 0  && overlap.x !== 0){
                        object.is_on_ground = false; // the edge is not the ground
                    }else if(overlap.y > 0 && overlap.x === 0 ){
                        // if it resoves on the top of the obsticle
                        if(object.velocity.y > -0.05){
                            object.velocity.y = 0;
                            object.is_on_ground = true;
                        }
                        
                    } else if(overlap.y < 0  && overlap.x === 0){
                        // if it is resolving below the obsticle , head hits the sealing
                        object.velocity.y = 0;
                    } 
                    
                    
                    
               }else if(this.type === 1){
                    
                    var overlap = this.response.overlapV;
                    var pos = object.get_position();
                   
                    pos.sub(overlap);
                    object.set_position(pos.x,pos.y);
                   
               }
               
               
           }
           this.response.clear();
    
        
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
        
        context.fillStyle = "blue";
        this.debug_bounds(context);
        
        if(this.is_selected){
            context.globalAlpha = 0.3;
            context.fill();
        }
        
        context.fillStyle = fillStyle;
        context.globalAlpha = alpha;
    };
    
    Obsticle.prototype.clear = function(context){
        
    };
    
    window.Obsticle = Obsticle;
    
}(window));