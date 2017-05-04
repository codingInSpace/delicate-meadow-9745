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

	// White flash rise
	if (u_time >= 1.05 && u_time < 1.1) {
		float factor = u_time;
		factor = (u_time - 1.05) / 0.05; //time starts at 1.0, norm to 0.0 to 1.0
		color += mix(0.0, 1.0, factor);
	}

	// White flash sink
	if (u_time >= 1.1 && u_time < 1.15) {
		//float factor = 1.0 - (u_time * 0.5);
		float factor = u_time;
		factor = (u_time - 1.1) / 0.05;
		color += 1.0; 
		color = color - mix(0.0, 1.0, factor);
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
