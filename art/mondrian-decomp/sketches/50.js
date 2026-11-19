function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14;
  noStroke();
  background(245, 242, 235);
  fill(255, 220, 30);
  rect(0, 0, 420, 180);
  fill(30, 30, 210);
  rect(0, 520, 180, 260);
  fill(210, 30, 30);
  rect(600, 100, 200, 680);
  fill(0, 0, 0);
  rect(420, 0, W, 800);
  rect(600, 0, W, 800);
  rect(0, 180, 800, W);
  rect(0, 520, 800, W);
  rect(0, 780, 800, W);
}
