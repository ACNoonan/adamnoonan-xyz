function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14;
  noStroke();
  background(245, 242, 235);
  // Step 2: Colour planes
  // A large red plane on the left side, interrupted by a black bar
  fill(210, 30, 30);
  rect(0, 0, 320, 400);
  fill(255, 220, 30);
  rect(400, 400, 400, 400);
  fill(30, 30, 210);
  rect(200, 600, 200, 200);
  // Step 3: Switch to black
  fill(0, 0, 0);
  // Step 4: The bars
  // One vertical bar cutting across the red plane
  rect(320, 0, W, 800);
  // One horizontal bar near the bottom
  rect(0, 600, 800, W);
  // One vertical bar on the right edge
  rect(600, 0, W, 800);
  // One short horizontal bar in the middle area
  rect(0, 300, 500, W);
}
