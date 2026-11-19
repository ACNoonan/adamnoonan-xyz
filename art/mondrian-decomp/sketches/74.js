function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14;
  noStroke();
  background(245, 242, 235);
  fill(255, 220, 30);
  rect(50, 300, 350, 200);
  fill(30, 30, 210);
  rect(420, 100, 180, 450);
  fill(210, 30, 30);
  rect(150, 550, 220, 230);
  fill(0, 0, 0);
  rect(0, 500, 800, W);
  rect(300, 0, W, 500);
  rect(600, 550, W, 250);
  rect(420, 300, W, 250);
  rect(150, 100, W, 100);
}
