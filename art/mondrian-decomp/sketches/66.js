function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14;
  noStroke();
  background(245, 242, 235);
  fill(210, 30, 30);
  rect(600, 0, 200, 600);
  fill(255, 220, 30);
  rect(200, 400, 400, 400);
  fill(30, 30, 210);
  rect(0, 600, 200, 200);
  fill(0, 0, 0);
  rect(200, 0, W, 400);
  rect(600, 0, W, 800);
  rect(0, 200, 200, W);
  rect(200, 600, W, 200);
  rect(400, 0, W, 200);
  rect(0, 0, 800, W);
}
