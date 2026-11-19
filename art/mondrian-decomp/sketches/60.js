function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14; // the one bar thickness for this whole painting; choose it once, between 8 and 24
  noStroke();
  background(245, 242, 235);   // step 1: the pale ground, once, first

  // Layout Strategy:
  // A large vertical space on the right side for the large yellow plane.
  // A tall vertical space on the left for blue.
  // Horizontal bars dividing these spaces.
  
  // Bar Positions (x for vertical, y for horizontal):
  // Vertical bars at x = 280 and x = 600
  // Horizontal bars at y = 320, y = 560
  
  // Step 2: The colour planes
  // Large Yellow Plane: 
  // Bounded by x=600 (left), x=800 (right), y=320 (top), y=800 (bottom).
  // x = 600 + W = 614. y = 320 + W = 334. w = 800 - 614 = 186. h = 800 - 334 = 466.
  fill(255, 230, 0);
  rect(614, 334, 186, 466);

  // Medium Blue Plane (Top Left):
  // Bounded by x=0, x=280, y=0, y=320.
  // x = 0. y = 0. w = 280 - W = 266. h = 320 - W = 306.
  fill(30, 50, 200);
  rect(0, 0, 266, 306);

  // Small Blue Plane (Middle Left):
  // Bounded by x=0, x=280, y=320, y=560.
  // x = 0. y = 320 + W = 334. w = 266. h = 560 - 320 - W = 226.
  fill(20, 40, 180);
  rect(0, 334, 266, 226);

  // Tiny Red Plane (Bottom Middle):
  // Bounded by x=280, x=600, y=560, y=800.
  // x = 280 + W = 294. y = 560 + W = 574. w = 600 - 280 - W = 306. h = 800 - 560 - W = 226.
  fill(200, 20, 20);
  rect(294, 574, 306, 226);

  // Step 3: switch to black, once, before any bar
  fill(0, 0, 0);

  // Step 4: the bars
  // Vertical Bar 1: x = 280
  rect(280, 0, W, 800);
  
  // Vertical Bar 2: x = 600
  rect(600, 0, W, 800);

  // Horizontal Bar 1: y = 320
  rect(0, 320, 800, W);
  
  // Horizontal Bar 2: y = 560
  rect(0, 560, 800, W);
}
