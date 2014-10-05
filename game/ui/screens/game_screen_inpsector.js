GameScreen.prototype.on_name_change = function(object){
    
    var value = object.value;
    
    if(this.selected_obsticle){
        this.selected_obsticle.name = value;
    }
    
};

GameScreen.prototype.on_z_index_change = function(object){
    
    var value = object.value;
    
    if(this.selected_obsticle){
        this.selected_obsticle.z_index = value;
    }
    
};


GameScreen.prototype.on_tag_change = function(object){
    
    var value = object.value;
    
    if(this.selected_obsticle){
        this.selected_obsticle.tag = value;
    }
    
};

GameScreen.prototype.on_x_position_change = function(object){
    
    var value = object.value;
    
    if(this.selected_obsticle){
        var pos = this.selected_obsticle.get_position();
        this.selected_obsticle.set_position(Math.round(value),pos.y);
    }
    
};

GameScreen.prototype.on_y_position_change = function(object){
    
     var value = object.value;
    
    if(this.selected_obsticle){
        var pos = this.selected_obsticle.get_position();
        this.selected_obsticle.set_position(pos.x,Math.round(value));
    }
    
};

GameScreen.prototype.on_type_change = function(object){
    
    var value = object.value;
    
    if(this.selected_obsticle){
        this.selected_obsticle.type = value;
    }
    
};

GameScreen.prototype.on_set_parent = function(){
    
    if(this.selected_obsticle){
        input_state.set(States.main_states.set_parent);
    }
    
};

GameScreen.prototype.update_inspector_with_obsticle = function (obsticle) {

        if(obsticle){
            
            this.name_label.value = obsticle.name;
            this.z_index_label.value = obsticle.z_index;
            this.tag_label.value = obsticle.tag;
            this.type_selector.selectedIndex = obsticle.type;
            this.x_position_label.value =  obsticle.get_position().x;
            this.y_position_label.value =  obsticle.get_position().y;
                             
        }else{
            
            this.name_label.value = '';
            this.z_index_label.value = '';
            this.tag_label.value = '';
            this.type_selector.selectedIndex = 0;
            this.x_position_label.value = '';
            this.y_position_label.value = '';
        }

    };