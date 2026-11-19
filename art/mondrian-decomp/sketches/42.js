function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14;
  noStroke();
  background(245, 242, 235);
  fill(210, 30, 30);
  rect(180, 180, 220, 220);
  fill(255, 220, 30);
  rect(460, 30, 180, 260);
  fill(30, 30, 210);
  rect(30, 480, 240, 300);
  fill(255, 220, 30);
  rect(680, 450, 110, 330);
  fill(30, 30, 210);
  rect(580, 620, 190, 160);
  fill(0, 0, 0);
  rect(400, 0, W, 800);
  rect(0, 400, 800, W);
  rect(0, 180, 400, W);
  rect(580, 0, W, 450);
  rect(580, 450, W, 350);
  rect(0, 720, 580, W);
}
