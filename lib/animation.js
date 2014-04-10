//(function(window) {

function Animation(sprite_sheet) {
    if (sprite_sheet) {
        this.initialize(sprite_sheet);
    }
}

Animation.prototype = new Drawable();
Animation.prototype.drawable_initialize = Animation.prototype.initialize;

Animation.prototype.initialize = function(sprite_sheet) {

    this.drawable_initialize();

    this.animation_index = 0;

    if (sprite_sheet) {


        this.position = new Vector(0, 0);
        this.current_frame = 0;
        this.time_elapsed = 0;
        this.current_animation = 0;
        this.ticked = 0;
        this.backround_offset_x = 0;
        this.backround_offset_y = 0;
        this.is_removable = true;
        this.is_visible = true;


        this.image = sprite_sheet._images[0];
        this.frames = sprite_sheet._frames[0];

        this.width = this.frame_width = Math.floor(this.image.width / this.frames.x);
        this.height = this.frame_height = Math.floor(this.image.height / this.frames.y);


        if(sprite_sheet._regs[0]){
                     var reg = sprite_sheet._regs[0];
                     
        }else{
            var reg = {x:0,y:0,width:1,height:1};
        }

        this.set_size(this.width*reg.width, this.height*reg.height);
        this.set_anchor(reg.x,reg.y);
                
                
        

        this.sprite_sheet = sprite_sheet;

        this.has_ended = false;
        this.lock_callback = false;


    }



};


Animation.prototype.play = function(anime_name, start_at_begining) {

    var animations = this.sprite_sheet._animations;
    var count = animations.length;

    for (var i = 0; i < count; i++) {

        var animation = animations[i];
        this.animation_index = 0;
        if (animation[anime_name]) {
            // lets set 
            this.current_animation = animation[anime_name];
            this.image = this.sprite_sheet._images[i];
            this.frames = this.sprite_sheet._frames[i];

            this.frame_width = Math.floor(this.image.width / this.frames.x);
            this.frame_height = Math.floor(this.image.height / this.frames.y);

            // this.reg = this.sprite_sheet._regs[i];

            break;
        }

        // this.image = config.image.image;
        //  this.image_name = config.image.image_name;

        //  this.frame_width = Math.floor(this.image.width / config.frames.x);
        //  this.frame_height = Math.floor(this.image.height / config.frames.y);

        //  this.frames = config.frames;
        //  this.animations = config.animations;

        //  this.reg = config.reg;

    }


    this.time_elapsed = (start_at_begining || this.time_elapsed > this.current_animation.duration) ? 0 : this.time_elapsed;
    this.current_frame = this.get_current_frame();
    this.ticked = 0;
    this.has_ended = false;
    this.lock_callback = false;


};

Animation.prototype.get_current_frame = function() {
    var p = this.time_elapsed / this.current_animation.duration;
    p = (p < 1.0) ? p : 0.99;
    return this.current_animation.start + Math.floor((this.current_animation.end - this.current_animation.start + 1) * p);

};

Animation.prototype.set_frame = function(frame) {
    this.current_frame = frame;
};

Animation.prototype.recalculate_speed = function(speed) {
    return (speed * Ticker.step) * (Ticker.fps / 1000);
};



Animation.prototype.advance = function() {

    this.time_elapsed += Ticker.step;

    var x = this.frames.x;
    var c = this.current_frame;
    this.backround_offset_x = c % x | 0;
    this.backround_offset_y = c / x | 0;


    if (this.time_elapsed >= this.current_animation.duration) {
        if (this.current_animation.loop) {
            this.time_elapsed = 0;
        } else {
            
            this.current_frame = this.current_animation.end;
            if (!this.has_ended) {
                this.has_ended = true;
            }
        }
    } else {

        this.current_frame = this.get_current_frame();

    }



};

Animation.prototype.draw = function(context) {
    this.advance();


    var w = this.frame_width;
    var h = this.frame_height;
    //var reg = this.reg;

    //var pos = this.get_calculated_position();
    var anchor = this.bounds.pos;
    var ach = this.get_anchor();
    var pos = this.bounds.pos.clone().add(new Vector(-w*ach.x,-h*ach.y));

    if (this.is_visible) {

        if (this.angle !== 0) {
            context.save();
            context.translate(anchor.x, anchor.y);
            context.rotate(Math.degrees_to_radians(this.angle));
            context.translate(-anchor.x, -anchor.y);
        }
        context.drawImage(this.image,
                this.backround_offset_x * w,
                this.backround_offset_y * h,
                w,
                h,
                Config.scale_down_x * (pos.x),
                Config.scale_down_x * (pos.y),
                Config.scale_down_x * w,
                Config.scale_down_x * h
                );

        if (this.angle !== 0) {
            context.restore();
        }




    }





    if (!this.lock_callback && this.has_ended) {
        if (this.current_animation.callback) {
            this.current_animation.callback();
        }
        this.lock_callback = true;
    }

};

Animation.prototype.clear = function(context) {


//        if (!Config.is_mobile) {
//
//            var s = this.sprite_sheet;
//            var w = s.frame_width;
//            var h = s.frame_height;
//            var position = this.position;
//
//            if (this.is_visible) {
//                context.clearRect(Config.scale_down_x * (position.x - s.reg.x - 1), Config.scale_down_x * (position.y - 1 - s.reg.y), Config.scale_down_x * (w + 2), Config.scale_down_x * (h + 2));
//            }
//
//        }



};

//    window.Animation = Animation;
//
//}(window));