function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14;
  noStroke();
  background(245, 242, 235);
  fill(210, 30, 30);
  rect(0, 180, 350, 420);
  fill(255, 220, 30);
  rect(400, 0, 400, 300);
  fill(30, 30, 210);
  rect(150, 600, 450, 200);
  fill(0, 0, 0);
  rect(280, 0, W, 800);
  rect(0, 180, 280, W);
  rect(280, 400, 520, W);
  rect(600, 450, W, 350);
}
