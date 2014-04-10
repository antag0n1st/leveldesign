States = {};

States.main_states = {};

States.main_states.inital_state = 'inital_state';
States.main_states.move_canvas = 'move_canvas';
States.main_states.polygon_draw = 'polygon_draw';
States.main_states.polygon_selected = 'polygon_selected';
States.main_states.circle_draw = 'circle_draw';
States.main_states.circle_selected = 'circle_selected';
States.main_states.graphics_draw = 'graphics_draw';
States.main_states.graphics_selected = 'graphics_selected';
States.main_states.path_draw = 'path_draw';
States.main_states.path_selected = 'path_selected';

var _main_states = [
    {
        name: 'inital_state',
        initial: true,
        events: {
            inital_state: 'inital_state',
            move_canvas: 'move_canvas',
            polygon_draw: 'polygon_draw',
            polygon_selected: 'polygon_selected',
            circle_draw : 'circle_draw',
            circle_selected : 'circle_selected',
            graphics_draw: 'graphics_draw',
            graphics_selected: 'graphics_selected',
            path_draw: 'path_draw',
            path_selected: 'path_selected'
        }
    },
    {
        name: 'move_canvas',
        events: {
            inital_state: 'inital_state',
            move_canvas: 'move_canvas',
            polygon_draw: 'polygon_draw',
            polygon_selected: 'polygon_selected',
            circle_draw : 'circle_draw',
            circle_selected : 'circle_selected',
            graphics_draw: 'graphics_draw',
            graphics_selected: 'graphics_selected',
            path_draw: 'path_draw',
            path_selected: 'path_selected'
        }
    },
    {
        name: 'polygon_draw',
        events: {
            inital_state: 'inital_state',
            move_canvas: 'move_canvas',
            polygon_draw: 'polygon_draw',
            circle_draw : 'circle_draw',
            graphics_draw: 'graphics_draw',
            path_draw: 'path_draw'
        }
    },
    {
        name: 'circle_draw',
        events: {
            inital_state: 'inital_state',
            move_canvas: 'move_canvas',
            polygon_draw: 'polygon_draw',
            circle_draw : 'circle_draw',
            graphics_draw: 'graphics_draw',
            path_draw: 'path_draw'
        }
    },
    {
        name: 'graphics_draw',
        events: {
            inital_state: 'inital_state',
            move_canvas: 'move_canvas',
            polygon_draw: 'polygon_draw',
            circle_draw : 'circle_draw',
            graphics_draw: 'graphics_draw',
            path_draw: 'path_draw'
        }
    },
    {
        name: 'path_draw',
        events: {
            inital_state: 'inital_state',
            move_canvas: 'move_canvas',
            polygon_draw: 'polygon_draw',
            circle_draw : 'circle_draw',
            graphics_draw: 'graphics_draw',
            path_draw: 'path_draw'
        }
    },
    {
        name: 'polygon_selected',
        events: {
            inital_state: 'inital_state',
            move_canvas: 'move_canvas',
            polygon_draw: 'polygon_draw',
            circle_draw : 'circle_draw',
            graphics_draw: 'graphics_draw',
            path_draw: 'path_draw',
            polygon_selected: 'polygon_selected'
        }
    }

];


input_state = new StateMachine(_main_states);