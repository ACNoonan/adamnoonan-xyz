function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14;
  noStroke();
  background(245, 242, 235);
  // Step 2: Colour planes
  // Large yellow plane on the left
  fill(255, 220, 30);
  rect(0, 100, 200, 600);
  // Medium red plane on the bottom right
  fill(210, 30, 30);
  rect(300, 550, 500, 250);
  // Smallest plane: Blue, tucked in the top right
  fill(30, 30, 210);
  rect(600, 50, 120, 150);
  
  // Step 3: Switch to black
  fill(0, 0, 0);
  // Step 4: The bars
  // Vertical bars dividing the composition
  rect(200, 0, W, 800);
  rect(300, 0, W, 350);
  rect(600, 0, W, 800);
  // Horizontal bars
  rect(0, 350, 600, W);
  rect(400, 650, 400, W);
  // Short isolated bar segment to break symmetry and add interest
  rect(100, 450, W, 200);
}
