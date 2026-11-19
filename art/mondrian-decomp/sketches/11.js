function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14; // the one bar thickness for this whole painting; choose it once, between 10 and 14
  noStroke();
  background(245, 242, 235);   // step 1: the pale ground, once, first
  // step 2: the colour planes, each one as a fill(...) line followed by a rect(...) line
  fill(210, 30, 30);           // step 3: switch to black, once, before any bar
  // step 3: red plane for the tall, narrow cell on the left
  fill(210, 30, 30);
  rect(10, 80, 120, 640);
  // step 2: yellow plane for the wide, low cell at the bottom
  fill(255, 220, 30);
  rect(350, 500, 450, 300);
  // step 2: blue plane for a medium cell in the upper right
  fill(30, 30, 210);
  rect(500, 50, 300, 250);
  fill(0, 0, 0);               // step 3: switch to black, once, before any bar
  // step 4: the bars, each one a rect whose thickness is W
  // Vertical bar separating the tall red cell from the rest
  rect(130, 0, W, 800);
  // Horizontal bar separating the top area from the bottom yellow area
  rect(130, 500, 480, W);
  // Vertical bar cutting the blue cell
  rect(500, 0, W, 800);
  // Short stub bar hanging from the top right
  rect(720, 0, W, 180);
  // Small stub bar at the very bottom edge
  rect(700, 786, W, 14);
  // A short horizontal bar in the middle right open space
  rect(350, 320, 150, W);
}
