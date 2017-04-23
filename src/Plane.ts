import * as THREE from 'three'
declare function require(path: string) : any

class Plane {
	private uniforms: object
	mesh: THREE.Mesh

	constructor(uniforms: object) {
		this.uniforms = uniforms
		this.init()
	}

	init(): void {
		const planeGeo = new THREE.PlaneGeometry( 64, 64, 32, 16 );
		const material = new THREE.ShaderMaterial({
		      uniforms: this.uniforms,
		      wireframe: true,
		      vertexShader: require('./planevert'),
		      fragmentShader: require('./planefrag')
	    })

		this.mesh = new THREE.Mesh( planeGeo, material );

		for (let i : number = 0; i < this.mesh.geometry.vertices.length; ++i) {
			const { x, y } = this.mesh.geometry.vertices[i]
			this.mesh.geometry.vertices[i].x = x + this.rand(-0.4, 0.4)
			this.mesh.geometry.vertices[i].y = y + this.rand(-0.5, 0.5)
			this.mesh.geometry.vertices[i].z = this.rand(-3, -2)
		}

		this.mesh.geometry.verticesNeedUpdate = true
		this.mesh.geometry.normalsNeedUpdate = true

		this.mesh.geometry.computeVertexNormals()
		this.mesh.geometry.computeFaceNormals()
	}

	rand(min, max): number {
		if (max === null) {
		    max = min
		    min = 0
		}

		return min + (Math.random() * (max - min + 1))
	}

}

export default Plane