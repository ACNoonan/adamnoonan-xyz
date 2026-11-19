function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14;
  noStroke();
  background(245, 242, 235);
  // Step 2: Colour planes. Narrow red plane on the right, broad yellow one spanning the left.
  fill(210, 30, 30);
  rect(500, 0, 60, 400);
  fill(255, 220, 30);
  rect(0, 200, 450, 550);
  fill(30, 30, 210);
  rect(560, 450, 240, 320);
  fill(0, 0, 0);
  // Step 4: Black bars creating the grid structure.
  // Vertical bars
  rect(450, 0, W, 800);
  rect(560, 0, W, 800);
  // Horizontal bars
  rect(0, 200, 800, W);
  rect(0, 400, 800, W);
  rect(0, 770, 800, W);
}
