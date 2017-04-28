uniform float u_time;
varying vec3 vecNormal;

void main() {
	vec3 newPos = position;
	newPos.z += 20.0 * abs(sin(0.2 * u_time));
	gl_Position = projectionMatrix * modelViewMatrix * vec4( newPos, 1.0 );
	vecNormal = normalize( normalMatrix * normal );
}

