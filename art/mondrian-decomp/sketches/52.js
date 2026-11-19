function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14;
  noStroke();
  background(245, 242, 235);
  fill(255, 220, 30);
  rect(0, 450, 320, 350);
  fill(30, 30, 210);
  rect(360, 300, 440, 500);
  fill(210, 30, 30);
  rect(0, 0, 200, 200);
  fill(0, 0, 0);
  rect(320, 0, W, 300);
  rect(320, 650, W, 150);
  rect(0, 200, 800, W);
  rect(0, 650, 800, W);
  rect(800, 0, W, 800);
}
