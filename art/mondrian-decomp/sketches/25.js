function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14;
  noStroke();
  background(245, 242, 235);
  
  // Step 2: Colour planes
  // A large yellow plane in the top right
  fill(255, 220, 30);
  rect(420, 0, 380, 280);
  
  // A medium red plane in the bottom left, aligned with a bar above it
  fill(210, 30, 30);
  rect(0, 450, 320, 350);
  
  // A small blue plane floating in the center-left
  fill(30, 30, 210);
  rect(180, 180, 140, 140);
  
  // Step 3: Switch to black for bars
  fill(0, 0, 0);
  
  // Step 4: The bars
  // Vertical bar on the left edge, stopping before the red plane starts
  rect(0, 0, W, 450);
  
  // Vertical bar creating the right side of the red plane, extending the full height
  rect(320, 0, W, 800);
  
  // Horizontal bar separating the yellow plane from the rest below
  rect(420, 280, 380, W);
  
  // Horizontal bar separating the red plane from the bottom edge
  rect(0, 800 - W, 320, W);
  
  // A short vertical bar segment hanging down from the top, aligned with the blue plane's right edge
  rect(320, 0, W, 180);
  
  // A short horizontal bar segment on the right, stopping before the red plane's vertical bar
  rect(620, 350, 180, W);
}
