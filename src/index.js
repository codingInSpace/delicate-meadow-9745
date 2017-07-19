import * as THREE from 'three'
const TrackballControls = require('three-trackballcontrols');
import Plane from './Plane/Plane'
import LightBall from './LightBall/LightBall'
import Stats from 'stats.js'

const isDev = process.env.NODE_ENV !== 'production'

/**
 * Main function
 *
 * @param {object} opts - Options running the app
 * @param {number} opts.width - The width of the canvas
 * @param {number} opts.height - The height of the canvas
 * @param {number} opts.respondToWidth - If the canvas should update width on window resize
 * @param {number} opts.bgColor - The background color of the canvas
 */
function App(opts = {}) {
	const scene = new THREE.Scene()
	const camera = new THREE.PerspectiveCamera(75, opts.width / opts.height, 0.1, 10000)

	window.addEventListener('resize', () => {
		let newWidth
		const newHeight =	window.innerHeight < optsheight ? window.innerHeight : height

		if (opts.respondToWidth)
			newWidth = window.innerWidth
		else
			newWidth = window.innerWidth < width ? window.innerWidth : width

		renderer.setSize(newWidth, newHeight)
		camera.aspect = newWidth / newHeight
		camera.updateProjectionMatrix()
	})

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

	const renderer = new THREE.WebGLRenderer({ alpha: true })
	renderer.setSize(opts.width, opts.height)
	document.body.appendChild(renderer.domElement)

	let controls

	if (isDev)
		controls = new TrackballControls(camera, renderer.domElement)

	let stats
	if (isDev) {
		stats = new Stats()
		stats.showPanel(0)
		stats.dom.style.position = 'absolute'
		stats.dom.style.left = '10px'
		stats.dom.style.top = '10px'

		document.body.appendChild(stats.dom)
	}

	// Light
	const light = new THREE.PointLight(0xeeeeee, 1.2, 500)
	light.position.set(-40, 80, 40)
	scene.add(light)

	const plane = new Plane(uniforms)
	scene.add( plane.mesh );

	const lightBall = new LightBall(4, uniforms)
	plane.mesh.add( lightBall.mesh );

	const dirLight = new THREE.DirectionalLight(0xffffff, 0.5)
	lightBall.mesh.add(dirLight)

	plane.mesh.position.y = 20.0
	plane.mesh.position.x = 125.0
	plane.mesh.rotation.y = -Math.PI / 8
	plane.mesh.rotation.x = -Math.PI / 6

	camera.position.z = 250
	camera.lookAt(plane.mesh)

	plane.mesh.geometry.dynamic = true

  renderer.domElement.style.backgroundImage = opts.bgColor || 'linear-gradient(-225deg, #FFFEFF 0%, #D7FFFE 100%)'

	animate()

	function animate() {
		requestAnimationFrame(() => animate())
		render()
	}

	function render() {
		if (isDev) stats.begin()

		uniforms.u_time.value += 0.005
		plane.mesh.rotation.z += 0.005 

		renderer.render(scene, camera)

		if (isDev) {
			controls.update()
			stats.end()
		}
	}

	return renderer.domElement
}

export default App

