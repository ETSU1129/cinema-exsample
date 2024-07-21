import GUI from 'lil-gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import gsap from 'gsap'
import { seatData } from './seatData'

// const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

scene.fog = new THREE.Fog(0xffffff, 1,180)
/**
 * Loaders
 */
// Texture loader
const textureLoader = new THREE.TextureLoader()

// Draco loader
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('draco/')

// GLTF loader
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

/**
 * Textures
 */
const bakedTexture = textureLoader.load('30-30.jpg')
bakedTexture.flipY = false
bakedTexture.colorSpace = THREE.SRGBColorSpace

const bakedTexture2 = textureLoader.load('30-03.jpg')
bakedTexture2.flipY = false
bakedTexture2.colorSpace = THREE.SRGBColorSpace

/**
 * Materials
 */
// Baked material
const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture })
const bakedMaterial2 = new THREE.MeshBasicMaterial({ map: bakedTexture2 })

// fogを追加




/**
 * Model
 */
gltfLoader.load(
    'cinema_21.glb',
    (gltf) =>
    {
        const bakedMesh = gltf.scene.children.find(child => child.name === 'heimen001')
        const bakedMesh2 = gltf.scene.children.find(child => child.name === 'heimen002')


        bakedMesh.material = bakedMaterial
        bakedMesh2.material = bakedMaterial2

        scene.add(gltf.scene)
    }
)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// function addMouseMoveEventListener() {
//     window.addEventListener('mousemove', (event) => {
//         const mouseX = (event.clientX / window.innerWidth) * 2 + 1;
//         const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

//         gsap.to(controls.target, {
//             x: mouseX * 2,
//             y: mouseY * 2,
//             duration: 1
//         });
//     });
// }


/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(60, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 23
camera.position.y = 15
camera.position.z = -14
scene.add(camera)

const cameraposition ={
    x: 23,
    y: 15,
    z: -14

}

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

const diveinto = document.getElementById('diveinto')
const arrow = document.getElementById('arrow')
const chart = document.getElementById('chart')


function introAnimation() {
    controls.enabled = false // カメラをアニメーションするためにオービットコントロールを無効にする
    window.MouseEvent = false
    document.getElementById('diveinto').addEventListener('click', diveintoAnimation)
    document.getElementById('chart').style.display = 'none';
    document.getElementById('text').style.display = 'block';
    document.getElementById('selected--chair--component-show').style.display = 'none'
    

    gsap.to(camera.position, { // カメラの位置から
        duration: 6.5, // アニメーションにかかる時間A
        delay: 0.5, // 遅延
        x:-3, // 目指すx位置
        y: 15, // 目指すy位置
        z: -14, // 目指すz位置
        ease: "power4.inOut", // イージングを定義
        onComplete: function () { // アニメーション終了時
                                    // controls.enabled = true // オービットコントロールを有効にする
                                    // setOrbitControlsLimits() // コントロール制限を設定
                                    document.getElementById('content').style.display = 'block';
                                    gsap.from('#content', { opacity: 0, duration: 1 });
                                    window.MouseEvent = true
        }
    })
    gsap.to(controls.target,
        {
            duration: 3.5,
            delay: 0.5,
            x: 5,
            y: 13,
            z: 0,
            ease: "power4.inOut"
        }
    )
}
introAnimation()



const pokemon = document.getElementById('seat1')

document.getElementById('topcontent').addEventListener('click', backtohome)


function diveintoAnimation() {
    controls.enabled = false // カメラをアニメーションするためにオービットコントロールを無効にする

    document.getElementById('selected--chair--component-show').style.display = 'none'
    gsap.to('#text', { opacity: 0, duration: 1 });

    gsap.to(camera.position, { // カメラの位置から
        duration: 4, // アニメーションにかかる時間A
        x:20, // 目指すx位置
        y: 10, // 目指すy位置q
        z: 31, // 目指すz位置
        ease: "power4.inOut", // イージングを定義
        onComplete: function () { // アニメーション終了時
                                    
                                    document.getElementById('text').style.display = 'none';
                                    document.getElementById('chart').style.opacity = 0;
                                    document.getElementById('chart').style.display = 'flex';
                                    gsap.to('#chart', { opacity: 1, duration: 0.2 });
                                    
                                    // setOrbitControlsLimits() // コントロール制限を設定
                                    arrow.style.display = 'block'
                                    addMouseMoveEventListener()
                                    
        }
    })
    gsap.to(controls.target,
        {
            duration: 3.5,
            delay: 0.5,
            x: 8,
            y: 5,
            z: -1,
            ease: "power4.inOut"
        }
    )
    
}
console.log(diveinto)
console.log(introAnimation)
console.log(camera.position)
console.log(controls.target)

document.getElementById('diveinto').addEventListener('click', () => {
    // マウスムーブイベントリスナーを追加する関数を呼び出す
    diveintoAnimation();
})





document.getElementById('arrow').addEventListener('click', diveintoAnimation)
    
// 座席がクリックされた時の処理
function seatClick(seatId) {
    console.log(seatId)
    document.getElementById('chart').style.display = 'none'
    document.getElementById('selected--chair--component-show').style.display = 'block'
    const data = seatData[seatId]
    gsap.to(camera.position, { // カメラの位置から
        duration: 2.5, // アニメーションにかかる時間
        delay: 0.5, // 遅延
        x: data.cameraPosition.x, // 目指すx位置
        y: data.cameraPosition.y, // 目指すy位置
        z: data.cameraPosition.z, // 目指すz位置
        ease: "power4.inOut", // イージングを定義
        onComplete: function () { // アニメーション終了時
            controls.enabled = true; // オービットコントロールを有効にする
        }
    });

    gsap.to(controls.target, {
        duration: 2.5,
        delay: 0.5,
        x: data.targetPosition.x,
        y: data.targetPosition.y,
        z: data.targetPosition.z,
        ease: "power4.inOut"
    });
}

document.getElementById('about').addEventListener('click',() =>{
    const content = document.getElementById('about-content');
    content.style.display = 'flex';
});
document.getElementById('close').addEventListener('click',() =>{
    const content = document.getElementById('about-content');
    content.style.display = 'none';
});

const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
const numSeats = 11;

rows.forEach(row => {
    for (let i = 1; i <= numSeats; i++) {
        document.getElementById(`${row}${i}`).addEventListener('click', () => seatClick(`${row}${i}`));
    }
});


function backtohome() {
    controls.enabled = false // カメラをアニメーションするためにオービットコントロールを無効にする
    document.getElementById('selected--chair--component-show').style.display = 'none'
    gsap.to(camera.position, { // カメラの位置から
        duration: 2, // アニメーションにかかる時間A
        delay: 0.5, // 遅延
        x:-3, // 目指すx位置
        y: 16, // 目指すy位置q
        z: -16, // 目指すz位置
        ease: "power4.inOut", // イージングを定義
        onComplete: function () { // アニメーション終了時
                                    
                                    document.getElementById('text').style.display = 'block';
                                    document.getElementById('text').style.opacity = '1';
        }
    })
    gsap.to(controls.target,
        {
            duration: 3.5,
            delay: 0.5,
            x: 5,
            y: 10,
            z: 0,
            ease: "power4.inOut"
        }
    )
}
document.getElementById('home').addEventListener('click', backtohome)

