function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14;
  noStroke();
  background(245, 242, 235);
  fill(210, 30, 30);
  rect(420, 420, 380, 380);
  fill(255, 220, 30);
  rect(50, 50, 300, 350);
  fill(30, 30, 210);
  rect(50, 450, 250, 350);
  fill(0, 0, 0);
  rect(350, 0, W, 500);
  rect(0, 500, 350, W);
  rect(420, 200, W, 600);
  rect(350, 500, 450, W);
}
