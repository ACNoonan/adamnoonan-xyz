function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 16; // the one bar thickness for this whole painting; choose it once, between 8 and 24
  noStroke();
  background(245, 242, 235);   // step 1: the pale ground, once, first

  // Define bar positions as variables to ensure alignment
  // Vertical bars at x = 120, 480
  // Horizontal bars at y = 200, 550
  // This creates cells that touch the edges.

  // Step 2: the colour planes (red, yellow, blue)
  // Top-left cell: touches left and top edges.
  // x from 0 to 120, y from 0 to 200
  fill(220, 50, 50);
  rect(0, 0, 120, 200);

  // Bottom-left cell: touches left and bottom edges.
  // x from 0 to 120, y from 550 to 800
  fill(0, 0, 200);
  rect(0, 550, 120, 250);

  // Middle-right large cell: touches right edge.
  // x from 480 to 800, y from 200 to 550
  fill(250, 210, 50);
  rect(480, 200, 320, 350);

  // Step 3: switch to black, once, before any bar
  fill(0, 0, 0);

  // Step 4: the bars
  // Vertical bar at x = 120
  // Goes from y=200 to y=550 (between horizontal bars), but also touches top and bottom
  // To create the grid, we draw vertical segments:
  // Segment 1: Top to first horizontal bar
  rect(120, 0, W, 200);
  // Segment 2: Between horizontal bars
  rect(120, 200, W, 350);
  // Segment 3: From second horizontal bar to bottom
  rect(120, 550, W, 250);

  // Vertical bar at x = 480
  rect(480, 0, W, 200);
  rect(480, 200, W, 350);
  rect(480, 550, W, 250);

  // Horizontal bar at y = 200
  // Goes from x=120 to x=480 (between vertical bars), plus edges
  // Segment 1: Left edge to first vertical bar
  rect(0, 200, 120, W);
  // Segment 2: Between vertical bars
  rect(120, 200, 360, W);
  // Segment 3: Second vertical bar to right edge
  rect(480, 200, 320, W);

  // Horizontal bar at y = 550
  rect(0, 550, 120, W);
  rect(120, 550, 360, W);
  rect(480, 550, 320, W);
}
