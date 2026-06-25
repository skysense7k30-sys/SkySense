"use client";
import { useEffect, useRef } from "react";

export default function MotorDiagram3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    let THREE, renderer, scene, camera;
    const motors = [];

    async function init() {
      THREE = await import("three");
      const el = mountRef.current;
      if (!el) return;

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(el.clientWidth, el.clientHeight);
      renderer.setClearColor(0x000000, 0);
      el.appendChild(renderer.domElement);

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(40, el.clientWidth / el.clientHeight, 0.1, 50);
      camera.position.set(0, 5.5, 5.5);
      camera.lookAt(0, 0, 0);

      scene.add(new THREE.AmbientLight(0xffffff, 0.3));
      const d = new THREE.DirectionalLight(0xc6f135, 2);
      d.position.set(3, 5, 3);
      scene.add(d);
      const d2 = new THREE.DirectionalLight(0x7b6cff, 1.5);
      d2.position.set(-3, 2, -2);
      scene.add(d2);

      const armMat = new THREE.MeshStandardMaterial({ color: 0x1a1a2e, metalness: 0.7, roughness: 0.3 });
      const armGeo = new THREE.CylinderGeometry(0.06, 0.045, 2.2, 8);
      armGeo.rotateZ(Math.PI / 2);

      [Math.PI / 4, -Math.PI / 4, (3 * Math.PI) / 4, (-3 * Math.PI) / 4].forEach((rot) => {
        const arm = new THREE.Mesh(armGeo, armMat);
        arm.rotation.y = rot;
        scene.add(arm);
      });

      const centerGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.2, 6);
      const centerMat = new THREE.MeshStandardMaterial({ color: 0x111120, metalness: 0.9, roughness: 0.15 });
      scene.add(new THREE.Mesh(centerGeo, centerMat));

      const motorConfigs = [
        { pos: [-1.1, 0, -1.1], color: 0xc6f135, dir: -1 },
        { pos: [1.1, 0, -1.1],  color: 0x7b6cff, dir:  1 },
        { pos: [-1.1, 0, 1.1],  color: 0x7b6cff, dir:  1 },
        { pos: [1.1, 0, 1.1],   color: 0xc6f135, dir: -1 },
      ];

      motorConfigs.forEach(({ pos, color, dir }) => {
        const mGeo = new THREE.CylinderGeometry(0.18, 0.16, 0.18, 12);
        const mMat = new THREE.MeshStandardMaterial({ color: 0x252535, metalness: 0.95, roughness: 0.1 });
        const m = new THREE.Mesh(mGeo, mMat);
        m.position.set(...pos);
        scene.add(m);

        const ringGeo = new THREE.TorusGeometry(0.17, 0.02, 8, 24);
        const ringMat = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.6, metalness: 0.8, roughness: 0.1 });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.position.set(pos[0], pos[1] + 0.1, pos[2]);
        ring.rotation.x = Math.PI / 2;
        scene.add(ring);

        const pg = new THREE.Group();
        pg.position.set(pos[0], pos[1] + 0.14, pos[2]);
        scene.add(pg);

        for (let b = 0; b < 2; b++) {
          const bGeo = new THREE.BoxGeometry(0.7, 0.01, 0.09);
          bGeo.translate(0.35, 0, 0);
          const bMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.3, roughness: 0.7 });
          const blade = new THREE.Mesh(bGeo, bMat);
          blade.rotation.y = b * Math.PI;
          pg.add(blade);
        }

        const discGeo = new THREE.CylinderGeometry(0.75, 0.75, 0.005, 32);
        const discMat = new THREE.MeshStandardMaterial({ color, transparent: true, opacity: 0.1, emissive: color, emissiveIntensity: 0.5 });
        const disc = new THREE.Mesh(discGeo, discMat);
        disc.position.set(pos[0], pos[1] + 0.14, pos[2]);
        scene.add(disc);

        motors.push({ pg, dir });
      });

      const grid = new THREE.GridHelper(6, 12, 0x1a1a30, 0x111120);
      grid.position.y = -0.5;
      grid.material.transparent = true;
      grid.material.opacity = 0.35;
      scene.add(grid);

      const animate = () => {
        requestAnimationFrame(animate);
        motors.forEach(({ pg, dir }) => { pg.rotation.y += 0.18 * dir; });
        renderer.render(scene, camera);
      };
      animate();

      const onResize = () => {
        if (!el) return;
        camera.aspect = el.clientWidth / el.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(el.clientWidth, el.clientHeight);
      };
      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
        renderer.dispose();
        if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
      };
    }

    const cleanup = init();
    return () => { cleanup.then((fn) => fn && fn()); };
  }, []);

  return (
    <div ref={mountRef} style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }} />
  );
}
