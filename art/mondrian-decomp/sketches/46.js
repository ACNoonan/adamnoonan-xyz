function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14;
  noStroke();
  background(245, 242, 235);
  // Step 2: Colour planes
  // A large yellow plane on the left side
  fill(255, 220, 30);
  rect(0, 0, 320, 500);
  // A medium blue plane in the bottom right area
  fill(30, 30, 210);
  rect(550, 450, 250, 350);
  // A small red plane near the top right
  fill(210, 30, 30);
  rect(580, 50, 180, 120);
  // Step 3: Switch to black for bars
  fill(0, 0, 0);
  // Step 4: Black bars
  // A vertical bar slightly left of center, stopping short at the top and bottom
  rect(320, 0, W, 300);
  // A vertical bar right of center, going full height
  rect(550, 0, W, 800);
  // A horizontal bar in the lower section, extending from left edge to the right vertical bar
  rect(0, 500, 550, W);
  // A short horizontal bar segment in the upper right quadrant, floating near the red plane
  rect(520, 180, 180, W);
  // A short vertical bar segment in the center, connecting the top section to the middle
  rect(280, 300, W, 150);
}
