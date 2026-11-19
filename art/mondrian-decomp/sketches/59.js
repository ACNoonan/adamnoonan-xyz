function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 12;
  noStroke();
  background(245, 242, 235);
  fill(255, 220, 30);
  rect(40, 40, 280, 280);
  fill(30, 30, 210);
  rect(580, 150, 200, 350);
  fill(210, 30, 30);
  rect(350, 500, 300, 260);
  fill(0, 0, 0);
  rect(320, 0, W, 800);
  rect(0, 320, 320, W);
  rect(550, 320, W, 250);
  rect(320, 560, 480, W);
}
