varying vec3 vPreviousPosition;

void main() {
// Calculate the distance between the current fragment and the center of the point
float distance = length(gl_PointCoord - vec2(0.5));

// Discard fragments outside the circular shape
if (distance > 0.5) discard;

// Calculate the opacity based on the distance
float opacity = 1.0 - distance;

// Calculate the squish factor based on the velocity
vec2 velocity = normalize(vec2(vPreviousPosition.x - gl_PointCoord.x, vPreviousPosition.y - gl_PointCoord.y));
float squish = length(velocity);

// Add a trail effect based on the velocity
float trailOpacity = clamp(1.0 - squish, 0.0, 1.0);
opacity *= trailOpacity;

// Modify the shape of the particle using the squish factor
vec2 modifiedPosition = gl_PointCoord;
modifiedPosition.y *= squish;

// Set the color to black with the adjusted opacity
gl_FragColor = vec4(0.0, 0.0, 0.0, opacity);
}
