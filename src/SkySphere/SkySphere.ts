import * as THREE from 'three'
declare function require(path: string) : any

class SkySphere {
	mesh: THREE.Mesh
	private uniforms: object

	constructor(radius: number, unfiforms: object) {
		this.uniforms = unfiforms

		 const geo = new THREE.SphereGeometry(radius, 64, 64);
		//const material = new THREE.MeshLambertMaterial({
		// 	map: THREE.ImageUtils.loadTexture('public/PIA02.jpg'),
		// 	side: THREE.BackSide
	    //})
	    const material2 = new THREE.ShaderMaterial({
			uniforms: this.uniforms,
			vertexShader: require('./skyspherevert'),
			fragmentShader: require('./skyspherefrag'),
			side: THREE.BackSide
	    })

		this.mesh = new THREE.Mesh( geo, material2 );
	}
}

export default SkySphere