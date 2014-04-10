(function(window, undefined) {

    function GameScreen() {
        this.initialize();
    }

    GameScreen.prototype = new Screen();
    GameScreen.prototype.screen_initialize = GameScreen.prototype.initialize;

    GameScreen.prototype.initialize = function() {
        this.screen_initialize();  
        
        
    };  
    
    GameScreen.prototype.on_mouse_down = function(event){
        log("down");
    };
    
    GameScreen.prototype.on_mouse_up = function(event){
        log("up");
    };
    
    GameScreen.prototype.on_mouse_move = function(event){
        log("move");
    };
    
    GameScreen.prototype.on_right_mouse_down = function(event){
        log("right");
    };

    GameScreen.prototype.game_over = function() {
        this.is_game_over = true;
    };

    GameScreen.prototype.update = function() {

        

    };

    GameScreen.prototype.show = function() {
        Screen.prototype.show.call(this);
        game.input.add(this);
    };

    GameScreen.prototype.hide = function() {
        Screen.prototype.hide.call(this);
    };

    window.GameScreen = GameScreen;

}(window));