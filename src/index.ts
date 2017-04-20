import * as THREE from 'three'
import OrbitControls from 'orbit-controls-es6'

let scene = new THREE.Scene()
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000)

let renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

let controls = new OrbitControls(camera, renderer.domElement)

// Light
let light = new THREE.PointLight(0xeeeeee, 1.2, 500)
light.position.set(-40, 80, 40)
scene.add(light)

// Sample object
let planeGeo = new THREE.PlaneGeometry( 64, 64, 32, 16 );
const material = new THREE.MeshLambertMaterial({color: 0x555555, emissive: 0xdddddd, wireframe: true, shading: THREE.NoShading});
const plane = new THREE.Mesh( planeGeo, material );
scene.add( plane );

plane.position.x = 0.0
plane.position.y = 3.0

camera.position.x = 0
camera.position.y = -30
camera.position.z = 2
camera.lookAt(plane)

plane.geometry.dynamic = true

for (let i : number = 0; i < plane.geometry.vertices.length; ++i) {
	const { x, y } = plane.geometry.vertices[i]
	plane.geometry.vertices[i].x = x + rand(-0.4, 0.4)
	plane.geometry.vertices[i].y = y + rand(-0.5, 0.5)
	plane.geometry.vertices[i].z = rand(-4, -2)
}

plane.geometry.verticesNeedUpdate = true
plane.geometry.normalsNeedUpdate = true

plane.geometry.computeVertexNormals()
plane.geometry.computeFaceNormals()

let timer : number = 0.0000001 * Date.now()

animate()

console.log(plane.geometry)
function animate(): void {
	requestAnimationFrame(() => animate())
	render()
}

function render(): void {
	timer += 0.005
	plane.rotation.x += 0.00001 * Math.sin(timer)

	for (let i : number = 0; i < plane.geometry.vertices.length; ++i) {
		const { x, y } = plane.geometry.vertices[i]
		plane.geometry.vertices[i].z += -i * 0.00001 * (Math.sin(10.5 * timer))
	}

	plane.geometry.verticesNeedUpdate = true
	plane.geometry.normalsNeedUpdate = true

	plane.geometry.computeVertexNormals()
	plane.geometry.computeFaceNormals()

	renderer.render(scene, camera)
	controls.update()
}

function rand(min, max): number {
  if (max === null) {
    max = min
    min = 0
  }

  return min + (Math.random() * (max - min + 1))
}
