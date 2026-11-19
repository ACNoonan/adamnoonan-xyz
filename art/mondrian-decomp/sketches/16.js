function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 16; // the one bar thickness for this whole painting; choose it once, between 8 and 24
  noStroke();
  background(245, 242, 235);   // step 1: the pale ground, once, first
  
  // Coordinates defined for an asymmetrical composition with a dense cluster in the bottom-left
  // Vertical bars: 120, 240, 600
  // Horizontal bars: 180, 320, 560
  
  // Step 2: the colour planes
  // Bottom-left small cell (between x:120-240, y:560-800) - Red
  fill(210, 30, 30);
  rect(120, 560, 120, 240);
  
  // Bottom-left medium cell (between x:0-120, y:320-560) - Yellow
  fill(255, 215, 0);
  rect(0, 320, 120, 240);
  
  // Top-right large plane (between x:240-800, y:0-180) - Blue
  fill(30, 50, 210);
  rect(240, 0, 560, 180);
  
  // Small cell near bottom right (between x:600-800, y:320-560) - Yellow
  fill(255, 220, 0);
  rect(600, 320, 200, 240);

  // Step 3: switch to black, once, before any bar
  fill(0, 0, 0);              
  
  // Step 4: the bars
  // Vertical bars
  rect(120, 0, W, 800);
  rect(240, 0, W, 800);
  rect(600, 0, W, 800);
  
  // Horizontal bars
  rect(0, 180, 800, W);
  rect(0, 320, 800, W);
  rect(0, 560, 800, W);
}
