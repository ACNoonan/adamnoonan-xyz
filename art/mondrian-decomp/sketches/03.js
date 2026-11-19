function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14;
  noStroke();
  background(245, 242, 235);
  fill(210, 30, 30);
  rect(0, 0, 320, 300);
  fill(255, 220, 30);
  rect(380, 120, 420, 180);
  fill(30, 30, 210);
  rect(50, 400, 280, 350);
  fill(0, 0, 0);
  rect(320, 0, W, 400);
  rect(400, 0, W, 800);
  rect(0, 300, 280, W);
  rect(320, 500, 480, W);
  rect(480, 300, W, 200);
}
