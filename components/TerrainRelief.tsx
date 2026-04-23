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
    scene.fog = new THREE.FogExp2(0x12181f, 0.1);

    const camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 100);
    camera.position.set(0, 1.7, 3.4);
    camera.lookAt(0, 0.25, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambient);

    const sun = new THREE.DirectionalLight(0xfff8f0, 1.5);
    sun.position.set(3, 5, 2);
    scene.add(sun);

    const fill = new THREE.DirectionalLight(0x8fb8d0, 0.35);
    fill.position.set(-3, 2, -3);
    scene.add(fill);

    const gold = new THREE.DirectionalLight(0xb8935a, 0.2);
    gold.position.set(0, -1, 3);
    scene.add(gold);

    const pivot = new THREE.Group();
    scene.add(pivot);

    const mat = new THREE.MeshStandardMaterial({
      color: 0x7a8fa0,
      roughness: 0.9,
      metalness: 0.02,
    });

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
        geometry.computeVertexNormals();

        const wireMat = new THREE.LineBasicMaterial({ color: 0xb8935a, opacity: 0.07, transparent: true });
        const wireGeo = new THREE.WireframeGeometry(geometry);
        const wireframe = new THREE.LineSegments(wireGeo, wireMat);

        const mesh = new THREE.Mesh(geometry, mat);
        pivot.add(mesh);
        pivot.add(wireframe);
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
      const colors: number[] = [];

      for (let i = 0; i < pos.count; i++) {
        const xn = pos.getX(i) / 2;
        const zn = pos.getZ(i) / 2;
        const t = Math.max(0, (1 - zn) / 2);

        const r1 = Math.exp(-((xn - 0.08) ** 2) * 2.8) * t * 1.35;
        const r2 = Math.exp(-((xn + 0.38) ** 2) * 5.2) * t * 0.85;
        const r3 = Math.exp(-((xn - 0.58) ** 2) * 6.5) * t * 0.65;
        const d = (Math.sin(xn * 8.7 + zn * 6.3) * 0.038 + Math.sin(xn * 3.2 - zn * 9.1) * 0.048) * t;

        const hv = Math.max(0, r1 + r2 + r3 + d);
        pos.setY(i, hv);

        const lh = hv / 1.35;
        if (lh < 0.04) colors.push(0.18, 0.24, 0.32);
        else if (lh < 0.25) { const f = (lh - 0.04) / 0.21; colors.push(0.3 + f * 0.12, 0.36 + f * 0.06, 0.42); }
        else if (lh < 0.65) { const f = (lh - 0.25) / 0.4; colors.push(0.42 + f * 0.14, 0.42, 0.46); }
        else colors.push(0.62, 0.62, 0.65);
      }

      geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
      geo.computeVertexNormals();

      const vMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.9, metalness: 0.02 });
      const mesh = new THREE.Mesh(geo, vMat);
      mesh.position.y = -0.35;

      const wireGeo = new THREE.WireframeGeometry(geo);
      const wireMat = new THREE.LineBasicMaterial({ color: 0xb8935a, opacity: 0.07, transparent: true });
      const wireframe = new THREE.LineSegments(wireGeo, wireMat);
      wireframe.position.y = -0.35;

      pivot.add(mesh);
      pivot.add(wireframe);
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
      mat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
}
