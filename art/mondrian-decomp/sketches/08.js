function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 12; // bar thickness
  noStroke();
  background(245, 242, 235);   // step 1: pale ground
  // step 2: colour planes (two overlapping red and blue)
  fill(210, 30, 30);          // red
  rect(0, 0, 340, 420);       // large red plane top-left
  fill(30, 30, 210);          // blue
  rect(280, 380, 360, 400);   // blue plane bottom-right, overlapping the red
  fill(255, 220, 30);         // yellow
  rect(600, 50, 180, 200);    // isolated yellow plane top-right
  fill(0, 0, 0);              // step 3: switch to black for bars
  // step 4: the bars (4 vertical, 3 horizontal, total 7 bars)
  rect(340, 0, W, 800);       // vertical bar separating red from right side
  rect(640, 0, W, 800);       // vertical bar separating yellow and blue
  rect(160, 0, W, 600);       // partial vertical bar on left
  rect(500, 0, W, 400);       // partial vertical bar in middle
  rect(0, 420, 800, W);       // horizontal bar separating red and blue
  rect(0, 250, 340, W);       // partial horizontal bar on left
  rect(0, 600, 440, W);       // partial horizontal bar bottom-left
}
