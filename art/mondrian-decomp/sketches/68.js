function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14;
  noStroke();
  background(245, 242, 235);
  // Step 2: Colour planes
  // Large blue plane on the left, slightly offset
  fill(30, 30, 210);
  rect(100, 100, 200, 600);
  // Small red plane in the bottom right quadrant
  fill(210, 30, 30);
  rect(550, 550, 200, 200);
  // Medium yellow plane near the top right, distinct from the red
  fill(255, 220, 30);
  rect(450, 200, 250, 300);
  // Step 3: Switch to black
  fill(0, 0, 0);
  // Step 4: The bars
  // A long horizontal bar stopping short of both edges, placed centrally but not perfectly centered vertically
  rect(150, 450, 500, W);
  // Vertical bar on the far left edge
  rect(0, 0, W, 350);
  // Vertical bar on the far right edge
  rect(786, 0, W, 800);
  // Short vertical bar connecting the long horizontal bar to the top area
  rect(650, 450, W, 150);
  // Short vertical bar on the left side, creating a small cell
  rect(300, 200, W, 100);
  // Short horizontal bar at the bottom left corner
  rect(0, 700, 300, W);
}
