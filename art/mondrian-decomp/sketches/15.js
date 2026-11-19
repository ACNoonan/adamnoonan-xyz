function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14;
  noStroke();
  background(245, 242, 235);
  fill(210, 30, 30);
  rect(0, 380, 320, 420);
  fill(255, 220, 30);
  rect(680, 340, 120, 120);
  fill(30, 30, 210);
  rect(120, 20, 280, 150);
  fill(0, 0, 0);
  rect(320, 0, W, 800);
  rect(440, 0, W, 650);
  rect(0, 380, 800, W);
  rect(600, 340, W, 460);
  rect(50, 0, W, 150);
}
