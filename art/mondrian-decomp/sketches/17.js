function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 12;
  noStroke();
  background(245, 242, 235);
  fill(210, 30, 30);
  rect(0, 350, 280, 430);
  fill(255, 220, 30);
  rect(150, 0, 500, 350);
  fill(30, 30, 210);
  rect(580, 450, 220, 350);
  fill(0, 0, 0);
  rect(150, 0, W, 600);
  rect(450, 0, W, 200);
  rect(450, 650, W, 150);
  rect(0, 350, 150, W);
  rect(0, 600, 350, W);
  rect(600, 0, W, 350);
}
