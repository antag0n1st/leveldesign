GameScreen.prototype.on_mouse_move = function (event) {

        this.mouse_has_moved = true;
        event.point.x = Math.round(event.point.x);
        event.point.y = Math.round(event.point.y);

        if (this.is_space_pressed) {

            if (!game.input.snap_mode) {
                alert("Can't move the screen position in Free Mode");
                return;
            }

            var v = new V(event.point.x, event.point.y);
            v.sub(this.start_drag_point.clone());
            var p = this.start_drag_screen_position.clone().add(v);

            //this.active_layer.set_position(p.x, p.y);
            this.move_layers_to(p);
            

            if (this.queue_points.length > 0) {

                // lets move some points

                var v = new V(event.point.x, event.point.y);
                v.sub(this.last_move_position.clone());

                for (var i = 0; i < this.queue_points.length; i++) {
                    //   this.queue_points[i].add(v);
                }

                this.last_move_position = new V(event.point.x, event.point.y);

            }

        } else if(input_state.get() !== States.main_states.set_parent) {

            // we are probably moveing some polgons

            for (var i = 0; i < this.obsticles.length; i++) {
                var obsticle = this.obsticles[i];

                if (obsticle.is_selected) {
                    // move the obsticle
                    var v = new V(event.point.x, event.point.y);
                    v.sub(this.start_drag_point.clone());
                    var p = this.start_obsticle_position.clone().add(v);

                    obsticle.set_position(p.x, p.y);
                    this.update_inspector_with_obsticle(obsticle);
                    break;
                }

            }

            if (input_state.get() === States.main_states.box_draw && !this.selected_obsticle) {

                var bp = new Vector().copy(this.box_reference_point);


                var v = new V(event.point.x, event.point.y).sub(this.active_layer.get_position());

                var width = v.x - bp.x;
                var height = v.y - bp.y;

                if (width < 0) {
                    bp.x += width;
                    width *= -1;
                }

                if (height < 0) {
                    bp.y += height;
                    height *= -1;
                }

                if (width > 2 && height > 2) {
                    if (this.queue_box) {
                        this.queue_box.remove_from_parent();
                    }

                    this.queue_box = new Obsticle();
                    var bb = new Box(bp, width, height).toPolygon();
                    this.queue_box.bounds = bb;
                    this.queue_box.set_position(bb.pos.x, bb.pos.y);
                    this.active_layer.add_child(this.queue_box);
                }



            } else if (input_state.get() === States.main_states.circle_draw && !this.selected_obsticle) {
                
                var bp = new Vector().copy(this.circle_reference_poiont);

                var v = new V(event.point.x, event.point.y).sub(this.active_layer.get_position());
                v.sub(bp);
                var r = v.len();

                if (this.queue_circle) {
                    this.queue_circle.remove_from_parent();
                }

                this.queue_circle = new Obsticle();
                var bb = new Circle(new V().copy(bp), r);
                this.queue_circle.bounds = bb;
                this.queue_circle.set_position(bb.pos.x, bb.pos.y);
                this.active_layer.add_child(this.queue_circle);

            }  


        }
        
//        if (input_state.get() === States.main_states.path_draw && !this.selected_obsticle && this.queue_path !== null) {
//          
//             var v = new V(event.point.x, event.point.y).sub(this.active_layer.get_position());
//             this.queue_path.remove_last_point();
//             this.queue_path.add_point(v);
//            
//        }

    };