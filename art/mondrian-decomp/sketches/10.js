function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14;
  noStroke();
  background(245, 242, 235);
  // Step 2: Colour planes
  // Large yellow plane in the upper right, extending deep into the canvas
  fill(255, 220, 20);
  rect(400, 50, 386, 350);
  // Smaller red plane in the middle right
  fill(210, 40, 40);
  rect(520, 420, 266, 160);
  // Tiny blue plane in the lower right corner
  fill(30, 40, 200);
  rect(650, 620, 136, 160);
  // Step 3: Switch to black
  fill(0, 0, 0);
  // Step 4: The bars
  // Vertical bar dividing the left quiet space from the right busy space
  rect(386, 0, W, 800);
  // Vertical bar further right
  rect(600, 0, W, 800);
  // Horizontal bar near the top, stopping at the first vertical bar
  rect(0, 280, 386, W);
  // Horizontal bar in the middle, crossing the first vertical but stopping before the second
  rect(386, 500, 214, W);
  // Horizontal bar at the bottom, crossing both vertical bars
  rect(386, 700, 414, W);
}
