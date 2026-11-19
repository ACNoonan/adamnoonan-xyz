function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14;
  noStroke();
  background(245, 242, 235);
  // Step 2: Colour planes. Red is the largest plane.
  fill(210, 30, 30);
  rect(0, 280, 300, 320); // Large red plane on the left
  fill(255, 220, 30);
  rect(480, 0, 320, 200); // Yellow plane top right
  fill(30, 30, 210);
  rect(250, 600, 200, 200); // Blue plane bottom middle
  fill(30, 30, 210);
  rect(600, 550, 150, 250); // Blue plane bottom right
  
  // Step 3: Switch to black for bars
  fill(0, 0, 0);
  // Step 4: Black bars
  // Vertical bars
  rect(300, 0, W, 280); // Separates red from upper right
  rect(300, 600, W, 200); // Separates red from blue bottom middle
  rect(570, 200, W, 600); // Separates yellow from bottom section
  // Horizontal bars
  rect(300, 280, 180, W); // Bottom of red plane area, left side
  rect(480, 200, 320, W); // Bottom of yellow plane
  rect(0, 600, 250, W); // Top of bottom section left
  rect(550, 800 - W, 250, W); // Bottom edge right
}
