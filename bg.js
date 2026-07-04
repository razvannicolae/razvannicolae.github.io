// Ambient 3D backdrop — a slowly rotating faded wireframe geometry.
// Loaded as a module from a CDN so the site stays build-free.
// Gracefully does nothing if WebGL / Three.js is unavailable.

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

const canvas = document.getElementById("bg-canvas");
if (canvas) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  try {
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 7;

    // Sit slightly right of center so it stays clear of the hero text.
    const group = new THREE.Group();
    group.position.x = 2.8;
    scene.add(group);

    const color = new THREE.Color(0x4f7fd6);

    function wireframe(radius, detail, opacity) {
      const geo = new THREE.IcosahedronGeometry(radius, detail);
      const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity });
      return new THREE.LineSegments(new THREE.WireframeGeometry(geo), mat);
    }

    const inner = wireframe(2.3, 1, 0.55); // faceted core
    const outer = wireframe(3.4, 1, 0.16); // faint halo shell
    group.add(inner, outer);

    // Glowing vertices on the core
    const pts = new THREE.Points(
      new THREE.IcosahedronGeometry(2.3, 1),
      new THREE.PointsMaterial({ color, size: 0.07, transparent: true, opacity: 0.85 })
    );
    inner.add(pts);

    // Gentle pointer parallax
    let mx = 0, my = 0, tmx = 0, tmy = 0;
    window.addEventListener("pointermove", (e) => {
      tmx = e.clientX / window.innerWidth - 0.5;
      tmy = e.clientY / window.innerHeight - 0.5;
    });

    function resize() {
      const w = window.innerWidth, h = window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    window.addEventListener("resize", resize);
    resize();

    function frame(t) {
      mx += (tmx - mx) * 0.04;
      my += (tmy - my) * 0.04;
      inner.rotation.x = t * 0.00008 + my * 0.5;
      inner.rotation.y = t * 0.00012 + mx * 0.5;
      outer.rotation.x = -t * 0.00005;
      outer.rotation.y = -t * 0.00009;
      group.scale.setScalar(1 + Math.sin(t * 0.0004) * 0.045);
      renderer.render(scene, camera);
      if (!reduceMotion) requestAnimationFrame(frame);
    }

    if (reduceMotion) {
      renderer.render(scene, camera);
    } else {
      requestAnimationFrame(frame);
    }
  } catch (err) {
    /* WebGL unsupported — the CSS orbs remain as the backdrop. */
  }
}
