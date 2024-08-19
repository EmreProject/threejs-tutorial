import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

//FIRST WAY
let previous=performance.now();
const tick=function(time){

    let current=time-previous;
    previous=time;


    //update objects
   mesh.position.x += (current*0.0001);
    renderer.render(scene, camera)

    requestAnimationFrame(tick);

}
//requestAnimationFrame(tick);

//second way clock
const clock=new THREE.Clock();
const tick2=function(time){


    //saniye seklinde 0 dan baslar sürekli artar
  console.log(clock.getElapsedTime());
const elapsedtime=clock.getElapsedTime();

//do not use getDelta!!!!!!

camera.position.x=Math.cos(elapsedtime)*2;
camera.position.y=Math.sin(elapsedtime)*2;
camera.lookAt(mesh.position);

    //update objects
   // mesh.position.x += (current*0.0001);
    renderer.render(scene, camera)

    requestAnimationFrame(tick2);

}

requestAnimationFrame(tick2);


