function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14; // the one bar thickness for this whole painting; choose it once, between 10 and 14
  noStroke();
  background(245, 242, 235);   // step 1: the pale ground, once, first
  // step 2: the colour planes, each one as a fill(...) line followed by a rect(...) line
  fill(210, 30, 30);               // step 3: switch to black, once, before any bar
  rect(40, 50, 320, 400);          // Red plane, left side
  fill(30, 30, 210);
  rect(360, 250, 300, 350);        // Blue plane, right side, overlapping red
  fill(255, 220, 30);
  rect(580, 100, 200, 120);        // Yellow plane, top right
  fill(0, 0, 0);
  rect(0, 320, 800, W);            // Horizontal bar cutting through red/blue
  rect(360, 0, W, 800);            // Vertical bar separating left/right
  rect(0, 680, 400, W);            // Short bottom-left bar
  rect(600, 0, W, 150);            // Short top-right stub
}
