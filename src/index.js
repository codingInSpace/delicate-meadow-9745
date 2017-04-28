import * as THREE from 'three'
const TrackballControls = require('three-trackballcontrols');
import Plane from './Plane/Plane'
import LightBall from './LightBall/LightBall'

function App(width, height) {

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10000)

let uniforms = {
	u_time: { type: "f", value: 1.0 },
	u_skyTexture: { type: "t", value: null },
}

// Load sky texture
//const texLoader = new THREE.TextureLoader();
// texLoader.load('public/PIA02.jpg', texture => {
//   const tex = texture;
//   tex.minFilter = THREE.LinearFilter;
//   uniforms.u_skyTexture.value = tex;
// })

const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)
document.body.appendChild(renderer.domElement)

let controls

//if (process.env.NODE_ENV !== 'production')
	controls = new TrackballControls(camera, renderer.domElement)

// Light
const light = new THREE.PointLight(0xeeeeee, 1.2, 500)
light.position.set(-40, 80, 40)
scene.add(light)

const plane = new Plane(uniforms)
scene.add( plane.mesh );

const lightBall = new LightBall(4, uniforms)
scene.add( lightBall.mesh );

const dirLight = new THREE.DirectionalLight(0xffffff, 0.5)
lightBall.mesh.add(dirLight)

plane.mesh.position.y = 3.0

camera.position.x = 0
camera.position.y = -180
camera.position.z = 150
camera.lookAt(plane.mesh)

plane.mesh.geometry.dynamic = true

animate()

function animate() {
	requestAnimationFrame(() => animate())
	render()
}

function render() {
	uniforms.u_time.value += 0.005
	plane.mesh.rotation.z += 0.005 

	renderer.render(scene, camera)

	//if (process.env.NODE_ENV !== 'production')
		controls.update()
}

	return renderer.domElement
}

export default App
