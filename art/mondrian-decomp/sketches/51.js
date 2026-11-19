function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14; // the one bar thickness for this whole painting; choose it once, between 8 and 24
  noStroke();
  background(245, 242, 235);   // step 1: the pale ground, once, first
  
  // Bar positions (calculated manually to ensure unequal spacing)
  const vBar1 = 160;
  const vBar2 = 520;
  const hBar1 = 200;
  const hBar2 = 580;

  // Step 2: the colour planes, each one as a fill(...) line followed by a rect(...) line
  
  // Largest plane: Yellow, bottom right quadrant area
  fill(255, 215, 0);
  rect(vBar2 + W, hBar2 + W, 800 - vBar2 - 2 * W, 800 - hBar2 - 2 * W);

  // Medium Yellow plane: top left
  fill(255, 215, 0);
  rect(0, 0, vBar1 - W, hBar1 - W);

  // Blue plane: middle left
  fill(50, 50, 230);
  rect(0, hBar1, vBar1, hBar2 - hBar1);

  // Red plane: top right small strip
  fill(220, 40, 40);
  rect(vBar1 + W, hBar1 + W, vBar2 - vBar1 - 2 * W, 200);

  // Blue plane: small bottom left corner
  fill(50, 50, 230);
  rect(0, hBar2 + W, vBar1, 800 - hBar2 - W);

  // Step 3: switch to black, once, before any bar
  fill(0, 0, 0);

  // Step 4: the bars, each one a rect whose thickness is W
  
  // Vertical Bar 1
  rect(vBar1, 0, W, 800);
  
  // Vertical Bar 2
  rect(vBar2, 0, W, 800);
  
  // Horizontal Bar 1
  rect(0, hBar1, 800, W);
  
  // Horizontal Bar 2
  rect(0, hBar2, 800, W);
}
