function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14; // the one bar thickness for this whole painting; choose it once, between 10 and 14
  noStroke();
  background(245, 242, 235);   // step 1: the pale ground, once, first
  // step 2: the colour planes, each one as a fill(...) line followed by a rect(...) line
  fill(255, 220, 30);          // Yellow plane, wider than half the canvas
  rect(0, 280, 450, 400);      // Wide yellow plane spanning from left edge
  fill(30, 30, 210);           // Blue plane
  rect(520, 0, 280, 200);      // Blue plane in top right
  fill(210, 30, 30);           // Red plane
  rect(540, 450, 260, 330);    // Red plane in bottom right
  fill(0, 0, 0);               // step 3: switch to black, once, before any bar
  // step 4: the bars, each one a rect whose thickness is W
  rect(450, 0, W, 800);        // Vertical bar separating left yellow from right planes
  rect(0, 280, 450, W);        // Horizontal bar under the top of the yellow plane
  rect(300, 280, W, 100);      // Short vertical stub inside the yellow area
  rect(780, 200, W, 600);      // Vertical bar on the far right edge
  rect(0, 680, 540, W);        // Horizontal bar near the bottom left
}
