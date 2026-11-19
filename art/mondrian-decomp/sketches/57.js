function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14;
  noStroke();
  background(245, 242, 235);
  fill(210, 30, 30);
  rect(40, 50, 200, 280);
  fill(30, 30, 210);
  rect(620, 520, 180, 280);
  fill(255, 220, 30);
  rect(250, 100, 500, 600);
  fill(0, 0, 0);
  rect(140, 0, W, 800);
  rect(700, 0, W, 400);
  rect(0, 300, 140, W);
  rect(140, 300, 400, W);
  rect(500, 300, W, 500);
}
