function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 12; // Bar thickness
  noStroke();
  background(245, 242, 235);   // Step 1: pale ground
  
  // Step 2: colour planes
  // A large red plane in the top left corner
  fill(210, 30, 30);
  rect(0, 0, 220, 280);
  
  // A yellow plane floating in the middle right, separated from edges
  fill(255, 220, 30);
  rect(400, 150, 300, 200);
  
  // A blue plane in the bottom right quadrant
  fill(30, 30, 210);
  rect(550, 450, 250, 350);
  
  // Step 3: switch to black for bars
  fill(0, 0, 0);
  
  // Step 4: the bars
  // Vertical bar 1: far left edge, full height
  rect(220, 0, W, 800);
  
  // Vertical bar 2: middle right, full height
  rect(700, 0, W, 800);
  
  // Vertical bar 3: a short segment in the top left, stopping short
  rect(280, 0, W, 150);
  
  // Horizontal bar: the requested long bar that stops short
  // It runs from x=300 to x=650, positioned at y=500
  rect(300, 500, 350, W);
  
  // Horizontal bar: full width across the bottom to ground the composition
  rect(0, 700, 800, W);
  
  // Horizontal bar: short segment on the left, meeting the top-left red block
  rect(0, 280, 200, W);
}
