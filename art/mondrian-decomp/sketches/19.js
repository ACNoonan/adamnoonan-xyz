function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14;
  noStroke();
  background(245, 242, 235);
  
  // Step 2: Colour planes
  fill(255, 220, 30);
  rect(0, 0, 300, 200);
  
  fill(210, 30, 30);
  rect(480, 0, 320, 300);
  
  fill(30, 30, 210);
  rect(0, 500, 600, 300);
  
  fill(255, 220, 30);
  rect(640, 500, 160, 300);

  // Step 3: Switch to black
  fill(0, 0, 0);

  // Step 4: The bars
  // Vertical bars
  rect(300, 0, W, 800);
  rect(480, 0, W, 800);
  
  // Long horizontal bar stopping short of edges
  // Starts at 200, ends at 700
  rect(200, 400, 500, W);
  
  // Short horizontal bar segments to close the composition
  rect(0, 200, 300, W); // Left side segment
  rect(520, 200, 280, W); // Right side segment
}
