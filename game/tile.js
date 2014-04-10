(function(window,undefined){
    
    function Tile(id){
        this.initialize(id);
    }    
    
    Tile.prototype = new Drawable();
    Tile.prototype.drawable_initialize = Tile.prototype.initialize;    
    Tile.prototype.initialize = function(id){        
        this.drawable_initialize();
        this.id = id;
        this.image = ContentManager.images['tile_'+id].image;
        this.set_size(this.image.width,this.image.height);
        
    };
    
    Tile.prototype.on_added_to_parent = function(parent){
        Drawable.prototype.on_added_to_parent.call(this,parent);
        
    };
    
    Tile.prototype.on_remove_from_parent = function(parent){
        Drawable.prototype.on_remove_from_parent.call(this,parent);
        
    };
    
    Tile.prototype.draw = function(context){
        var pos = this.bounds.pos;
        var alpha = context.globalAlpha;
        context.globalAlpha = 0.6;
        context.drawImage(this.image,pos.x,pos.y);
        context.globalAlpha = alpha;
        
    };
    
    Tile.prototype.clear = function(context){
        
    };
    
    window.Tile = Tile;
    
}(window));