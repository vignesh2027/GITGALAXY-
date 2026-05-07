import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

const VERT = `
  attribute float aScale;
  attribute float aRandom;
  uniform float uTime;
  uniform float uSize;
  varying vec3 vColor;
  void main(){
    vColor = color;
    vec4 modelPos = modelMatrix * vec4(position, 1.0);
    float dist = length(modelPos.xyz);
    modelPos.y += sin(uTime * 0.5 + dist * 0.3) * 0.02;
    vec4 viewPos = viewMatrix * modelPos;
    gl_Position = projectionMatrix * viewPos;
    gl_PointSize = uSize * aScale * (1.0 / -viewPos.z) * 300.0;
    gl_PointSize = max(gl_PointSize, 0.5);
  }
`

const FRAG = `
  varying vec3 vColor;
  void main(){
    float d = distance(gl_PointCoord, vec2(0.5));
    float s = 1.0 - smoothstep(0.0, 0.5, d);
    if(s < 0.01) discard;
    gl_FragColor = vec4(vColor * 2.5, s * 0.9);
  }
`

export class GalaxyEngine {
  renderer: THREE.WebGLRenderer
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  composer: EffectComposer
  controls: OrbitControls
  clock: THREE.Clock
  private galaxyMat: THREE.ShaderMaterial | null = null
  private animId: number | null = null
  private planets: THREE.Mesh[] = []
  private planetGroup: THREE.Group
  private mouseX = 0
  private mouseY = 0

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.0
    this.renderer.outputColorSpace = THREE.SRGBColorSpace

    this.scene = new THREE.Scene()
    this.scene.fog = new THREE.FogExp2(0x050816, 0.035)

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
    this.camera.position.set(0, 3.5, 7)
    this.scene.add(this.camera)

    this.clock = new THREE.Clock()
    this.planetGroup = new THREE.Group()
    this.scene.add(this.planetGroup)

    this.controls = new OrbitControls(this.camera, canvas)
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.05
    this.controls.enablePan = false
    this.controls.minDistance = 2
    this.controls.maxDistance = 25
    this.controls.autoRotate = true
    this.controls.autoRotateSpeed = 0.15

    this.composer = this.buildComposer()

    this.buildGalaxy()
    this.buildPlanetRings()
    this.buildStarField()
    this.buildNebula()

    window.addEventListener('resize', this.onResize)
    window.addEventListener('mousemove', this.onMouseMove)
  }

  private buildComposer(): EffectComposer {
    const composer = new EffectComposer(this.renderer)
    composer.addPass(new RenderPass(this.scene, this.camera))
    const bloom = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.8, 0.4, 0.12
    )
    composer.addPass(bloom)
    return composer
  }

  private buildGalaxy() {
    const COUNT = 120000
    const positions = new Float32Array(COUNT * 3)
    const colors = new Float32Array(COUNT * 3)
    const scales = new Float32Array(COUNT)
    const randoms = new Float32Array(COUNT)

    const c1 = new THREE.Color('#00F5FF')
    const c2 = new THREE.Color('#7B61FF')
    const c3 = new THREE.Color('#39FF14')
    const c4 = new THREE.Color('#FFB703')

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3
      const r = Math.pow(Math.random(), 1.5) * 12
      const arm = (i % 3) / 3
      const spin = r * 1.1
      const angle = arm * Math.PI * 2 + spin + Math.random() * 0.6

      const spread = Math.pow(Math.random(), 2)
      const rx = (Math.random() - 0.5) * spread * 3
      const ry = (Math.random() - 0.5) * spread * 0.6
      const rz = (Math.random() - 0.5) * spread * 3

      positions[i3]     = Math.cos(angle) * r + rx
      positions[i3 + 1] = ry
      positions[i3 + 2] = Math.sin(angle) * r + rz

      const t = r / 12
      let col: THREE.Color
      if (t < 0.25)      col = c1.clone().lerp(c2, t * 4)
      else if (t < 0.5)  col = c2.clone().lerp(c3, (t - 0.25) * 4)
      else if (t < 0.75) col = c3.clone().lerp(c4, (t - 0.5) * 4)
      else               col = c4.clone().lerp(c1, (t - 0.75) * 4)

      colors[i3]     = col.r
      colors[i3 + 1] = col.g
      colors[i3 + 2] = col.b
      scales[i]  = Math.random()
      randoms[i] = Math.random()
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3))
    geo.setAttribute('aScale',   new THREE.BufferAttribute(scales, 1))
    geo.setAttribute('aRandom',  new THREE.BufferAttribute(randoms, 1))

    this.galaxyMat = new THREE.ShaderMaterial({
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 }, uSize: { value: 0.015 } },
      vertexShader: VERT,
      fragmentShader: FRAG
    })

    this.scene.add(new THREE.Points(geo, this.galaxyMat))
  }

  private buildPlanetRings() {
    const configs = [
      { color: '#39FF14', r: 3.5, size: 0.12, speed: 0.4 },
      { color: '#00F5FF', r: 5.0, size: 0.16, speed: 0.28 },
      { color: '#FFB703', r: 6.5, size: 0.10, speed: 0.22 },
      { color: '#7B61FF', r: 8.0, size: 0.14, speed: 0.18 },
      { color: '#FF3366', r: 9.5, size: 0.09, speed: 0.15 }
    ]

    configs.forEach(cfg => {
      const geo = new THREE.SphereGeometry(cfg.size, 16, 16)
      const mat = new THREE.MeshStandardMaterial({
        color: cfg.color, emissive: cfg.color, emissiveIntensity: 2,
        roughness: 0.3, metalness: 0.8
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.userData = { radius: cfg.r, speed: cfg.speed, angle: Math.random() * Math.PI * 2 }
      this.planetGroup.add(mesh)
      this.planets.push(mesh)

      // Orbit ring
      const ring = new THREE.RingGeometry(cfg.r - 0.01, cfg.r + 0.01, 128)
      const ringMat = new THREE.MeshBasicMaterial({
        color: cfg.color, side: THREE.DoubleSide,
        transparent: true, opacity: 0.15
      })
      const ringMesh = new THREE.Mesh(ring, ringMat)
      ringMesh.rotation.x = Math.PI / 2
      this.scene.add(ringMesh)
    })

    // Central star
    const starGeo = new THREE.SphereGeometry(0.3, 32, 32)
    const starMat = new THREE.MeshStandardMaterial({
      color: '#FFFFFF', emissive: '#00F5FF', emissiveIntensity: 5,
      roughness: 0, metalness: 0
    })
    this.scene.add(new THREE.Mesh(starGeo, starMat))

    const ptLight = new THREE.PointLight('#00F5FF', 5, 20)
    this.scene.add(ptLight)
  }

  private buildStarField() {
    const count = 5000
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      const r     = 15 + Math.random() * 30
      pos[i*3]     = r * Math.sin(phi) * Math.cos(theta)
      pos[i*3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i*3 + 2] = r * Math.cos(phi)
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const mat = new THREE.PointsMaterial({ color: '#EAFBFF', size: 0.04, transparent: true, opacity: 0.7 })
    this.scene.add(new THREE.Points(geo, mat))
  }

  private buildNebula() {
    const nebColors = ['#7B61FF', '#00F5FF', '#39FF14']
    nebColors.forEach((c, i) => {
      const count = 2000
      const pos = new Float32Array(count * 3)
      const angle = (i / nebColors.length) * Math.PI * 2
      for (let j = 0; j < count; j++) {
        pos[j*3]     = (Math.random() - 0.5) * 8 + Math.cos(angle) * 4
        pos[j*3 + 1] = (Math.random() - 0.5) * 3
        pos[j*3 + 2] = (Math.random() - 0.5) * 8 + Math.sin(angle) * 4
      }
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      const mat = new THREE.PointsMaterial({
        color: c, size: 0.06,
        transparent: true, opacity: 0.25,
        blending: THREE.AdditiveBlending, depthWrite: false
      })
      this.scene.add(new THREE.Points(geo, mat))
    })
  }

  private onResize = () => {
    const w = window.innerWidth, h = window.innerHeight
    this.camera.aspect = w / h
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(w, h)
    this.composer.setSize(w, h)
  }

  private onMouseMove = (e: MouseEvent) => {
    this.mouseX = (e.clientX / window.innerWidth  - 0.5) * 0.5
    this.mouseY = (e.clientY / window.innerHeight - 0.5) * 0.5
  }

  animate() {
    const tick = () => {
      this.animId = requestAnimationFrame(tick)
      const t = this.clock.getElapsedTime()

      if (this.galaxyMat) this.galaxyMat.uniforms.uTime.value = t

      // Orbit planets
      this.planets.forEach(p => {
        const d = p.userData
        d.angle += d.speed * 0.01
        p.position.x = Math.cos(d.angle) * d.radius
        p.position.z = Math.sin(d.angle) * d.radius
        p.rotation.y += 0.02
      })

      // Subtle camera drift toward mouse
      this.camera.position.x += (this.mouseX * 0.5 - this.camera.position.x) * 0.03
      this.camera.position.y += (-this.mouseY * 0.5 + 3.5 - this.camera.position.y) * 0.03

      this.controls.update()
      this.composer.render()
    }
    tick()
  }

  dispose() {
    if (this.animId !== null) cancelAnimationFrame(this.animId)
    window.removeEventListener('resize', this.onResize)
    window.removeEventListener('mousemove', this.onMouseMove)
    this.renderer.dispose()
    this.composer.dispose()
  }
}
