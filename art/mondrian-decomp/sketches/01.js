function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14; // the one bar thickness for this whole painting; choose it once, between 8 and 24
  noStroke();
  background(245, 242, 235);   // step 1: the pale ground, once, first
  
  // step 2: the colour planes
  // Large red plane on the left-middle
  fill(210, 50, 50);
  rect(0, 150, 220, 350);
  
  // Medium blue plane on the bottom-left
  fill(50, 80, 210);
  rect(0, 500, 220, 300);
  
  // Small yellow plane top-left
  fill(250, 210, 50);
  rect(0, 0, 150, 150);
  
  // Tiny red plane top-right
  fill(210, 50, 50);
  rect(550, 50, 100, 80);
  
  // Medium yellow plane bottom-right
  fill(250, 210, 50);
  rect(550, 500, 250, 300);
  
  fill(0, 0, 0);               // step 3: switch to black, once, before any bar
  
  // step 4: the bars
  // Vertical bars: x=150, x=220, x=550
  rect(150, 0, W, 800);
  rect(220, 0, W, 800);
  rect(550, 0, W, 800);
  
  // Horizontal bars: y=150, y=350, y=500, y=800 (last one is the bottom edge, effectively handled by canvas or just the top of the last cell)
  // Actually, let's define the bars explicitly where they cross.
  // y=150 separates top yellow from red/blue blocks
  rect(0, 150, 800, W);
  // y=350 separates top red from left blue and top-right empty
  rect(0, 350, 800, W);
  // y=500 separates left red/blue from bottom yellow/blue
  rect(0, 500, 800, W);
  
  // Note: The bottom edge of the canvas is implicitly closed by the rect logic if we draw up to 800, 
  // but to be safe and consistent with "bars", we don't need a bar at y=800 as it's the edge.
  // However, the bar at y=500 goes all the way across.
  // We also need a vertical bar at x=220 to separate the left block from the empty space in the middle.
  // And we need the bar at x=150 to separate the top yellow from the red below.
  // Let's refine the vertical bar set to ensure all cells are bounded:
  // Bars at x=150, x=220, x=550.
  // Bars at y=150, y=350, y=500.
  // This creates the grid.
}
