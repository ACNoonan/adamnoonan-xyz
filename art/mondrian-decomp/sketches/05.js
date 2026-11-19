function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14;
  noStroke();
  background(245, 242, 235);
  // Step 2: Colour planes arranged diagonally from top-left to bottom-right
  fill(210, 30, 30); // Red
  rect(40, 40, 280, 280);
  
  fill(255, 220, 30); // Yellow
  rect(350, 350, 300, 300);
  
  fill(30, 30, 210); // Blue
  rect(580, 580, 200, 200);
  
  // Step 3: Switch to black for bars
  fill(0, 0, 0);
  
  // Step 4: The bars, creating the grid structure around the diagonal planes
  // Vertical bars
  rect(320, 0, W, 800);
  rect(650, 0, W, 800);
  
  // Horizontal bars
  rect(0, 320, 800, W);
  rect(0, 580, 800, W);
  
  // Shorter intersecting bar to break up the grid and create asymmetry
  rect(0, 200, 200, W);
}
