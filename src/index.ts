import * as THREE from 'three'
import OrbitControls from 'orbit-controls-es6'

let scene = new THREE.Scene()
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000)

let renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

let controls = new OrbitControls(camera, renderer.domElement)

// Light
let light = new THREE.DirectionalLight(0xffffff, 1.0)
light.position.set(100, 100, 100)
scene.add(light)

// Sample object
let material = new THREE.MeshBasicMaterial({
	color: 0xaaaaaa,
	wireframe: true
})
let box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material)
scene.add(box)

box.position.x = 0.5
box.rotation.y = 0.5

camera.position.x = 5
camera.position.y = 5
camera.position.z = 5
camera.lookAt(box)

let timer = 0.002 * Date.now()

animate()

function animate(): void {
	requestAnimationFrame(() => animate())
	render()
}

function render(): void {
	timer += 0.005
	box.rotation.x += 0.01 * Math.sin(timer)
	renderer.render(scene, camera)
	controls.update()
}
