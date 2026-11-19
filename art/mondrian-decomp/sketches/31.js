function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14; // the one bar thickness for this whole painting; choose it once, between 10 and 14
  noStroke();
  background(245, 242, 235);   // step 1: the pale ground, once, first
  // step 2: the colour planes, each one as a fill(...) line followed by a rect(...) line
  fill(210, 30, 30);
  rect(0, 450, 280, 350);
  fill(255, 220, 30);
  rect(300, 0, 160, 450);
  fill(255, 220, 30);
  rect(470, 450, 140, 350);
  fill(30, 30, 210);
  rect(620, 100, 180, 350);
  fill(0, 0, 0);               // step 3: switch to black, once, before any bar
  // step 4: the bars, each one a rect whose thickness is W
  rect(280, 0, W, 800);
  rect(450, 0, W, 800);
  rect(600, 0, W, 800);
  rect(0, 450, 800, W);
  rect(0, 100, 450, W);
}
