function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14;
  noStroke();
  background(245, 242, 235);
  // Step 2: Colour planes
  fill(210, 30, 30);
  rect(0, 0, 320, 320); // Red plane in top-left
  fill(255, 220, 30);
  rect(320, 0, 480, 140); // Yellow strip at top, starting where red bar is
  fill(30, 30, 210);
  rect(400, 400, 400, 400); // Large blue plane in bottom-right
  fill(255, 220, 30);
  rect(0, 600, 200, 200); // Yellow plane in bottom-left corner
  
  // Step 3: Switch to black
  fill(0, 0, 0);
  // Step 4: The bars
  // Vertical bar separating left red/yellow from right yellow/blue
  rect(320, 0, W, 600); 
  // Vertical bar cutting through the blue plane and stopping
  rect(600, 0, W, 600);
  // Horizontal bar separating top yellow from bottom blue
  rect(0, 400, 400, W);
  // Horizontal bar at bottom
  rect(0, 750, 800, W);
  // A short bar hanging down from the top in open space to create a corner meeting point
  rect(550, 0, W, 200);
}
