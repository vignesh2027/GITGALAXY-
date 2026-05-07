// GitGalaxy - Three.js Background Scene
export class GalaxyScene {
  constructor(container) {
    this.container = container;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.particles = null;
    this.commitNodes = [];
    this.branchLines = [];
    this.globe = null;
    this.mouseX = 0;
    this.mouseY = 0;
    this.clock = null;
    this.running = false;
    this.THREE = null;
  }

  async init(THREE) {
    this.THREE = THREE;
    this.clock = new THREE.Clock();
    
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x0a0d1a, 0.0008);
    
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
    this.camera.position.set(0, 0, 100);
    
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x0a0d1a, 1);
    this.container.appendChild(this.renderer.domElement);
    this.renderer.domElement.style.position = 'fixed';
    this.renderer.domElement.style.top = '0';
    this.renderer.domElement.style.left = '0';
    this.renderer.domElement.style.zIndex = '0';
    this.renderer.domElement.style.pointerEvents = 'none';
    
    this.createStarField();
    this.createCommitGraph();
    this.createGlobe();
    this.createAmbientLights();
    
    window.addEventListener('mousemove', (e) => {
      this.mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      this.mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });
    
    window.addEventListener('resize', () => this.onResize());
    
    this.running = true;
    this.animate();
  }

  createStarField() {
    const T = this.THREE;
    const count = 3000;
    const geo = new T.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 1500;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1500;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 1500;
      sizes[i] = Math.random() * 2 + 0.5;
    }
    
    geo.setAttribute('position', new T.BufferAttribute(positions, 3));
    geo.setAttribute('size', new T.BufferAttribute(sizes, 1));
    
    const mat = new T.PointsMaterial({
      color: 0x00f5ff,
      size: 1.5,
      transparent: true,
      opacity: 0.6,
      blending: T.AdditiveBlending,
      sizeAttenuation: true
    });
    
    this.particles = new T.Points(geo, mat);
    this.scene.add(this.particles);
  }

  createCommitGraph() {
    const T = this.THREE;
    // Create floating commit nodes connected by branch lines
    const nodeCount = 25;
    const nodeMat = new T.MeshBasicMaterial({ color: 0x00f5ff, transparent: true, opacity: 0.7 });
    const nodeGeo = new T.SphereGeometry(0.8, 8, 8);
    
    let prevPos = null;
    for (let i = 0; i < nodeCount; i++) {
      const mesh = new T.Mesh(nodeGeo, nodeMat.clone());
      const x = (Math.random() - 0.5) * 120;
      const y = (Math.random() - 0.5) * 80;
      const z = (Math.random() - 0.5) * 60 - 30;
      mesh.position.set(x, y, z);
      mesh.userData = { baseY: y, speed: 0.3 + Math.random() * 0.5, phase: Math.random() * Math.PI * 2 };
      this.scene.add(mesh);
      this.commitNodes.push(mesh);
      
      // Connect some nodes with lines
      if (prevPos && Math.random() > 0.3) {
        const lineMat = new T.LineBasicMaterial({ color: 0x00f5ff, transparent: true, opacity: 0.15 });
        const points = [prevPos.clone(), mesh.position.clone()];
        const lineGeo = new T.BufferGeometry().setFromPoints(points);
        const line = new T.Line(lineGeo, lineMat);
        this.scene.add(line);
        this.branchLines.push(line);
      }
      prevPos = mesh.position;
    }
  }

  createGlobe() {
    const T = this.THREE;
    // Wireframe globe
    const globeGeo = new T.IcosahedronGeometry(18, 2);
    const globeMat = new T.MeshBasicMaterial({
      color: 0x00f5ff,
      wireframe: true,
      transparent: true,
      opacity: 0.12
    });
    this.globe = new T.Mesh(globeGeo, globeMat);
    this.globe.position.set(50, -10, -40);
    this.scene.add(this.globe);
    
    // Inner glow sphere
    const innerGeo = new T.IcosahedronGeometry(16, 2);
    const innerMat = new T.MeshBasicMaterial({
      color: 0x00f5ff,
      transparent: true,
      opacity: 0.03,
      side: T.BackSide
    });
    const inner = new T.Mesh(innerGeo, innerMat);
    this.globe.add(inner);
  }

  createAmbientLights() {
    const T = this.THREE;
    const ambient = new T.AmbientLight(0x00f5ff, 0.1);
    this.scene.add(ambient);
    
    const point = new T.PointLight(0x00f5ff, 0.5, 200);
    point.position.set(0, 0, 50);
    this.scene.add(point);
  }

  onResize() {
    if (!this.camera || !this.renderer) return;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate() {
    if (!this.running) return;
    requestAnimationFrame(() => this.animate());
    
    const t = this.clock.getElapsedTime();
    
    // Rotate particles slowly
    if (this.particles) {
      this.particles.rotation.y = t * 0.02;
      this.particles.rotation.x = t * 0.01;
    }
    
    // Globe rotation
    if (this.globe) {
      this.globe.rotation.y = t * 0.1;
      this.globe.rotation.x = Math.sin(t * 0.05) * 0.1;
      // React to mouse
      this.globe.rotation.z = this.mouseX * 0.1;
    }
    
    // Animate commit nodes
    this.commitNodes.forEach(node => {
      node.position.y = node.userData.baseY + Math.sin(t * node.userData.speed + node.userData.phase) * 2;
      node.material.opacity = 0.5 + Math.sin(t * 1.5 + node.userData.phase) * 0.3;
    });
    
    // Camera subtle movement following mouse
    this.camera.position.x += (this.mouseX * 5 - this.camera.position.x) * 0.02;
    this.camera.position.y += (-this.mouseY * 3 - this.camera.position.y) * 0.02;
    this.camera.lookAt(0, 0, 0);
    
    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    this.running = false;
    if (this.renderer) {
      this.renderer.dispose();
      this.container.removeChild(this.renderer.domElement);
    }
  }
  
  // Camera animation for level transitions
  zoomToPoint(x, y, z, duration = 1.5) {
    const startPos = { x: this.camera.position.x, y: this.camera.position.y, z: this.camera.position.z };
    const startTime = performance.now();
    const animate = () => {
      const elapsed = (performance.now() - startTime) / (duration * 1000);
      const t = Math.min(1, elapsed);
      const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      this.camera.position.x = startPos.x + (x - startPos.x) * ease;
      this.camera.position.y = startPos.y + (y - startPos.y) * ease;
      this.camera.position.z = startPos.z + (z - startPos.z) * ease;
      if (t < 1) requestAnimationFrame(animate);
    };
    animate();
  }

  resetCamera() {
    this.zoomToPoint(0, 0, 100, 1.2);
  }
}
