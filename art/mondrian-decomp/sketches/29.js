function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14;
  noStroke();
  background(245, 242, 235);
  fill(255, 220, 30);
  rect(180, 100, 440, 600);
  fill(210, 30, 30);
  rect(0, 0, 180, 400);
  fill(30, 30, 210);
  rect(620, 450, 180, 350);
  fill(0, 0, 0);
  rect(180, 0, W, 800);
  rect(620, 0, W, 800);
  rect(0, 400, 620, W);
  rect(0, 600, 800, W);
}
