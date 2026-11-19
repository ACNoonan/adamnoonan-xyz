function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14;
  noStroke();
  background(245, 242, 235);
  // Step 2: Colour planes. Red is the largest.
  fill(210, 30, 30);
  rect(0, 0, 400, 350);
  rect(400, 0, 200, 450);
  
  fill(255, 220, 30);
  rect(400, 450, 400, 350);
  
  fill(30, 30, 210);
  rect(200, 400, 100, 400);
  
  // Step 3: Switch to black
  fill(0, 0, 0);
  // Step 4: The bars
  rect(400, 0, W, 800);
  rect(0, 350, 400, W);
  rect(500, 450, W, 350);
  rect(0, 600, 200, W);
  rect(300, 400, 200, W);
  rect(400, 800 - W, 400, W);
}
