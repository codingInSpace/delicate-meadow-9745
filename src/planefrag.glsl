uniform float u_time;
varying float elevation;

vec3 colorA = vec3(0.149,0.141,0.912);
vec3 colorB = vec3(0.700,0.700,1.000);

void main() {
	vec3 color = vec3(0.0);

    // mix the two colors
    //color = mix(colorA, colorB, elevation); 
    color = mix(colorA, colorB, smoothstep(-60.0, 60.0, elevation));

    gl_FragColor = vec4(color,1.0);
}