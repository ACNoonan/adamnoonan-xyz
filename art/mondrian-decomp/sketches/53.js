function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14; // the one bar thickness for this whole painting
  noStroke();
  background(245, 242, 235);   // step 1: the pale ground
  // step 2: the colour planes
  fill(210, 30, 30);
  rect(600, 0, 180, 480);     // narrow red plane on the right edge
  fill(255, 220, 30);
  rect(0, 480, 600, 320);     // broad yellow plane in the bottom left
  fill(0, 0, 0);               // step 3: switch to black, once
  // step 4: the bars
  rect(420, 0, W, 800);       // vertical bar separating left and right sections
  rect(0, 320, 800, W);       // horizontal bar separating top and bottom
  rect(600, 480, W, 320);     // short vertical bar stopping at the horizontal bar
  rect(420, 0, W, 320);       // short vertical bar above the horizontal bar
}
