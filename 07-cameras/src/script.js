import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js"



//ORBITCONTROLS DISINDA COK CESIT CONTROL VAR ONLARADA BAK


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
window.addEventListener("resize",()=>{

sizes.width=window.innerWidth;
sizes.height=window.innerHeight;

});


//CURSOR
const cursor={
x:0,
y:0
};
window.addEventListener("mousemove",(e)=>{

cursor.x= (e.clientX/sizes.width) - 0.5;
cursor.y= -((e.clientY/sizes.height) - 0.5);

});



// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

// Perspective Camera
//75 vertical field as degree, second param aspect ratio, third param near,  fourth param far
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height,0.1,100);

//Ortho camera
//params left,right,top,bottom,ner,far
/*
const aspect=sizes.width/sizes.height;
const camera = new THREE.OrthographicCamera(-1*aspect,1*aspect,1,-1,0.1,100)
*/


camera.position.z = 4;

camera.lookAt(mesh.position)
scene.add(camera)


//second param is whic dom element to look mouse events
//zoom in out, drag drop right click, move whit drag drop left click
const controls=new OrbitControls(camera,canvas);
controls.target.y=-1;//direction of camera

//damping is for smooth camera move
controls.enableDamping=true; // ALWAYS UPDATE CAMERA ON RENDER LOOP

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height);


// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    //mesh.rotation.y = elapsedTime;
   
    /* basic camera move as mousemove
    camera.position.x=cursor.x*3;
    camera.position.y=cursor.y*3;
    */

    /* turning around 360deg
    camera.position.x=Math.sin(cursor.x*Math.PI*2)*4;
    camera.position.z=Math.cos(cursor.x*Math.PI*2)*4
    camera.position.y=cursor.y*3;
    camera.lookAt(mesh.position);

    */

    //update controls
    controls.update();

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()