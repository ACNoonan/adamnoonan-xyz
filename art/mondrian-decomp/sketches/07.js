function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14;
  noStroke();
  background(245, 242, 235);
  fill(30, 30, 210);
  rect(0, 0, 260, 550);
  fill(255, 220, 30);
  rect(500, 600, 260, 180);
  fill(210, 30, 30);
  rect(300, 200, 180, 240);
  fill(0, 0, 0);
  rect(260, 0, W, 800);
  rect(480, 0, W, 800);
  rect(0, 440, 800, W);
  rect(0, 760, 800, W);
  rect(400, 0, W, 340);
}
