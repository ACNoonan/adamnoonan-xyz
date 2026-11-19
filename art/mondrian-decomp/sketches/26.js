function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14;
  noStroke();
  background(245, 242, 235);
  fill(210, 30, 30);
  rect(0, 100, 400, 400);
  fill(255, 220, 30);
  rect(450, 100, 350, 200);
  fill(30, 30, 210);
  rect(450, 350, 200, 450);
  fill(0, 0, 0);
  rect(400, 0, W, 800);
  rect(0, 100, 800, W);
  rect(0, 300, 550, W);
}
