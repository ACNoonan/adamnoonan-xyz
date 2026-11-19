function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14; // the one bar thickness for this whole painting; choose it once, between 10 and 14
  noStroke();
  background(245, 242, 235);   // step 1: the pale ground, once, first
  // step 2: the colour planes, each one as a fill(...) line followed by a rect(...) line
  fill(210, 30, 30);           // red plane
  rect(40, 40, 280, 320);
  fill(255, 220, 30);          // yellow plane
  rect(350, 500, 380, 280);
  fill(30, 30, 210);           // blue plane running off the right edge
  rect(200, 200, 600, 400);
  // step 3: switch to black, once, before any bar
  fill(0, 0, 0);               // step 3: switch to black, once, before any bar
  // step 4: the bars, each one a rect whose thickness is W
  rect(180, 0, W, 800);
  rect(0, 100, 180, W);
  rect(620, 350, W, 450);
  rect(0, 700, 800, W);
  rect(720, 0, W, 800);
}
