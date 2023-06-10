
const radius = 100; // Radius of the sphere
const count = 5000; // Number of points to create
self.onmessage = function (event) {
    const message = event.data;
    
    if (message.type === 'start') {
      const windowDimensions = message.windowDimensions;
      
      // Generate 5000 random Vector3 objects within the window dimensions
      const vectors = generateRandomVectors(5000, windowDimensions);
      
      // Start the animation loop
      animate(vectors, windowDimensions);
    }
  };
  
  function generateRandomVectors() {
    
    function createRandomPointsOnSphere() {
      const points = [];
  
      for (let i = 0; i < count; i++) {
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
  
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);
  
        points.push(x,y,z);
      }

      return points;
    }
  

    const points = createRandomPointsOnSphere(radius, count);
  
    // Usage of the generated points
    console.log(points);
  }
  
  // Usage
  generateRandomVectors();
  
  
  function animate(vectors, windowDimensions) {
    function update() {
      for (let i = 0; i < points.length/3; i++) {
        const vector = vectors[i];
  
        // Update the position using linear interpolation (lerp)
        vector.lerp(
          new THREE.Vector3(
            Math.random() * windowDimensions.width, // Random x position
            Math.random() * windowDimensions.height, // Random y position
            0 // Z position (set to 0 in this example)
          ),
          0.1 // Adjust the lerp speed as desired
        );
  
        // Bounce off the window sides
        if (vector.x < 0 || vector.x > windowDimensions.width) {
          vector.x = Math.max(0, Math.min(vector.x, windowDimensions.width));
        }
        if (vector.y < 0 || vector.y > windowDimensions.height) {
          vector.y = Math.max(0, Math.min(vector.y, windowDimensions.height));
        }
      }
  
      // Send the updated vectors back to the main thread
      self.postMessage({ type: 'update', vectors: vectors });
  
      // Call the update function on the next animation frame
      requestAnimationFrame(update);
    }
  
    // Call the update function to start the animation loop
    requestAnimationFrame(update);
  }
  
  