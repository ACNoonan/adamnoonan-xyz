function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14;
  noStroke();
  background(245, 242, 235);
  fill(210, 30, 30);
  rect(0, 0, 320, 450);
  fill(255, 220, 30);
  rect(340, 0, 460, 300);
  fill(30, 30, 210);
  rect(340, 320, 160, 480);
  fill(210, 30, 30);
  rect(520, 620, 280, 180);
  fill(0, 0, 0);
  rect(330, 0, W, 800);
  rect(0, 310, 800, W);
  rect(0, 610, 800, W);
  rect(600, 0, W, 410);
}
