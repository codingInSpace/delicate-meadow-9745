uniform float u_time;
varying float elevation;

void main() {
	vec3 variedpos = position;
	vec2 vMid = vec2(0.5, 0.5);

	float distToMid = distance(vMid, uv);

	//variedpos.z += smoothstep(0.0, 1.0, distToMid) * 100.0 * abs(sin(2.0 * u_time));
	variedpos.z += 20.0 * sin(10.0 * u_time * smoothstep(0.0, 1.0, distToMid)) + 40.0 * sin(distToMid * u_time);

	//elevation = clamp(variedpos.z, 0.0, 1.0);
	elevation = variedpos.z;
	gl_Position = projectionMatrix * modelViewMatrix * vec4( variedpos, 1.0 );
}