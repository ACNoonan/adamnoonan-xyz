function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14;
  noStroke();
  background(245, 242, 235);
  // Step 2: Colour planes
  // A blue plane running off the right edge (x=400, width=400)
  fill(30, 30, 210);
  rect(400, 100, 400, 500);
  // A yellow plane in the lower left quadrant
  fill(255, 220, 30);
  rect(120, 550, 260, 230);
  // A red plane in the upper left corner
  fill(210, 30, 30);
  rect(40, 40, 240, 160);
  
  // Step 3: Switch to black
  fill(0, 0, 0);
  // Step 4: The bars
  // A full vertical bar at x=280, splitting the left side
  rect(280, 0, W, 800);
  // A vertical bar segment at x=520, cutting the blue plane
  rect(520, 0, W, 300);
  // A horizontal bar segment at y=300, crossing the blue plane but stopping before the yellow plane
  rect(400, 300, 320, W);
  // A horizontal bar at the very bottom, spanning the full width
  rect(0, 760, 800, W);
  // A short vertical bar segment hanging from the top on the right side
  rect(680, 0, W, 200);
}
