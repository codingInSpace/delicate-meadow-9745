import * as THREE from 'three'

class LightBall {
	constructor(radius, unfiforms) {
		this.uniforms = unfiforms

		const geo = new THREE.SphereGeometry(radius, 32, 32)
		const material = new THREE.ShaderMaterial({
			uniforms: this.uniforms,
			vertexShader: require('./lightvert'),
			fragmentShader: require('./lightfrag'),
		})

		this.mesh = new THREE.Mesh( geo, material )
		this.mesh.position.z += 30;
	}
}

export default LightBall
