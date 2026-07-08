"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";

function disposeObject3D(obj) {
  obj.traverse((child) => {
    if (child.geometry) child.geometry.dispose();
    if (child.material) {
      const mats = Array.isArray(child.material) ? child.material : [child.material];
      mats.forEach((m) => {
        Object.values(m).forEach((v) => {
          if (v && v.isTexture) v.dispose();
        });
        m.dispose();
      });
    }
  });
}

export default function HeroModel({ onReady }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let cancelled = false;
    let model = null;

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

    // ── Fixed rotation + auto-spin (no pointer interaction) ─────────────
    let rotY = -0.3;
    const rotX = 0.08;
    const autoSpin = 0.004;

    // Model is purely decorative now — no cursor affordance, no pointer
    // listeners, no drag/hover handling.
    mount.style.pointerEvents = "none";

    // ── Load model ──────────────────────────────────────────────────────
    const loader = new GLTFLoader();

    loader.load(
      "/models/scene.glb",
      (gltf) => {
        if (cancelled) {
          // Component unmounted before load finished — dispose immediately,
          // don't leak GPU memory or a dangling WebGL context.
          disposeObject3D(gltf.scene);
          return;
        }
        model = gltf.scene;
        model.scale.setScalar(1.6);
        model.position.set(0.4, -0.2, 0);
        model.rotation.set(rotX, rotY, 0);
        scene.add(model);
        onReady?.();
      },
      undefined,
      (err) => {
        console.error("GLB load error:", err);
        // Reveal the section anyway instead of leaving it permanently blank.
        if (!cancelled) onReady?.();
      }
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

    const animate = () => {
      raf = requestAnimationFrame(animate);

      if (model) {
        rotY += autoSpin;
        model.rotation.x = rotX;
        model.rotation.y = rotY;
      }

      renderer.render(scene, camera);
    };
    animate();

    // ── Cleanup ─────────────────────────────────────────────────────────
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);

      if (model) {
        disposeObject3D(model);
        scene.remove(model);
      }

      renderer.dispose();
      // Explicitly force the GL context to be released so the browser's
      // live-context count doesn't creep up across route changes / remounts.
      renderer.forceContextLoss();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [onReady]);

  return (
    <div
      ref={mountRef}
      style={{ width: "100%", height: "100%", background: "transparent" }}
    />
  );
}