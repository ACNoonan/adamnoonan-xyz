function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 12;
  noStroke();
  background(245, 242, 235);
  // Step 2: Colour planes stepping down from top-left towards bottom-right
  fill(210, 30, 30);
  rect(0, 0, 320, 280);
  fill(255, 220, 30);
  rect(140, 180, 380, 300);
  fill(30, 30, 210);
  rect(350, 400, 450, 400);
  // Step 3: Switch to black
  fill(0, 0, 0);
  // Step 4: Black bars defining the grid and the stepping effect
  // Vertical bar separating first plane and rest
  rect(320, 0, W, 800);
  // Vertical bar cutting off the top of the third plane (yellow)
  rect(520, 0, W, 400);
  // Horizontal bar separating the top yellow plane from the bottom blue one
  rect(140, 180, 380, W);
  // Horizontal bar near the bottom
  rect(0, 600, 600, W);
  // Short stub bar creating a small cell gap
  rect(650, 0, W, 150);
}
