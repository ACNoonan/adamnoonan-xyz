function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14;
  noStroke();
  background(245, 242, 235);
  // Step 2: Colour planes
  fill(255, 220, 30);
  rect(300, 0, 160, 600); // Tall yellow plane crossing two cells (top and middle)
  fill(210, 30, 30);
  rect(500, 350, 300, 450); // Red plane in bottom right
  fill(30, 30, 210);
  rect(0, 550, 250, 250); // Blue plane in bottom left
  // Step 3: Switch to black
  fill(0, 0, 0);
  // Step 4: Black bars
  rect(460, 0, W, 350); // Vertical bar cutting the yellow plane
  rect(0, 400, 500, W); // Horizontal bar separating top yellow from bottom
  rect(250, 550, W, 250); // Vertical bar separating blue from center
  rect(650, 0, W, 800); // Far right vertical bar
  rect(0, 750, 800, W); // Bottom horizontal bar
}
