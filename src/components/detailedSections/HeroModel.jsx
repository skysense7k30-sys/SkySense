"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function HeroModel({ onReady }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Renderer ────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    // ── Scene / Camera ──────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      38,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 4.2);

    // ── Lights ──────────────────────────────────────────────────────────
    const dir1 = new THREE.DirectionalLight("#e8e4dc", 1.1);
    dir1.position.set(-4, 6, 3);
    scene.add(dir1);

    const dir2 = new THREE.DirectionalLight("#b8c8d8", 0.4);
    dir2.position.set(5, 2, -4);
    scene.add(dir2);

    const dir3 = new THREE.DirectionalLight("#ffffff", 0.08);
    dir3.position.set(0, -4, 2);
    scene.add(dir3);

    scene.add(new THREE.AmbientLight("#ffffff", 0.6));

    // ── Drag state ──────────────────────────────────────────────────────
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;

    let rotY = -0.3;
    let rotX = 0.08;

    let velX = 0;
    let velY = 0;

    let autoSpin = 0.004;

    const onPointerDown = (e) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
      velX = 0;
      velY = 0;
      autoSpin = 0;
      mount.style.cursor = "grabbing";
      mount.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;

      velX = dy * 0.003;
      velY = dx * 0.003;

      rotX += velX;
      rotY += velY;

      rotX = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, rotX));

      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
      mount.style.cursor = "grab";
    };

    mount.style.cursor = "grab";
    mount.style.pointerEvents = "auto";
    mount.addEventListener("pointerdown", onPointerDown);
    mount.addEventListener("pointermove", onPointerMove);
    mount.addEventListener("pointerup", onPointerUp);
    mount.addEventListener("pointercancel", onPointerUp);

    // ── Load model ──────────────────────────────────────────────────────
    const loader = new GLTFLoader();
    let model = null;

    loader.load(
      "/models/scene.glb",
      (gltf) => {
        model = gltf.scene;
        model.scale.setScalar(1.6);
        model.position.set(0.4, -0.2, 0);
        model.rotation.set(rotX, rotY, 0);
        scene.add(model);
        onReady?.();
      },
      undefined,
      (err) => console.error("GLB load error:", err)
    );

    // ── Resize ──────────────────────────────────────────────────────────
    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    // ── Render loop ─────────────────────────────────────────────────────
    let raf;
    const damping = 0.88;

    const animate = () => {
      raf = requestAnimationFrame(animate);

      if (model) {
        if (!isDragging) {
          velX *= damping;
          velY *= damping;
          rotX += velX;
          rotY += velY;

          rotX = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, rotX));

          if (Math.abs(velY) < 0.0002) {
            autoSpin = THREE.MathUtils.lerp(autoSpin, 0.004, 0.02);
            rotY += autoSpin;
          }
        }

        model.rotation.x = rotX;
        model.rotation.y = rotY;
      }

      renderer.render(scene, camera);
    };
    animate();

    // ── Cleanup ─────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      mount.removeEventListener("pointerdown", onPointerDown);
      mount.removeEventListener("pointermove", onPointerMove);
      mount.removeEventListener("pointerup", onPointerUp);
      mount.removeEventListener("pointercancel", onPointerUp);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: "100%", height: "100%", background: "transparent" }}
    />
  );
}