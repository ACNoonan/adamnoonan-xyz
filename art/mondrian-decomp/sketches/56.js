function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14;
  noStroke();
  background(245, 242, 235);
  // Step 2: Colour planes
  // A large red plane on the left, a large yellow plane on the top right
  // and a medium blue plane on the bottom right.
  fill(210, 30, 30);
  rect(0, 0, 200, 700); // Left large red plane
  
  fill(255, 220, 30);
  rect(300, 0, 500, 300); // Top right yellow plane
  
  fill(30, 30, 210);
  rect(550, 320, 250, 480); // Bottom right blue plane

  // Step 3: Switch to black for bars
  fill(0, 0, 0);
  
  // Step 4: The bars
  // A main vertical bar splitting the left red plane from the rest
  rect(200, 0, W, 800);
  
  // A horizontal bar crossing the top right, creating the "split" feel
  // It starts from the main vertical bar and goes to the right edge
  rect(200, 300, 600, W);
  
  // A short stub bar hanging down from the horizontal bar into the blue section
  // This adds asymmetry and breaks the grid slightly
  rect(650, 300, W, 100);
  
  // A bottom horizontal bar anchoring the bottom right
  rect(200, 700, 600, W);
}
