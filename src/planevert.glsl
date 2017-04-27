uniform float u_time;
varying float elevation;

void main() {
	vec3 variedpos = position;
	vec2 vMid = vec2(0.5, 0.5);

	float distToMid = distance(vMid, uv);

	variedpos.z += 30.0 * -sin(50.0 * u_time * distToMid);

	elevation = clamp(variedpos.z, 0.0, 1.0);
	gl_Position = projectionMatrix * modelViewMatrix * vec4( variedpos, 1.0 );
}