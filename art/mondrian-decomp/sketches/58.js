function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14;
  noStroke();
  background(245, 242, 235);
  fill(210, 30, 30);
  rect(0, 0, 280, 240);
  fill(255, 220, 30);
  rect(0, 400, 320, 400);
  fill(30, 30, 210);
  rect(600, 150, 180, 550);
  fill(0, 0, 0);
  rect(300, 0, W, 800);
  rect(0, 240, 800, W);
  rect(0, 400, 300, W);
  rect(0, 700, 800, W);
}
