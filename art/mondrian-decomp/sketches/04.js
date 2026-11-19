function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 12;
  noStroke();
  background(245, 242, 235);
  // Step 2: Colour planes (Red is largest)
  fill(210, 30, 30);
  rect(0, 0, 350, 220);
  fill(255, 220, 30);
  rect(0, 220, 350, 580);
  fill(30, 30, 210);
  rect(362, 0, 438, 180);
  fill(30, 30, 210);
  rect(362, 560, 438, 240);
  fill(0, 0, 0);
  // Step 3: Black bars
  rect(350, 0, W, 800);
  rect(0, 180, 350, W);
  rect(0, 560, 350, W);
  rect(400, 0, W, 400);
  rect(400, 560, W, 240);
}
