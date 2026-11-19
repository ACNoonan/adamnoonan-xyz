function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14; // the one bar thickness for this whole painting; choose it once, between 10 and 14
  noStroke();
  background(245, 242, 235);   // step 1: the pale ground, once, first
  // step 2: the colour planes, each one as a fill(...) line followed by a rect(...) line
  fill(255, 220, 30);
  rect(0, 0, 320, 280);
  fill(30, 30, 210);
  rect(380, 0, 320, 280);
  fill(210, 30, 30);
  rect(0, 420, 320, 380);
  fill(0, 0, 0);               // step 3: switch to black, once, before any bar
  // step 4: the bars, each one a rect whose thickness is W
  rect(320, 0, W, 420);
  rect(700, 0, W, 800);
  rect(0, 280, 320, W);
  rect(320, 280, W, 140);
  rect(0, 600, 800, W);
}
