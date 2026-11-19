function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14;
  noStroke();
  background(245, 242, 235);
  
  // Blue plane running off the left edge
  fill(30, 30, 210);
  rect(0, 50, 180, 400);
  
  // Yellow plane in the upper right quadrant
  fill(255, 220, 30);
  rect(600, 0, 200, 250);
  
  // Red plane in the lower left, distinct from the blue
  fill(210, 30, 30);
  rect(0, 650, 300, 150);
  
  // Black bars
  fill(0, 0, 0);
  // Vertical bar separating the blue plane
  rect(180, 0, W, 800);
  // Vertical bar on the far right
  rect(600, 0, W, 800);
  // Horizontal bar cutting across the bottom
  rect(0, 650, 800, W);
  // Horizontal bar cutting across the middle
  rect(0, 450, 600, W);
}
