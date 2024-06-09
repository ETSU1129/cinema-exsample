import GUI from 'lil-gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import gsap from 'gsap'
// /**
//  * Spector JS
//  */
// const SPECTOR = require('spectorjs')
// const spector = new SPECTOR.Spector()
// spector.displayUI()

/**
 * Base
 */
// Debug
const gui = new GUI({
    width: 400
})

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

scene.fog = new THREE.Fog(0xffffff, 1,200)

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

// Portal light material
// const portalLightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })

// // Pole light material
// const poleLightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffe5 })


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
        // const portalLightMesh = gltf.scene.children.find(child => child.name === 'portalLight')
        // const poleLightAMesh = gltf.scene.children.find(child => child.name === 'poleLightA')
        // const poleLightBMesh = gltf.scene.children.find(child => child.name === 'poleLightB')

        bakedMesh.material = bakedMaterial
        bakedMesh2.material = bakedMaterial2
        // portalLightMesh.material = portalLightMaterial
        // poleLightAMesh.material = poleLightMaterial
        // poleLightBMesh.material = poleLightMaterial

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

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 100
camera.position.y = 2
camera.position.z = 4
scene.add(camera)

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

function introAnimation() {
    controls.enabled = false // カメラをアニメーションするためにオービットコントロールを無効にする

    gsap.to(camera.position, { // カメラの位置から
        duration: 6.5, // アニメーションにかかる時間A
        delay: 1, // 遅延
        x:100, // 目指すx位置
        y: 50, // 目指すy位置
        z: -0.1, // 目指すz位置
        ease: "power4.inOut", // イージングを定義
        onComplete: function () { // アニメーション終了時
                                    controls.enabled = true // オービットコントロールを有効にする
                                    // setOrbitControlsLimits() // コントロール制限を設定
        }
    })
}
introAnimation()