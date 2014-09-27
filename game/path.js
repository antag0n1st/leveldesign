//(function(window,undefined){
    
    function Path(){
        this.initialize();
    }    
    
    Path.prototype = new Drawable();
    Path.prototype.drawable_initialize = Path.prototype.initialize;    
    Path.prototype.initialize = function(){        
        this.drawable_initialize();
        
        this.type = 0;
        this.response = new Response();
        this.name = '';
        this._is_selected = false;
        
        this.normal_color = null;
        
        this.points = [];
        this.circles = [];
        
        this._buffer_point = null;
        
        this.__defineSetter__("is_selected", function (value){
            this._is_selected = value;
            
            for(var i=0;i<this.circles.length;i++){
                var c = this.circles[i];
                c.is_selected = value;
            }
            
        });

        this.__defineGetter__("is_selected", function () {
            return this._is_selected;
        });
        
        
        this.__defineSetter__("buffer_point", function (value){
                this._buffer_point = value;
        });
        
        this.__defineGetter__("buffer_point", function () {
            return this._buffer_point;
        });
        
        
    };
    
    Path.prototype.update = function(dt){
        
    };
    
    Path.prototype.add_point = function(point){   
        
        var p = point;
        
        if(this.buffer_point){
            p = this.buffer_point;
        }
        
        this.points.push(new V().copy(p));
        var c = new Circle(new V().copy(p),7);
        
        var o = new Obsticle();
        o.bounds = c;
        o.set_position(c.pos.x,c.pos.y);
        this.add_child(o);
        this.circles.push(o);
        return o;
    };
    
    Path.prototype.remove_last_point = function(){
        var c = this.circles.pop();
        c.remove_from_parent();
        this.points.pop();
    };
    
    Path.prototype.check = function(point){
       
       for(var i=0;i<this.circles.length;i++){
           var b = this.circles[i].bounds;
           if(SAT.pointInCircle(point,b)){
               return true;
           }
       }
       return false;
       
    };
    
    Path.prototype.on_added_to_parent = function(parent){
        Drawable.prototype.on_added_to_parent.call(this,parent);
        
    };
    
    Path.prototype.on_remove_from_parent = function(parent){
        Drawable.prototype.on_remove_from_parent.call(this,parent);
        
    };
    
    Path.prototype.draw = function(context){
        
       
        
        var alpha = context.globalAlpha;
        var strokeStyle = context.strokeStyle;
        var lineWidth = context.lineWidth;
        
        context.lineWidth= 3;
        if(this.is_selected){
            context.strokeStyle = "blue";
        }else{
            context.strokeStyle = "#fcff00";
        }
        
        context.globalAlpha = 0.3;
        
        context.beginPath();

        var p = this.bounds.pos.clone();
        var prev = null;
        for (var i = 0; i < this.points.length;i++) {

            var c = this.points[i].clone();
            c.add(p);

            if (i===0) {
                context.moveTo(c.x, c.y);
            } else {
                context.moveTo(prev.x, prev.y);
                context.lineTo(c.x, c.y);
            }
            prev = c;
        }


        context.closePath();

        context.stroke();

        context.globalAlpha = alpha;
        context.strokeStyle = strokeStyle;
        context.lineWidth = lineWidth;
        
    };
    
    Path.prototype.clear = function(context){
        
    };
    
//    window.Path = Path;
    
//}(window));