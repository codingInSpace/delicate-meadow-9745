import * as THREE from 'three'
declare function require(path: string) : any

class LightBall {
	mesh: THREE.Mesh
	private uniforms: object

	constructor(radius: number, unfiforms: object) {
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
