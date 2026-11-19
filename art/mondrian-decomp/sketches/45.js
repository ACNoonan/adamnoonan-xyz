function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14;
  noStroke();
  background(245, 242, 235);
  fill(255, 220, 30);
  rect(0, 0, 800, 280);
  fill(210, 30, 30);
  rect(0, 600, 500, 200);
  fill(30, 30, 210);
  rect(300, 280, 500, 320);
  fill(0, 0, 0);
  rect(500, 0, W, 600);
  rect(0, 280, 300, W);
  rect(0, 600, W, 200);
  rect(750, 0, W, 300);
  rect(750, 500, W, 300);
}
