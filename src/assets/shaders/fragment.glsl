varying vec2 vUv;
uniform sampler2D uTexture;
uniform sampler2D uDisp;
uniform float uImageAspect;
uniform float uPlaneAspect;
uniform float uTime;

void main(){

  vec2 ratio = vec2(
    min(uPlaneAspect / uImageAspect, 1.0),
    min((1.0 / uPlaneAspect) / (1.0 / uImageAspect), 1.0)
  );

  vec2 fixedUv = vec2(
    (vUv.x - 0.5) * ratio.x + 0.5,
    (vUv.y - 0.5) * ratio.y + 0.5
  );

  vec4 disp = texture2D(uDisp, vUv);
  vec2 dispVec = vec2(0., sin(disp.y * .8) * 2.);
  
  vec2 distPos = fixedUv + (dispVec * uTime * .0005);

  vec2 offset = vec2(0.0, uTime * 0.0005);
  float r = texture2D(uTexture, fixedUv + offset).r;
  float g = texture2D(uTexture, fixedUv + offset * 0.5).g;
  float b = texture2D(uTexture, fixedUv).b;

  gl_FragColor = texture2D(uTexture, distPos);
}