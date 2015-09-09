// Draws faces onto all of the canvas. Puts 10px distance between each
// face
function draw_faces() {
  var canvas = document.getElementById("faces_bkgd");
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;

  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");

    // Setting a background color
    ctx.fillStyle = "rgb(230, 234, 242)";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    // Creating the shape of the face
    var shape = new Path2D();
    shape.rect(0,0,60,60);

    // colors are [lavendar, pink lavendar, gainsburo]
    var colors = ["rgb(224, 220, 250)", "rgb(232, \
                 221, 240)", "rgb(213, 213, 237)"];
    // Keeps track of the colors for each face drawn onto the canvas
    var faces_color = [];

    var num_width = Math.floor(canvas.width/80);
    var num_height = Math.floor(canvas.height/80);

    // Does actual drawing of  face onto the canvas
    function draw_face(x, y, color, shape, expr) {
      ctx.save();
      ctx.translate(x, y);

      // Drawing the shape of the face
      ctx.fillStyle = color
        ctx.shadowBlur = 5;
      ctx.shadowColor = color;
      ctx.fill(shape);

      // Giving the face a border
      ctx.lineWidth = 3;
      ctx.shadowBlur = 100;
      ctx.shadowColor = "rgba(245, 146, 93,0.1)";
      ctx.strokeStyle = ctx.shadowColor;

      ctx.restore();
    }

    // Setting up the colors and initial expressions for each face
    for (var i = 0; i < num_width ; i += 1) {
      for (var j = 0; j < num_height ; j += 1) {
        // Math.floor(Math.random()*100) chooses a random number from an
        // even distribution of the integers[0,100)
        var c = Math.floor(Math.random()*100)%colors.length;

        // Draw the initial face on the canvas
        draw_face(i*90,j*90, colors[c], shape);

        // Keeps track of each faces's color
        faces_color.push(c);

      }
    }

    // Changes the expressions of a few random faces at a time
    function change_facial_expr() {
      var face_num = 0;
      // Chooses a random face to change
      var blink = Math.floor(Math.random() * 100000)%faces_color.length
        for (var i = 0; i < num_width; i += 1) {
          for (var j = 0; j < num_height ; j += 1) {
            // Determines if the face is to be changed
            if (face_num  % num_width ==  blink % num_width) {
              faces_color[face_num] = (faces_color[face_num]+1)%colors.length
                draw_face(i*90, j*90, colors[faces_color[face_num]], shape);
            }

            face_num += 1;
          }
        }

    }

    window.setInterval(change_facial_expr, 1000);
  }
}
