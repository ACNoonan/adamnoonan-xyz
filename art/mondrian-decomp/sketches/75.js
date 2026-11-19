function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14;
  noStroke();
  background(245, 242, 235);
  // Red is the largest color plane, occupying a significant portion of the top-right and extending down.
  fill(210, 30, 30);
  rect(350, 50, 400, 600);
  
  // Yellow plane in the bottom-left, smaller than the red one.
  fill(255, 220, 30);
  rect(20, 400, 300, 300);
  
  // Blue plane in the top-left corner, roughly equal in size to the yellow.
  fill(30, 30, 210);
  rect(0, 0, 200, 250);
  
  // Black bars: One full vertical divider separating the left and right thirds roughly.
  // One horizontal bar cutting across the bottom section.
  // A short vertical bar segment to create asymmetry.
  fill(0, 0, 0);
  rect(300, 0, W, 800);
  rect(0, 650, 300, W);
  rect(600, 0, W, 400);
}
