function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14;
  noStroke();
  background(245, 242, 235);
  // Step 2: Colour planes. A large red plane on the left and a large blue plane on the right
  // that nearly meet, separated by a vertical gap.
  fill(210, 30, 30);
  rect(0, 0, 320, 800);
  fill(30, 30, 210);
  rect(480, 100, 320, 700);
  fill(255, 220, 30);
  rect(600, 0, 200, 100);
  // Step 3: Switch to black for the bars
  fill(0, 0, 0);
  // Step 4: Black bars.
  // A vertical bar separating the red and blue planes slightly offset.
  rect(320, 0, W, 800);
  // A horizontal bar cutting across the top, intersecting the vertical bar.
  rect(0, 450, 800, W);
  // A short vertical bar segment on the right side, stopping at the horizontal bar.
  rect(600, 0, W, 450);
  // A short horizontal bar segment on the left, stopping at the main vertical bar.
  rect(0, 700, 320, W);
}
