function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 12; // bar thickness
  noStroke();
  background(245, 242, 235);   // step 1: the pale ground, once, first
  
  // step 2: the colour planes
  fill(210, 30, 30);           // red
  rect(0, 0, 280, 320);        // large red plane top-left
  
  fill(255, 220, 30);          // yellow
  rect(300, 200, 480, 200);    // yellow strip across middle-right
  
  fill(30, 30, 210);           // blue
  rect(50, 400, 350, 350);     // blue block bottom-left
  
  fill(0, 0, 0);               // black plane (at most one allowed)
  rect(650, 550, 140, 180);    // small black plane bottom-right
  
  fill(0, 0, 0);               // step 3: switch to black, once, before any bar
  
  // step 4: the black bars
  rect(280, 0, W, 400);        // vertical bar separating red from yellow
  rect(280, 550, W, 250);      // vertical bar continuing down (gap between 400 and 550)
  
  rect(350, 0, W, 250);        // vertical bar near yellow block top
  rect(350, 450, W, 350);      // vertical bar near yellow block bottom (gap 250-450)
  
  rect(0, 320, 300, W);        // horizontal bar under red plane
  rect(500, 400, W, 400);      // vertical bar cutting into blue plane
  
  rect(400, 600, 250, W);      // short horizontal bar stub in blue area
  
  rect(650, 400, W, 150);      // vertical bar separating black plane from blue
}
