function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14;
  noStroke();
  background(245, 242, 235);
  fill(210, 30, 30);
  rect(0, 580, 600, 220);
  fill(255, 220, 30);
  rect(200, 0, 400, 500);
  fill(30, 30, 210);
  rect(600, 0, 200, 300);
  fill(0, 0, 0);
  rect(600, 0, W, 800);
  rect(0, 500, 600, W);
  rect(200, 0, W, 500);
  rect(0, 580, 600, W);
}
