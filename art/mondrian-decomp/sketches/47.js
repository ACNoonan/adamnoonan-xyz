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
  rect(100, 100, 300, 200);
  fill(210, 30, 30);
  rect(450, 500, 280, 200);
  fill(30, 30, 210);
  rect(600, 0, 200, 600);
  fill(0, 0, 0);               // step 3: switch to black, once, before any bar
  // step 4: the bars, each one a rect whose thickness is W
  rect(350, 0, W, 500);
  rect(600, 500, W, 300);
  rect(0, 350, 350, W);
  rect(0, 700, 800, W);
}
