function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14;
  noStroke();
  background(245, 242, 235);
  fill(30, 30, 210);
  rect(0, 100, 280, 700);
  fill(255, 220, 30);
  rect(350, 0, 200, 320);
  fill(210, 30, 30);
  rect(350, 420, 180, 380);
  fill(0, 0, 0);
  rect(280, 0, W, 800);
  rect(350, 0, W, 800);
  rect(0, 320, 800, W);
  rect(0, 420, 800, W);
}
