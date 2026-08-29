import { useEffect, useRef, useState } from "react";

const imagePaths = [
  "assets/threshold-garden.webp",
  "assets/still-garden.webp",
  "assets/afterlight-workshop.webp",
];

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform sampler2D uTextureA;
  uniform sampler2D uTextureB;
  uniform sampler2D uTextureC;
  uniform float uProgress;
  uniform float uTime;
  uniform float uViewAspect;
  uniform vec2 uPointer;
  varying vec2 vUv;

  vec2 coverUv(vec2 uv, float imageAspect, float viewAspect) {
    if (viewAspect > imageAspect) {
      float scale = imageAspect / viewAspect;
      uv.y = (uv.y - 0.5) * scale + 0.5;
    } else {
      float scale = viewAspect / imageAspect;
      uv.x = (uv.x - 0.5) * scale + 0.5;
    }
    return uv;
  }

  float random(vec2 position) {
    return fract(sin(dot(position, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    float imageAspect = 1.6;
    vec2 parallax = uPointer * 0.012;
    vec2 uv = coverUv(vUv + parallax, imageAspect, uViewAspect);

    vec4 sceneA = texture2D(uTextureA, uv);
    vec4 sceneB = texture2D(uTextureB, uv);
    vec4 sceneC = texture2D(uTextureC, uv);

    float intoGarden = smoothstep(0.12, 0.42, uProgress);
    float intoAfterlight = smoothstep(0.58, 0.84, uProgress);
    vec4 scene = mix(sceneA, sceneB, intoGarden);
    scene = mix(scene, sceneC, intoAfterlight);

    float vignette = smoothstep(0.92, 0.26, distance(vUv, vec2(0.5)));
    float grain = (random(vUv * (uTime + 180.0)) - 0.5) * 0.035;
    scene.rgb *= mix(0.58, 1.0, vignette);
    scene.rgb += grain;
    scene.rgb *= 0.9;

    gl_FragColor = vec4(scene.rgb, 1.0);
  }
`;

export function AtmosphereCanvas({ motionEnabled, reducedMotion }) {
  const canvasRef = useRef(null);
  const motionEnabledRef = useRef(motionEnabled);
  const reducedMotionRef = useRef(reducedMotion);
  const startRenderRef = useRef(null);
  const [webglReady, setWebglReady] = useState(false);

  useEffect(() => {
    motionEnabledRef.current = motionEnabled;
    reducedMotionRef.current = reducedMotion;
    if (motionEnabled && !reducedMotion) startRenderRef.current?.();
  }, [motionEnabled, reducedMotion]);

  useEffect(() => {
    let disposed = false;
    let frameId = 0;
    let removeListeners = () => {};

    async function initialize() {
      try {
        const probe = document.createElement("canvas");
        const supportsWebgl = probe.getContext("webgl2") || probe.getContext("webgl");
        if (!supportsWebgl) {
          setWebglReady(false);
          return;
        }

        const THREE = await import("three");
        if (disposed || !canvasRef.current) return;

        const renderer = new THREE.WebGLRenderer({
          canvas: canvasRef.current,
          alpha: false,
          antialias: false,
          powerPreference: "high-performance",
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 720 ? 1 : 1.5));
        renderer.setSize(window.innerWidth, window.innerHeight, false);

        const scene = new THREE.Scene();
        const camera = new THREE.Camera();
        camera.position.z = 1;

        const loader = new THREE.TextureLoader();
        const textures = await Promise.all(
          imagePaths.map((path) => loader.loadAsync(`${import.meta.env.BASE_URL}${path}`)),
        );
        if (disposed) {
          renderer.dispose();
          return;
        }

        textures.forEach((texture) => {
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;
        });

        const uniforms = {
          uTextureA: { value: textures[0] },
          uTextureB: { value: textures[1] },
          uTextureC: { value: textures[2] },
          uProgress: { value: 0 },
          uTime: { value: 1 },
          uViewAspect: { value: window.innerWidth / window.innerHeight },
          uPointer: { value: new THREE.Vector2(0, 0) },
        };

        const backdrop = new THREE.Mesh(
          new THREE.PlaneGeometry(2, 2),
          new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms, depthTest: false }),
        );
        scene.add(backdrop);

        const mobile = window.innerWidth < 720;
        const rainCount = mobile ? 130 : 340;
        const rainPositions = new Float32Array(rainCount * 6);
        const rainSpeeds = new Float32Array(rainCount);

        for (let index = 0; index < rainCount; index += 1) {
          const offset = index * 6;
          const x = Math.random() * 2.2 - 1.1;
          const y = Math.random() * 2.2 - 1.1;
          const length = 0.035 + Math.random() * 0.055;
          rainPositions[offset] = x;
          rainPositions[offset + 1] = y;
          rainPositions[offset + 2] = 0.2;
          rainPositions[offset + 3] = x - 0.018;
          rainPositions[offset + 4] = y - length;
          rainPositions[offset + 5] = 0.2;
          rainSpeeds[index] = 0.003 + Math.random() * 0.006;
        }

        const rainGeometry = new THREE.BufferGeometry();
        rainGeometry.setAttribute("position", new THREE.BufferAttribute(rainPositions, 3));
        const rain = new THREE.LineSegments(
          rainGeometry,
          new THREE.LineBasicMaterial({
            color: 0xb6c4cd,
            transparent: true,
            opacity: mobile ? 0.1 : 0.14,
            depthTest: false,
          }),
        );
        scene.add(rain);

        const emberCount = mobile ? 12 : 28;
        const emberPositions = new Float32Array(emberCount * 3);
        const emberSpeeds = new Float32Array(emberCount);
        for (let index = 0; index < emberCount; index += 1) {
          const offset = index * 3;
          emberPositions[offset] = Math.random() * 2 - 1;
          emberPositions[offset + 1] = Math.random() * 1.4 - 0.9;
          emberPositions[offset + 2] = 0.25;
          emberSpeeds[index] = 0.0007 + Math.random() * 0.0014;
        }

        const emberGeometry = new THREE.BufferGeometry();
        emberGeometry.setAttribute("position", new THREE.BufferAttribute(emberPositions, 3));
        const embers = new THREE.Points(
          emberGeometry,
          new THREE.PointsMaterial({
            color: 0xe25d47,
            transparent: true,
            opacity: 0.38,
            size: mobile ? 0.006 : 0.008,
            depthTest: false,
          }),
        );
        scene.add(embers);

        const pointerTarget = new THREE.Vector2(0, 0);
        const clock = new THREE.Clock();

        const updateScroll = () => {
          const total = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
          uniforms.uProgress.value = Math.min(Math.max(window.scrollY / total, 0), 1);
        };

        const updatePointer = (event) => {
          pointerTarget.set(event.clientX / window.innerWidth - 0.5, 0.5 - event.clientY / window.innerHeight);
        };

        const resize = () => {
          renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 720 ? 1 : 1.5));
          renderer.setSize(window.innerWidth, window.innerHeight, false);
          uniforms.uViewAspect.value = window.innerWidth / window.innerHeight;
        };

        const render = () => {
          frameId = 0;
          const animate = motionEnabledRef.current && !reducedMotionRef.current;
          if (animate) {
            uniforms.uTime.value = clock.getElapsedTime() * 45;
            uniforms.uPointer.value.lerp(pointerTarget, 0.035);

            const rainAttribute = rainGeometry.attributes.position;
            for (let index = 0; index < rainCount; index += 1) {
              const offset = index * 6;
              rainAttribute.array[offset + 1] -= rainSpeeds[index];
              rainAttribute.array[offset + 4] -= rainSpeeds[index];
              if (rainAttribute.array[offset + 4] < -1.1) {
                const reset = 2.2;
                rainAttribute.array[offset + 1] += reset;
                rainAttribute.array[offset + 4] += reset;
              }
            }
            rainAttribute.needsUpdate = true;

            const emberAttribute = emberGeometry.attributes.position;
            for (let index = 0; index < emberCount; index += 1) {
              const offset = index * 3;
              emberAttribute.array[offset + 1] += emberSpeeds[index];
              emberAttribute.array[offset] += Math.sin(uniforms.uTime.value * 0.018 + index) * 0.00025;
              if (emberAttribute.array[offset + 1] > 0.65) {
                emberAttribute.array[offset + 1] = -0.9;
              }
            }
            emberAttribute.needsUpdate = true;
          }

          renderer.render(scene, camera);
          if (animate) frameId = window.requestAnimationFrame(render);
        };

        const startRender = () => {
          if (!frameId) render();
        };

        const handleScroll = () => {
          updateScroll();
          startRender();
        };

        const handleResize = () => {
          resize();
          startRender();
        };

        startRenderRef.current = startRender;

        updateScroll();
        resize();
        setWebglReady(true);

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleResize);
        if (window.matchMedia("(pointer: fine)").matches) {
          window.addEventListener("pointermove", updatePointer, { passive: true });
        }

        startRender();

        removeListeners = () => {
          window.removeEventListener("scroll", handleScroll);
          window.removeEventListener("resize", handleResize);
          window.removeEventListener("pointermove", updatePointer);
          window.cancelAnimationFrame(frameId);
          rainGeometry.dispose();
          rain.material.dispose();
          emberGeometry.dispose();
          embers.material.dispose();
          backdrop.geometry.dispose();
          backdrop.material.dispose();
          textures.forEach((texture) => texture.dispose());
          renderer.dispose();
          startRenderRef.current = null;
        };
      } catch {
        setWebglReady(false);
      }
    }

    initialize();

    return () => {
      disposed = true;
      startRenderRef.current = null;
      removeListeners();
    };
  }, []);

  return (
    <div className={webglReady ? "atmosphere is-ready" : "atmosphere"} aria-hidden="true">
      <img
        className="atmosphere__fallback"
        src={`${import.meta.env.BASE_URL}assets/threshold-garden.webp`}
        alt=""
      />
      <canvas ref={canvasRef} className="atmosphere__canvas" />
    </div>
  );
}
