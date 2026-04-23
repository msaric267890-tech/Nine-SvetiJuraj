'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';

export default function TerrainRelief() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animId: number;

    const w = container.clientWidth;
    const h = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x12181f);
    scene.fog = new THREE.FogExp2(0x12181f, 0.09);

    const camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 100);
    camera.position.set(0, 1.7, 3.4);
    camera.lookAt(0, 0.25, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    // Realistic shadows
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // Filmic tone mapping for natural stone look
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // Hemisphere light — blue-white sky above, warm earth below
    const hemi = new THREE.HemisphereLight(0xc8dff0, 0x7a6548, 0.7);
    scene.add(hemi);

    // Main sun — warm, angled, casts soft shadows
    const sun = new THREE.DirectionalLight(0xfff2d8, 2.8);
    sun.position.set(5, 7, 3);
    sun.castShadow = true;
    sun.shadow.mapSize.setScalar(2048);
    sun.shadow.camera.left = -4;
    sun.shadow.camera.right = 4;
    sun.shadow.camera.top = 4;
    sun.shadow.camera.bottom = -4;
    sun.shadow.camera.near = 0.5;
    sun.shadow.camera.far = 30;
    sun.shadow.bias = -0.0005;
    sun.shadow.radius = 2;
    scene.add(sun);

    // Cool fill from opposite side — simulates sky bounce
    const fill = new THREE.DirectionalLight(0x8fafc0, 0.5);
    fill.position.set(-4, 2, -2);
    scene.add(fill);

    // Subtle warm backlight from below — simulates ground reflection
    const bounce = new THREE.DirectionalLight(0xc4a87a, 0.15);
    bounce.position.set(0, -2, 2);
    scene.add(bounce);

    const pivot = new THREE.Group();
    scene.add(pivot);

    // Stone material — Mediterranean karst limestone
    const stoneMat = new THREE.MeshStandardMaterial({
      color: 0xa09880,   // warm gray limestone
      roughness: 0.97,   // extremely rough — no specular highlight
      metalness: 0.0,
    });

    function applyMesh(geometry: THREE.BufferGeometry) {
      geometry.computeVertexNormals();
      const mesh = new THREE.Mesh(geometry, stoneMat);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      pivot.add(mesh);
    }

    const loader = new STLLoader();
    loader.load(
      '/terrain.stl',
      (geometry) => {
        geometry.computeBoundingBox();
        const box = geometry.boundingBox!;
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 3 / maxDim;

        geometry.translate(-center.x, -center.y, -center.z);
        geometry.scale(scale, scale, scale);
        geometry.rotateX(-Math.PI / 2);

        applyMesh(geometry);
      },
      undefined,
      (err) => {
        console.warn('STL not found, using procedural terrain', err);
        loadProcedural();
      }
    );

    function loadProcedural() {
      const seg = 110;
      const geo = new THREE.PlaneGeometry(4, 4, seg, seg);
      geo.rotateX(-Math.PI / 2);

      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const xn = pos.getX(i) / 2;
        const zn = pos.getZ(i) / 2;
        const t = Math.max(0, (1 - zn) / 2);

        const r1 = Math.exp(-((xn - 0.08) ** 2) * 2.8) * t * 1.35;
        const r2 = Math.exp(-((xn + 0.38) ** 2) * 5.2) * t * 0.85;
        const r3 = Math.exp(-((xn - 0.58) ** 2) * 6.5) * t * 0.65;
        const d = (Math.sin(xn * 8.7 + zn * 6.3) * 0.038 + Math.sin(xn * 3.2 - zn * 9.1) * 0.048) * t;

        pos.setY(i, Math.max(0, r1 + r2 + r3 + d) - 0.35);
      }

      applyMesh(geo);
    }

    const onResize = () => {
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', onResize);

    const animate = () => {
      animId = requestAnimationFrame(animate);
      pivot.rotation.y += 0.004;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      stoneMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
}
