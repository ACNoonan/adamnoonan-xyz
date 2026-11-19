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
  // A large red plane on the left, slightly offset from the edges
  rect(10, 60, 300, 650);
  
  fill(255, 220, 30);
  // A yellow plane in the upper right quadrant, creating asymmetry
  rect(500, 50, 250, 200);
  
  fill(30, 30, 210);
  // A blue plane in the lower right, smaller and tucked away
  rect(520, 600, 200, 150);
  
  // Step 3: Switch to black for the bars
  fill(0, 0, 0);
  
  // Step 4: The bars
  // Vertical bar cutting through the red plane and dividing the canvas unevenly
  rect(350, 0, W, 800);
  
  // Horizontal bar crossing the red plane near the bottom
  rect(0, 450, 800, W);
  
  // Another vertical bar on the far right to close the yellow cell
  rect(660, 0, W, 800);
  
  // A short horizontal bar segment stopping at the right vertical bar,
  // framing the blue plane above and below
  rect(350, 550, 310, W);
}
