function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14;
  noStroke();
  background(245, 242, 235);
  // Step 2: Colour planes
  // A large red plane in the top left.
  fill(210, 30, 30);
  rect(0, 0, 280, 320);
  // A yellow plane in the middle right, positioned so its left edge aligns with a vertical bar.
  fill(255, 220, 30);
  rect(420, 200, 380, 260);
  // A blue plane in the bottom left corner.
  fill(30, 30, 210);
  rect(0, 620, 350, 180);
  
  // Step 3: Switch to black
  fill(0, 0, 0);
  
  // Step 4: Black bars
  // Vertical bar at x=280 to separate the red plane from the rest of the top section.
  // This bar starts at the top and goes down to the horizontal bar at y=450.
  rect(280, 0, W, 450);
  
  // Vertical bar at x=420. This aligns with the left edge of the yellow plane (rect starts at 420).
  // It runs from y=200 (top of yellow plane) down to the bottom of the canvas.
  rect(420, 200, W, 600);
  
  // Horizontal bar at y=450. It runs from the left edge to the x=420 vertical bar.
  rect(0, 450, 420, W);
  
  // Horizontal bar at y=620. It runs from x=0 to the right edge.
  // This bar aligns with the top edge of the blue plane.
  rect(0, 620, 800, W);
}
