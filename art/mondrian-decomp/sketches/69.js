function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14;
  noStroke();
  background(245, 242, 235);
  
  // Blue is the largest color plane: a massive block on the right side
  fill(30, 30, 210);
  rect(520, 0, 280, 600);
  
  // A medium yellow plane in the top left, balancing the blue mass
  fill(255, 220, 30);
  rect(0, 0, 260, 260);
  
  // A smaller red plane in the bottom left corner
  fill(210, 30, 30);
  rect(0, 500, 220, 220);
  
  // Black bars creating the asymmetric grid
  fill(0, 0, 0);
  // Vertical bars
  rect(260, 0, W, 800);
  rect(520, 0, W, 800);
  
  // Horizontal bars
  rect(0, 260, 260, W); // Stops at the first vertical bar
  rect(0, 500, 520, W); // Stops at the second vertical bar
  rect(520, 600, 280, W); // Stops at the right edge, creating a bottom-right cap for the blue
  rect(520, 800, 280, W); // The bottom edge of the canvas for the blue section (redundant but explicit logic) -> actually rect(0, 750, 800, W) is better for full width?
  // Let's refine the bottom horizontal bars for better "stopping" logic
  // Remove the last rect(520, 800...) and replace with a full bottom bar to anchor everything
  rect(0, 750, 800, W);
  
  // Wait, the logic above for "rect(520, 600, 280, W)" and "rect(0, 750, 800, W)" creates a grid.
  // Let's re-verify the "stopping" constraint. Bars stop where they meet another bar or edge.
  // The blue rect is 520, 0 to 800, 600.
  // We need a horizontal bar at y=600 for the blue section? No, the blue section is 600 tall.
  // Let's adjust the blue rect to be 520, 0 to 800, 600.
  // Then a horizontal bar at 600 from 520 to 800? That would be a short bar.
  // And a horizontal bar at 750 across the whole width.
  
  // Let's rewrite the bars section clearly based on the final plan:
  // 1. Vertical at 260 (full height)
  // 2. Vertical at 520 (full height)
  // 3. Horizontal at 260 (from 0 to 260) -> creates top-left yellow cap
  // 4. Horizontal at 500 (from 0 to 520) -> separates red from middle empty space
  // 5. Horizontal at 600 (from 520 to 800) -> separates top blue from bottom blue? No, blue is 0 to 600.
  // Actually, let's make the blue block go from y=0 to y=600.
  // Then a short bar at 600 from x=520 to x=800? No, that would cut the blue block.
  // The blue block is the plane. The bars define the cells.
  // If the blue plane is 520,0 to 800,600, then the bar at x=520 goes full height.
  // The bar at y=600 should probably go from 520 to 800 to separate the blue block from the space below it?
  // But the space below it (600-750) is empty.
  // Then a full bar at 750.
  
  // Corrected Bar Sequence:
  fill(0, 0, 0);
  rect(260, 0, W, 800);
  rect(520, 0, W, 800);
  rect(0, 260, 260, W);
  rect(0, 500, 520, W);
  rect(520, 600, 280, W); // Short bar at the bottom of the blue block
  rect(0, 750, 800, W);   // Bottom full bar
}
