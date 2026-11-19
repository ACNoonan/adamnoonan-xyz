function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 12; // Bar thickness
  noStroke();
  background(245, 242, 235);
  
  // Step 2: Colour planes (Red is the largest, taking the top-left quadrant)
  // Large red plane: Top left
  fill(210, 30, 30);
  rect(0, 0, 380, 380);
  
  // Smaller red plane: Middle right (secondary red area)
  fill(210, 30, 30);
  rect(450, 250, 150, 200);
  
  // Blue plane: Bottom left
  fill(30, 30, 210);
  rect(0, 420, 200, 300);
  
  // Yellow plane: Top right corner
  fill(255, 220, 30);
  rect(550, 100, 200, 180);
  
  // Step 3: Switch to black for bars
  fill(0, 0, 0);
  
  // Step 4: The bars
  // Vertical bars
  rect(380, 0, W, 800);  // Separates left large red from the rest
  rect(650, 0, W, 680);  // Stops at the blue bar below
  
  // Horizontal bars
  rect(0, 380, 380, W);  // Bottom of the large red plane, stops at the vertical bar
  rect(0, 550, 550, W);  // Middle horizontal, stops at right vertical
  rect(0, 720, 800, W);  // Bottom horizontal, full width
}
