varying vec2 vUv;
uniform sampler2D u_skyTexture;

void main() {
	gl_FragColor = vec4(texture2D( u_skyTexture, vUv ).rgb, 1.0);
}
