function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14;
  noStroke();
  background(245, 242, 235);
  
  // Step 2: Colour planes
  fill(30, 30, 210);
  rect(0, 0, 320, 380);
  
  fill(210, 30, 30);
  rect(600, 620, 180, 160);
  
  fill(255, 220, 30);
  rect(520, 400, 260, 200);
  
  // Step 3: Switch to black
  fill(0, 0, 0);
  
  // Step 4: The bars
  rect(320, 0, W, 800);
  rect(600, 0, W, 800);
  rect(0, 380, 800, W);
  rect(0, 600, 520, W);
}
