import * as THREE from 'three'

class LightBall {
	constructor(radius, unfiforms) {
		this.uniforms = unfiforms

		const geo = new THREE.SphereGeometry(radius + 2, 64, 64)
		const material = new THREE.ShaderMaterial({
			uniforms: this.uniforms,
			vertexShader: require('./lightvert'),
			fragmentShader: require('./lightfrag'),
			side: THREE.BackSide,
			transparent: true
		})

		this.mesh = new THREE.Mesh( geo, material )
		this.mesh.position.z += 30;
	}
}

export default LightBall
