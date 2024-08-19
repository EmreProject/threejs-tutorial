import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */

//COMBINING TRANSFORMATION ORDER LIKE SCALE,POS,ROT WORKS IN ANY ORDER SAME RESULT

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
mesh.position.x=0.7;
mesh.position.y=0;
mesh.position.z=-1;
mesh.scale.set(2,0.5,0.5);
mesh.rotation.reorder("YXZ");//her rotationda axies degisir, en iyi axis order bu  
mesh.rotation.z=Math.PI/7;
mesh.rotation.x=Math.PI/6;
mesh.rotation.y=Math.PI/4;


scene.add(mesh)


/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
camera.position.x=1;
camera.position.y=4;
scene.add(camera)

//lookAt methodu bütün object3d lerde var
camera.lookAt(mesh.position);

//vector3 funcs,properties
console.log(mesh.position.length()); //vector uzunlugu
console.log(mesh.position.distanceTo(camera.position)); //aradaki mesafe
//console.log(mesh.position.normalize());//it also mutates!!!!!
mesh.position.set(0.7,0,1);

//axes helper
const axesHelper=new THREE.AxesHelper(3);//3 boyutu
scene.add(axesHelper);


//group!!!
const group=new THREE.Group();
scene.add(group);
const mesh2=new THREE.Mesh(geometry,material);;
mesh2.position.set(3,0,-4);
const mesh3=new THREE.Mesh(geometry,material);
mesh3.position.set(-3,0,-4);
const mesh4=new THREE.Mesh(geometry,material);
group.add(mesh2,mesh3,mesh4);
group.rotation.y=-6;
group.position.y=-0.8;


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
   antialias:true

})
renderer.setPixelRatio(2);
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)