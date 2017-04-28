varying vec3 vecNormal;

void main() {
	float intensity = pow( 0.6 - dot( vecNormal, vec3( 0.0, 0.0, 0.5 ) ), 7.0 );
	gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0 * intensity);
}

