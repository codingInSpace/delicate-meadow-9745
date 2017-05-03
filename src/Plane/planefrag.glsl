uniform float u_time;
varying float elevation;
varying vec2 vUV;

vec3 colorA = vec3(0.149,0.141,0.912);
vec3 colorB = vec3(0.700,0.700,1.000);

void main() {
	vec3 color = vec3(0.0);

	// mix the two colors according to height in mesh
	color = mix(colorA, colorB, smoothstep(-30.0, 30.0, elevation));

	// vary colors by uv coords
	color.r = color.r + 0.3 * vUV.x;
	color.g = color.g + 0.1 * vUV.y;

	if (u_time < 1.5) {
		color = color * 1.0 + (abs(u_time - 1.0));
	}
	
	if (u_time >= 1.5 && u_time < 2.5) {
		color += 1.0 - ((u_time - 0.5) * 0.5);
	}

	if (vUV.x + vUV.y < 0.2)
		discard;
	if ((vUV.x + vUV.y) * 0.5 > 0.85)
		discard;
	if (vUV.x - vUV.y > 0.8 && vUV.y < 0.2)
		discard;
	if (vUV.y - vUV.x > 0.8 && vUV.x < 0.2)
		discard;

	gl_FragColor = vec4(color,1.0);
}
