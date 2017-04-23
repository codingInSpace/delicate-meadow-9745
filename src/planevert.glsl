uniform float u_time;
varying float elevation;

void main() {
	vec3 variedpos = position;
	variedpos.z += sin(100.0 - (uv.y + uv.x) * u_time);
	elevation = clamp(variedpos.z, 0.0, 1.0);
	gl_Position = projectionMatrix * modelViewMatrix * vec4( variedpos, 1.0 );
}