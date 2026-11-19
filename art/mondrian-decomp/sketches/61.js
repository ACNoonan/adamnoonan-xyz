function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14; // the one bar thickness for this whole painting; choose it once, between 8 and 24
  noStroke();
  background(245, 242, 235);   // step 1: the pale ground, once, first
  
  // Step 2: the colour planes
  // A wide yellow plane along the bottom edge (from y=600 to 800, but we stop at the vertical bars)
  // We define the bottom yellow cell as: x=400, y=600, width=400, height=200
  fill(255, 220, 0); 
  rect(400, 600, 400, 200);
  
  // A small blue plane in the upper left
  fill(0, 50, 200);
  rect(0, 0, 300, 250);
  
  // A small red plane in the middle right
  fill(200, 0, 0);
  rect(600, 300, 200, 300);
  
  fill(0, 0, 0);               // step 3: switch to black, once, before any bar
  
  // Step 4: the bars
  
  // Vertical bars
  rect(300, 0, W, 800);        // Left of the blue/red cells
  rect(400, 0, W, 800);        // Left of the yellow cell
  rect(600, 0, W, 800);        // Left of the red cell
  
  // Horizontal bars
  rect(0, 250, 800, W);        // Below the blue cell
  rect(0, 600, 800, W);        // Above the yellow cell
  
  // We also need a horizontal bar to close the top of the red cell if it doesn't go to the edge,
  // but here the red cell (600, 300, 200, 300) goes from y=300 to y=600.
  // The bar at y=600 is already drawn.
  // We need a bar at y=300 for the top of the red cell.
  rect(600, 300, 200, W);      // Top of the red cell (stops at the right edge of the red cell)
  
  // Wait, the rule says "A bar may stop short, but only where it meets another bar or the canvas edge."
  // The red cell is bounded by:
  // Left: x=600 (vertical bar)
  // Right: x=800 (canvas edge)
  // Top: y=300 (needs a bar segment)
  // Bottom: y=600 (horizontal bar)
  
  // So we need the segment rect(600, 300, 200, W).
  
  // Let's re-verify the layout:
  // Verticals at: 300, 400, 600.
  // Horizontals at: 250, 600.
  
  // Cell (0,0) to (300,250): Blue. Bounded by Left(0), Top(0), Right(300), Bottom(250). OK.
  // Cell (300,0) to (400,800): Pale. Bounded by Left(300), Right(400), Top(0), Bottom(800). OK.
  // Cell (400,0) to (600,250): Pale. Bounded by Left(400), Right(600), Top(0), Bottom(250). OK.
  // Cell (400,250) to (600,600): Pale. Bounded by Left(400), Right(600), Top(250), Bottom(600). OK.
  // Cell (600,0) to (800,300): Pale. Bounded by Left(600), Right(800), Top(0), Bottom(300). OK.
  // Cell (600,300) to (800,600): Red. Bounded by Left(600), Right(800), Top(300), Bottom(600). OK.
  // Cell (0,250) to (300,800): Pale. Bounded by Left(0), Right(300), Top(250), Bottom(800). OK.
  // Cell (300,250) to (400,800): Pale. Bounded by Left(300), Right(400), Top(250), Bottom(800). OK.
  // Cell (400,600) to (600,800): Pale. Bounded by Left(400), Right(600), Top(600), Bottom(800). OK.
  // Cell (600,600) to (800,800): Yellow. Bounded by Left(600), Right(800), Top(600), Bottom(800). OK.
  
  // Bars needed:
  // V: 300, 400, 600 (full height)
  // H: 250, 600 (full width)
  // H segment for red top: 600, 300, width 200.
  
  // Wait, the red cell is 600 to 800 width? Yes.
  // My previous code had rect(600, 300, 200, W). This is correct.
  
  // One more check: The red cell is (600, 300) to (800, 600).
  // The vertical bar at 600 handles the left side.
  // The horizontal bar at 600 handles the bottom.
  // The horizontal bar at 300 handles the top. Since the cell goes to the right edge (800),
  // the bar should go from 600 to 800.
  
  // Is there a need for a vertical bar at 800? No, that's the canvas edge.
  
  // Let's refine the "stop short" logic.
  // The horizontal bar at y=300 must stop at x=600 (where the vertical bar starts) or x=800?
  // The cell is to the right of x=600. So the bar must exist from x=600 to x=800.
  // So rect(600, 300, 200, W) is correct.
  
  // Wait, I missed a horizontal bar segment for the cell above the red one?
  // The cell above red is (600, 0) to (800, 300).
  // Its bottom is at y=300. The bar we just drew (600, 300, 200, W) serves as the bottom for that cell too.
  // So that is consistent.
  
  // What about the cell (400, 250) to (600, 600)?
  // Left: 400. Right: 600. Top: 250. Bottom: 600.
  // All bars are full width or full height except the one at 300.
  
  // Let's re-list the bars to be sure:
  // V: 300, 400, 600.
  // H: 250, 600.
  // H_segment: 600, 300, 200.
  
  // Is that enough?
  // Let's check the cell (600, 0) to (800, 300).
  // Top: 0 (edge). Bottom: 300 (segment). Left: 600 (V). Right: 800 (edge). OK.
  
  // Let's check the cell (600, 300) to (800, 600).
  // Top: 300 (segment). Bottom: 600 (H). Left: 600 (V). Right: 800 (edge). OK.
  
  // Let's check the cell (0, 0) to (300, 250).
  // Top: 0. Bottom: 250. Left: 0. Right: 300. OK.
  
  // Let's check the cell (0, 250) to (300, 800).
  // Top: 250. Bottom: 800. Left: 0. Right: 300. OK.
  
  // Let's check the cell (300, 0) to (400, 800).
  // Left: 300. Right: 400. Top: 0. Bottom: 800. OK.
  
  // Let's check the cell (400, 0) to (600, 250).
  // Left: 400. Right: 600. Top: 0. Bottom: 250. OK.
  
  // Let's check the cell (400, 250) to (600, 600).
  // Left: 400. Right: 600. Top: 250. Bottom: 600. OK.
  
  // Let's check the cell (400, 600) to (600, 800).
  // Left: 400. Right: 600. Top: 600. Bottom: 800. OK.
  
  // Let's check the cell (600, 600) to (800, 800).
  // Left: 600. Right: 800. Top: 600. Bottom: 800. OK.
  
  // Everything seems covered.
}
