function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14;
  noStroke();
  background(245, 242, 235);
  fill(210, 30, 30);
  rect(0, 560, 300, 240);
  fill(255, 220, 30);
  rect(620, 0, 180, 560);
  fill(30, 30, 210);
  rect(340, 0, 280, 560);
  fill(0, 0, 0);
  rect(0, 560, 800, W);
  rect(300, 0, W, 560);
  rect(620, 560, W, 240);
  rect(240, 720, W, 80);
  rect(520, 720, W, 80);
}
