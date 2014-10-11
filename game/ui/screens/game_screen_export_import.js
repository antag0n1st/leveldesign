GameScreen.prototype.export_polygons = function (button) {

    this.end_polygon();

    var json = {}
    var obsticles = [];
    var the_pos = this.active_layer.get_position();

    this.move_layers_to(new V());

    for (var i = 0; i < this.obsticles.length; i++) {

        var obsticle = this.obsticles[i];

        if (obsticle.get_parent() instanceof Layer) {

            var o = {};
            o.object_type = obsticle.inner_type;
            o.pos = obsticle.get_position();
            o.layer_name = obsticle.layer_name;
            o.z_index = obsticle.z_index;
            o.c_index = obsticle.c_index;
            o.tag = obsticle.tag;
            o.name = obsticle.name;
            o.type = obsticle.type;

            if (obsticle.inner_type === "Path") {
                o.points = obsticle.points;
            } else if (obsticle.inner_type === "Circle") {
                o.radius = obsticle.bounds.r;
            } else if (obsticle.inner_type === "Graphic") {
                o.image_name = obsticle.image_name;
            } else {
                o.points = obsticle.bounds.points;
            }

            obsticles.push(o);
        }

    }

    json.obsticles = obsticles;
    json.layers = ContentManager.layers;
    json.types = ContentManager.object_types;
    json.images = [];

    for (var image in Images) {

        var im = Images[image];
        json.images.push({
            url: im.url,
            file_name: im.file_name,
            key: im.image_name
        });

    }

    this.move_layers_to(the_pos);

    var data = JSON.stringify(json);
    window.open('data:application/json;charset=utf-8,' + escape(data), "_blank");

};

GameScreen.prototype.import = function (json) {
    var data = JSON.parse(json);

    for (var i = 0; i < data.images.length; i++) {

        var img = data.images[i];
        ContentManager.add_image(img.key, img.url);

        var element = "<img ";
        element += " src='" + img.url + "' ";
        element += " id='" + img.key + "' ";
        element += " onclick=\"game.navigator.current_screen.on_image_click(this,'" + img.key + "')\" ";
        element += " />";

        game.navigator.current_screen.library.innerHTML += element;

    }
    var that = this;
    ContentManager.download_resources(this.stage, function () {
        that.import_obsticles(data);
    });

};

GameScreen.prototype.import_obsticles = function (data) {
    var types = data.types;
    var obsticles = data.obsticles;


//            o.object_type = obsticle.inner_type;
//            o.pos = obsticle.get_position();
//            o.layer_name = obsticle.layer_name;
//            o.z_index = obsticle.z_index;
//            o.c_index = obsticle.c_index;
//            o.tag = obsticle.tag;
//            o.name = obsticle.name;
//            o.type = obsticle.type;
//
//            if (obsticle.inner_type === "Path") {
//                o.points = obsticle.points;
//            } else if (obsticle.inner_type === "Circle") {
//                o.radius = obsticle.bounds.r;
//            } else if (obsticle.inner_type === "Graphic") {
//                o.image_name = obsticle.image_name;
//            } else {
//                o.points = obsticle.bounds.points;
//            }

    for (var i = 0; i < obsticles.length; i++) {
        var obsticle = obsticles[i];
        var layer = this.get_layer_by_name(obsticle.layer_name);
        
        

        if (obsticle.object_type === "Polygon") {
            var points = this.get_points(obsticle);
            var polygon = new Polygon(new Vector(obsticle.pos.x, obsticle.pos.y), points);            
            
            var o = new Obsticle();
            
            o.bounds = polygon;            
            o.layer = layer;
            o.layer_name = layer.name;
            o.inner_type = "Polygon";
            o.z_index = obsticle.z_index;
            o.c_index = obsticle.c_index;
            o.tag = obsticle.tag;
            o.name = obsticle.name;
            o.type = obsticle.type;
            
            o.set_position(obsticle.pos.x, obsticle.pos.y);
            
            layer.add_child(o);
            this.obsticles.push(o);
            
        }else if (obsticle.object_type === "Circle") {
      
            var radius = obsticle.radius;
            var circle = new Circle(new Vector(obsticle.pos.x, obsticle.pos.y), radius);            
            
            var o = new Obsticle();
            
            o.bounds = circle;            
            o.layer = layer;
            o.layer_name = layer.name;
            o.inner_type = "Circle";
            o.z_index = obsticle.z_index;
            o.c_index = obsticle.c_index;
            o.tag = obsticle.tag;
            o.name = obsticle.name;
            o.type = obsticle.type;
            
            o.set_position(obsticle.pos.x, obsticle.pos.y);
            
            layer.add_child(o);
            this.obsticles.push(o);
            
        }else if (obsticle.object_type === "Point") {
      
            var circle = new Circle(new Vector(obsticle.pos.x, obsticle.pos.y), 10);            
            
            var o = new Obsticle();
            
            o.bounds = circle;            
            o.layer = layer;
            o.layer_name = layer.name;
            o.inner_type = "Point";
            o.z_index = obsticle.z_index;
            o.c_index = obsticle.c_index;
            o.tag = obsticle.tag;
            o.name = obsticle.name;
            o.type = obsticle.type;
            o.normal_color = "yellow";
            
            o.set_position(obsticle.pos.x, obsticle.pos.y);
            
            layer.add_child(o);
            this.obsticles.push(o);
            
        }else if (obsticle.object_type === "Path") {
            
            var points = this.get_points(obsticle);
            var o = new Path();
            
            for(var j=0;j<points.length;j++){
                var p = points[j];
                o.add_point(p);
            }
                        
            o.layer = layer;
            o.layer_name = layer.name;
            o.inner_type = "Path";
            o.z_index = obsticle.z_index;
            o.c_index = obsticle.c_index;
            o.tag = obsticle.tag;
            o.name = obsticle.name;
            o.type = obsticle.type;
            
            o.set_position(obsticle.pos.x, obsticle.pos.y);
            
            layer.add_child(o);
            this.obsticles.push(o);
            
        }else if (obsticle.object_type === "Graphic") {
            
            var image_name = obsticle.image_name;
            var o = new Graphic(image_name);
                      
            o.layer = layer;
            o.layer_name = layer.name;
            o.inner_type = "Graphic";
            o.z_index = obsticle.z_index;
            o.c_index = obsticle.c_index;
            o.tag = obsticle.tag;
            o.name = obsticle.name;
            o.type = obsticle.type;
            
            o.set_position(obsticle.pos.x, obsticle.pos.y);
            
            layer.add_child(o);
            this.obsticles.push(o);
            this.graphics.push(o);
            
        }


        
    }




};

GameScreen.prototype.get_points = function (object) {
    var points = [];
    for (var j = 0; j < object.points.length; j++) {
        var point = object.points[j];
        points.push(new Vector(point.x, point.y));
    }
    return points;
};

GameScreen.prototype.get_layer_by_name = function (name) {
    for (var i = 0; i < this.layers.length; i++) {
        var layer = this.layers[i];
        if (layer.name === name) {
            return layer;
        }
    }
    return false;
};

GameScreen.prototype.load_file = function (files) {

    if (files[0]) {

        var base_url = window.document.URL.replace("index.html", "import") + '/';
        var name = files[0].name;
        var full_path = base_url + name;
        var that = this;
        var file_data = "";
        ContentManager.add_file(full_path, function (data) {
            file_data = data;
        });

        ContentManager.download_resources(this.stage, function () {
            that.import(file_data);
        });

    } else {
        log("no file choosen");
    }

};



GameScreen.prototype.get_object_type_name = function (object) {

    if (object instanceof Obsticle) {
        return "Obsticle";
    } else if (object instanceof Path) {
        return "Path";
    } else if (object instanceof Graphics) {
        return "Graphics";
    } else if (object instanceof Layer) {
        return "Layer";
    }

    return "";
};

GameScreen.prototype.export_create_string = function () {


    this.end_polygon();
    var the_pos = this.active_layer.get_position();
    this.move_layers_to(new V());
    var create_string = "";

    for (var i = 0; i < this.obsticles.length; i++) {
        var o = {};
        o.pos = this.obsticles[i].bounds.pos;
        o.points = this.obsticles[i].bounds.points;

        create_string += " var bounds = new Polygon(new Vector(" + 0 + "," + 0 + "), [";
        for (var j = 0; j < o.points.length; j++) {
            var pp = o.points[j];
            create_string += " new Vector(" + pp.x + "," + pp.y + "),";
        }
        create_string = create_string.slice(0, -1);
        create_string += " ]); ";
        create_string += " bounds.translate(" + o.pos.x + "," + o.pos.y + "); ";

    }

    log(create_string);

    this.move_layers_to(the_pos);



};