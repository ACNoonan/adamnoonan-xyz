function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14;
  noStroke();
  background(245, 242, 235);
  fill(30, 30, 210);
  rect(50, 150, 350, 200);
  fill(255, 220, 30);
  rect(420, 350, 380, 300);
  fill(210, 30, 30);
  rect(100, 550, 250, 200);
  fill(0, 0, 0);
  rect(400, 0, W, 800);
  rect(0, 350, 400, W);
  rect(0, 150, 350, W);
  rect(50, 150, W, 200);
}
