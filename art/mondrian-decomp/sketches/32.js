function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14;
  noStroke();
  background(245, 242, 235);
  fill(210, 30, 30);
  rect(0, 0, 320, 280);
  fill(255, 220, 30);
  rect(350, 400, 450, 400);
  fill(30, 30, 210);
  rect(50, 300, 250, 400);
  fill(0, 0, 0);
  rect(320, 0, W, 300);
  rect(320, 500, W, 300);
  rect(0, 280, 320, W);
  rect(80, 280, W, 420);
  rect(500, 0, W, 200);
  rect(500, 600, W, 200);
  rect(0, 700, 500, W);
}
