function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14;
  noStroke();
  background(245, 242, 235);
  fill(210, 30, 30);
  rect(0, 120, 280, 300);
  fill(255, 220, 30);
  rect(480, 30, 320, 400);
  fill(30, 30, 210);
  rect(280, 420, 200, 380);
  fill(0, 0, 0);
  rect(0, 420, 800, W);
  rect(420, 0, W, 650);
  rect(600, 420, W, 380);
  rect(0, 50, 280, W);
}
