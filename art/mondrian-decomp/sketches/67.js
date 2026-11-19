function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14;
  noStroke();
  background(245, 242, 235);
  fill(255, 220, 30);
  rect(40, 40, 280, 300);
  fill(210, 30, 30);
  rect(350, 380, 300, 380);
  fill(30, 30, 210);
  rect(680, 80, 120, 240);
  fill(0, 0, 0);
  rect(320, 0, W, 280);
  rect(0, 260, 320, W);
  rect(334, 350, W, 450);
  rect(0, 440, 800, W);
  rect(600, 0, W, 800);
  rect(520, 600, 300, W);
}
