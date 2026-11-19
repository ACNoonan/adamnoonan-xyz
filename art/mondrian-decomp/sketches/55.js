function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 14;
  noStroke();
  background(245, 242, 235);
  // Step 2: Colour planes. Red is the largest area.
  fill(210, 30, 30);
  rect(0, 0, 320, 550);
  fill(255, 220, 30);
  rect(500, 0, 300, 250);
  fill(30, 30, 210);
  rect(0, 650, 200, 150);
  fill(30, 30, 210);
  rect(320, 550, 480, 250);
  fill(0, 0, 0);
  // Step 4: The black bars
  rect(320, 0, W, 800);
  rect(500, 0, W, 800);
  rect(0, 250, 800, W);
  rect(0, 550, 800, W);
  rect(0, 650, 800, W);
}
