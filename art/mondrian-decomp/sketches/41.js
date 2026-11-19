function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14;
  noStroke();
  background(245, 242, 235);
  // Step 2: Colour planes (Red, Yellow, Blue) and the required small Black plane
  fill(210, 30, 30);
  rect(0, 0, 310, 280);
  fill(255, 220, 30);
  rect(350, 0, 440, 550);
  fill(30, 30, 210);
  rect(50, 600, 260, 200);
  fill(0, 0, 0);
  rect(620, 720, 160, 80);
  // Step 3: Switch to black for bars
  fill(0, 0, 0);
  // Step 4: The bars (3 vertical, 2 horizontal, creating unequal cells)
  rect(310, 0, W, 800);
  rect(350, 0, W, 800);
  rect(500, 0, W, 800);
  rect(0, 280, 800, W);
  rect(0, 600, 800, W);
}
