"use client";
import { useEffect, useRef } from "react";

export default function DroneCanvas() {
  const mountRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    let THREE, renderer, scene, camera, drone, particles;

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
      camera = new THREE.PerspectiveCamera(45, el.clientWidth / el.clientHeight, 0.1, 100);
      camera.position.set(0, 2.5, 7);
      camera.lookAt(0, 0, 0);

      const ambient = new THREE.AmbientLight(0xffffff, 0.15);
      scene.add(ambient);
      const key = new THREE.DirectionalLight(0xc6f135, 2.5);
      key.position.set(3, 5, 3);
      scene.add(key);
      const fill = new THREE.DirectionalLight(0x7b6cff, 1.2);
      fill.position.set(-4, 2, -2);
      scene.add(fill);
      const rim = new THREE.PointLight(0xff6b35, 1.5, 12);
      rim.position.set(0, -2, 4);
      scene.add(rim);

      drone = new THREE.Group();
      scene.add(drone);

      const bodyGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.18, 6);
      const bodyMat = new THREE.MeshStandardMaterial({ color: 0x111120, metalness: 0.9, roughness: 0.2 });
      drone.add(new THREE.Mesh(bodyGeo, bodyMat));

      const fcGeo = new THREE.BoxGeometry(0.28, 0.04, 0.28);
      const fcMat = new THREE.MeshStandardMaterial({ color: 0x1a3a1a, metalness: 0.4, roughness: 0.6 });
      const fc = new THREE.Mesh(fcGeo, fcMat);
      fc.position.y = 0.12;
      drone.add(fc);

      const camGeo = new THREE.BoxGeometry(0.14, 0.1, 0.1);
      const camMat = new THREE.MeshStandardMaterial({ color: 0x080810, metalness: 0.8, roughness: 0.15 });
      const cam = new THREE.Mesh(camGeo, camMat);
      cam.position.set(0, -0.02, 0.44);
      drone.add(cam);

      const lensGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.04, 16);
      lensGeo.rotateX(Math.PI / 2);
      const lensMat = new THREE.MeshStandardMaterial({ color: 0x000033, metalness: 0.1, roughness: 0.05, emissive: 0x000044 });
      const lens = new THREE.Mesh(lensGeo, lensMat);
      lens.position.set(0, -0.02, 0.5);
      drone.add(lens);

      const gpsGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.04, 16);
      const gpsMat = new THREE.MeshStandardMaterial({ color: 0x1c1c30, metalness: 0.5, roughness: 0.4 });
      const gps = new THREE.Mesh(gpsGeo, gpsMat);
      gps.position.y = 0.16;
      drone.add(gps);

      const armDirs = [
        { x: -1, z: -1, cwColor: 0xc6f135 },
        { x:  1, z: -1, cwColor: 0x7b6cff },
        { x: -1, z:  1, cwColor: 0x7b6cff },
        { x:  1, z:  1, cwColor: 0xc6f135 },
      ];
      const propGroups = [];

      armDirs.forEach((d) => {
        const angle = Math.atan2(d.x, d.z);
        const armLen = 0.85;

        const armGeo = new THREE.CylinderGeometry(0.035, 0.025, armLen, 8);
        armGeo.rotateZ(Math.PI / 2);
        const armMat = new THREE.MeshStandardMaterial({ color: 0x1a1a2e, metalness: 0.7, roughness: 0.3 });
        const arm = new THREE.Mesh(armGeo, armMat);
        arm.rotation.y = angle;
        arm.position.set(d.x * armLen * 0.42, 0, d.z * armLen * 0.42);
        drone.add(arm);

        const motorGeo = new THREE.CylinderGeometry(0.1, 0.09, 0.12, 12);
        const motorMat = new THREE.MeshStandardMaterial({ color: 0x252535, metalness: 0.95, roughness: 0.1 });
        const motor = new THREE.Mesh(motorGeo, motorMat);
        motor.position.set(d.x * armLen * 0.84, 0, d.z * armLen * 0.84);
        drone.add(motor);

        const ringGeo = new THREE.TorusGeometry(0.09, 0.012, 8, 24);
        const ringMat = new THREE.MeshStandardMaterial({
          color: d.cwColor, metalness: 0.8, roughness: 0.2,
          emissive: d.cwColor, emissiveIntensity: 0.4,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.position.set(d.x * armLen * 0.84, 0.07, d.z * armLen * 0.84);
        ring.rotation.x = Math.PI / 2;
        drone.add(ring);

        const propGroup = new THREE.Group();
        propGroup.position.set(d.x * armLen * 0.84, 0.1, d.z * armLen * 0.84);
        drone.add(propGroup);
        propGroups.push({ group: propGroup, dir: d.x * d.z > 0 ? 1 : -1 });

        for (let b = 0; b < 2; b++) {
          const bladeGeo = new THREE.BoxGeometry(0.5, 0.008, 0.06);
          bladeGeo.translate(0.25, 0, 0);
          const bladeMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.3, roughness: 0.7, transparent: true, opacity: 0.9 });
          const blade = new THREE.Mesh(bladeGeo, bladeMat);
          blade.rotation.y = (b * Math.PI) / 1;
          propGroup.add(blade);
        }

        const discGeo = new THREE.CylinderGeometry(0.52, 0.52, 0.005, 32);
        const discMat = new THREE.MeshStandardMaterial({
          color: d.cwColor, transparent: true, opacity: 0.07,
          emissive: d.cwColor, emissiveIntensity: 0.3,
        });
        const disc = new THREE.Mesh(discGeo, discMat);
        disc.position.set(d.x * armLen * 0.84, 0.1, d.z * armLen * 0.84);
        drone.add(disc);
      });

      const gearMat = new THREE.MeshStandardMaterial({ color: 0x0e0e18, metalness: 0.6, roughness: 0.4 });
      [[-0.5, 0.5], [0.5, 0.5], [-0.5, -0.5], [0.5, -0.5]].forEach(([x, z]) => {
        const legGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.35, 8);
        const leg = new THREE.Mesh(legGeo, gearMat);
        leg.position.set(x, -0.26, z);
        drone.add(leg);
      });
      const skidGeo = new THREE.CylinderGeometry(0.012, 0.012, 1.2, 8);
      skidGeo.rotateZ(Math.PI / 2);
      [-0.5, 0.5].forEach((z) => {
        const skid = new THREE.Mesh(skidGeo, gearMat);
        skid.position.set(0, -0.44, z);
        drone.add(skid);
      });

      const pCount = 200;
      const pGeo = new THREE.BufferGeometry();
      const positions = new Float32Array(pCount * 3);
      const colors = new Float32Array(pCount * 3);
      const accentColors = [
        new THREE.Color(0xc6f135), new THREE.Color(0x7b6cff),
        new THREE.Color(0xff6b35), new THREE.Color(0x00d4aa),
      ];
      for (let i = 0; i < pCount; i++) {
        positions[i * 3]     = (Math.random() - 0.5) * 14;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 14;
        const c = accentColors[Math.floor(Math.random() * accentColors.length)];
        colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
      }
      pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      pGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      const pMat = new THREE.PointsMaterial({ size: 0.04, vertexColors: true, transparent: true, opacity: 0.6 });
      particles = new THREE.Points(pGeo, pMat);
      scene.add(particles);

      const gridHelper = new THREE.GridHelper(14, 20, 0x1a1a30, 0x111120);
      gridHelper.position.y = -2;
      gridHelper.material.transparent = true;
      gridHelper.material.opacity = 0.4;
      scene.add(gridHelper);

      let t = 0;
      const animate = () => {
        rafRef.current = requestAnimationFrame(animate);
        t += 0.012;
        drone.rotation.y = t * 0.25;
        drone.position.y = Math.sin(t * 0.8) * 0.15;
        propGroups.forEach(({ group, dir }) => { group.rotation.y += 0.22 * dir; });
        particles.rotation.y += 0.0008;
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
        cancelAnimationFrame(rafRef.current);
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
