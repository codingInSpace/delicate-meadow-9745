import * as THREE from 'three'
import OrbitControls from 'orbit-controls-es6'
import Plane from './Plane'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000)

let uniforms = {
	u_time: { type: "f", value: 1.0 }
}

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)

// Light
const light = new THREE.PointLight(0xeeeeee, 1.2, 500)
light.position.set(-40, 80, 40)
scene.add(light)

const plane = new Plane(uniforms)
scene.add( plane.mesh );

plane.mesh.position.x = 0.0
plane.mesh.position.y = 3.0

camera.position.x = 0
camera.position.y = -30
camera.position.z = 10
camera.lookAt(plane.mesh)

plane.mesh.geometry.dynamic = true

animate()

function animate(): void {
	requestAnimationFrame(() => animate())
	render()
}

function render(): void {
	uniforms.u_time.value += 0.005
	plane.mesh.rotation.z += 0.00005 * uniforms.u_time.value

	renderer.render(scene, camera)
	controls.update()
}

