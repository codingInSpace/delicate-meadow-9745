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
const geometry = new THREE.PlaneBufferGeometry( 64, 64, 32, 16 );
const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide, wireframe: true} );
const plane = new THREE.Mesh( geometry, material );
scene.add( plane );

plane.position.x = 0.0
plane.position.y = 3.0

camera.position.x = 0
camera.position.y = -30
camera.position.z = 2
camera.lookAt(plane)

let timer = 0.002 * Date.now()

animate()

function animate(): void {
	requestAnimationFrame(() => animate())
	render()
}

function render(): void {
	timer += 0.005
	plane.rotation.x += 0.00001 * Math.sin(timer)
	renderer.render(scene, camera)
	controls.update()
}
