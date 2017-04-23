import * as THREE from 'three'
import OrbitControls from 'orbit-controls-es6'
declare function require(path: string) : any

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

// Sample object
const planeGeo = new THREE.PlaneGeometry( 64, 64, 32, 16 );
const material = new THREE.ShaderMaterial({
      uniforms,
      wireframe: true,
      vertexShader: require('./planevert'),
      fragmentShader: require('./planefrag.glsl')
    })
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
	plane.geometry.vertices[i].z = rand(-3, -2)
}

plane.geometry.verticesNeedUpdate = true
plane.geometry.normalsNeedUpdate = true

plane.geometry.computeVertexNormals()
plane.geometry.computeFaceNormals()

animate()

console.log(plane.geometry)
function animate(): void {
	requestAnimationFrame(() => animate())
	render()
}

function render(): void {
	uniforms.u_time.value += 0.005
	plane.rotation.x += 0.00001 * Math.sin(uniforms.u_time.value)

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
