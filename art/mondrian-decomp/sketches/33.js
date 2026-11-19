function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14;
  noStroke();
  background(245, 242, 235);
  // Two colour planes overlapping: one blue on the left, one red on the right
  // The blue plane is placed first, then the red plane drawn over it.
  fill(30, 30, 210);
  rect(0, 0, 300, 600);
  fill(210, 30, 30);
  rect(250, 200, 550, 500);
  
  // Black bars to structure the composition
  // One vertical bar dividing the left section
  fill(0, 0, 0);
  rect(300, 0, W, 800);
  
  // One horizontal bar near the bottom
  rect(0, 600, 800, W);
  
  // One vertical bar on the far right, stopping short to create asymmetry
  rect(700, 0, W, 500);
  
  // One horizontal bar on the far left, stopping short
  rect(0, 400, 300, W);
}
