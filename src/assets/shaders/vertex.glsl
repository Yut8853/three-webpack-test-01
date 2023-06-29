varying vec2 vUv;
uniform float uTime;

float PI = 3.1415926535897932384626433832795;

void main(){
    vUv = uv;
    vec3 pos = position;


    float tension = -0.001 * uTime;

    pos.y = pos.y + cos(pos.x * PI) * tension;
    pos.z = pos.z - sin(pos.y * clamp(uTime * .1, -1., 1.) * PI * 2./3. + PI/3.) * min(abs(uTime * .2), 100.);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}