function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14;
  noStroke();
  background(245, 242, 235);
  fill(30, 30, 210);
  rect(0, 0, 300, 800);
  fill(210, 30, 30);
  rect(580, 120, 200, 280);
  fill(255, 220, 30);
  rect(320, 480, 240, 280);
  fill(0, 0, 0);
  rect(300, 0, W, 800);
  rect(560, 0, W, 800);
  rect(0, 400, 300, W);
  rect(560, 400, 240, W);
  rect(300, 480, W, 280);
}
