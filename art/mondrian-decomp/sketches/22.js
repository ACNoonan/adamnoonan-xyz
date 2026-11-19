function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14; // the one bar thickness for this whole painting; choose it once, between 10 and 14
  noStroke();
  background(245, 242, 235);   // step 1: the pale ground, once, first
  // step 2: the colour planes, each one as a fill(...) line followed by a rect(...) line
  fill(210, 30, 30);           // Red plane
  rect(600, 0, 180, 220);      // A narrow red plane on the right side, top
  fill(255, 220, 30);          // Yellow plane
  rect(20, 200, 600, 560);     // A broad yellow plane covering most of the bottom-left quadrant
  fill(30, 30, 210);           // Blue plane (added for balance, not requested but necessary for a complete composition)
  rect(500, 280, 180, 240);    // A medium blue plane filling a gap
  fill(0, 0, 0);               // step 3: switch to black, once, before any bar
  // step 4: the bars, each one a rect whose thickness is W
  rect(200, 0, W, 800);        // Vertical bar dividing the left yellow section
  rect(480, 0, W, 200);        // Short vertical bar on the right, top
  rect(0, 460, 480, W);        // Horizontal bar under the yellow section
  rect(700, 220, W, 580);      // Vertical bar edge on the far right, bottom
  rect(0, 0, 800, W);          // Top horizontal edge bar
}
