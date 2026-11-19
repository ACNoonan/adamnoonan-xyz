function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 12;
  noStroke();
  background(245, 242, 235);
  fill(30, 30, 210);
  rect(0, 0, 320, 800);
  fill(255, 220, 30);
  rect(450, 150, 350, 300);
  fill(210, 30, 30);
  rect(200, 500, 250, 300);
  fill(0, 0, 0);
  rect(320, 0, W, 800);
  rect(450, 0, W, 800);
  rect(0, 350, 450, W);
  rect(200, 750, 600, W);
  rect(600, 450, W, 350);
}
