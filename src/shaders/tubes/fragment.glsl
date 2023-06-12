varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
uniform float time;
uniform vec4 resolution;
void main() {
    vec2 uv = vUv;
    gl_FragColor = vec4(vUv.x, 0.,0., 1.0);
}