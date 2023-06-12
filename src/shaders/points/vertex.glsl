attribute vec3 velocity;
attribute vec3 previousPosition;

varying vec3 vPreviousPosition;

void main() {
vPreviousPosition = previousPosition;
vec4 mvPosition = modelViewMatrix * vec4(position + velocity * 0.1, 1.0);
gl_PointSize = 3.0 * (300.0 / -mvPosition.z);
gl_Position = projectionMatrix * mvPosition;
}