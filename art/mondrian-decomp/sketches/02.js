function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14;
  noStroke();
  background(245, 242, 235);
  // Blue is the dominant color, taking up the large bottom-left area
  fill(30, 30, 210);
  rect(0, 320, 450, 480);
  // A smaller yellow plane in the top right quadrant
  fill(255, 220, 30);
  rect(480, 0, 240, 300);
  // A red plane in the bottom right corner
  fill(210, 30, 30);
  rect(520, 560, 280, 240);
  // Black bars defining the grid structure
  fill(0, 0, 0);
  rect(450, 0, W, 800);
  rect(0, 320, 800, W);
  rect(700, 0, W, 800);
  rect(0, 600, 700, W);
}
