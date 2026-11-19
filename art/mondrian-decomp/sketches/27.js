function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  const W = 12; // The bar thickness
  noStroke();
  background(245, 242, 235);   // step 1: the pale ground
  
  // step 2: the colour planes
  // A tall, narrow red plane on the left
  fill(210, 30, 30);
  rect(0, 0, 140, 700);
  
  // A wide, low yellow plane at the bottom right
  fill(255, 220, 30);
  rect(400, 600, 400, 200);
  
  // A small blue plane floating in the upper right area
  fill(30, 30, 210);
  rect(580, 250, 150, 120);
  
  // step 3: switch to black, once, before any bar
  fill(0, 0, 0);
  
  // step 4: the bars
  // Vertical bar separating the left red plane from the rest
  rect(140, 0, W, 800);
  
  // Horizontal bar cutting across the lower section to define the yellow plane
  rect(0, 600, 600, W);
  
  // Short vertical bar segment stopping at the yellow plane
  rect(550, 300, W, 300);
  
  // A floating horizontal bar segment in the middle left, not touching other bars
  rect(180, 350, 150, W);
  
  // A small stub bar near the bottom right corner
  rect(700, 720, W, 80);
}
