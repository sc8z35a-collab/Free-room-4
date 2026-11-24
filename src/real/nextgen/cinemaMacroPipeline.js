import * as THREE from 'three';

/**
 * ============================================================================
 * NEXT-GEN CINEMA MACRO PIPELINE (WebGL2 Hardware Depth SSAO + Vogel Disc Bokeh DoF)
 * ============================================================================
 * Overturns standard real-time WebGL look by fusing:
 * 1. Hardware DepthTexture reconstruction (zero extra geometry pass)
 * 2. 8-Tap Spiral Screen-Space Contact Ambient Occlusion (micro-crevice grounding)
 * 3. 16-Tap Vogel Golden-Angle Optical Disc Bokeh Depth-of-Field (macro lens realism)
 * 4. Dual-Kawase Soft Tungsten Halation / HDR Bloom
 * 5. AgX-inspired Filmic Tone Mapping + Contrast-Adaptive Sharpening + 35mm Micro-Grain
 */
export class NextGenCinemaMacroPipeline {
  constructor(renderer, width, height, renderScale = 1.0) {
    this.renderer = renderer;
    this.renderScale = renderScale;
    this.fullWidth = Math.max(2, Math.floor(width));
    this.fullHeight = Math.max(2, Math.floor(height));

    const gl = renderer.getContext();
    const canHalfFloat =
      Boolean(gl.getExtension('EXT_color_buffer_half_float')) ||
      Boolean(gl.getExtension('EXT_color_buffer_float'));
    const rtType = canHalfFloat ? THREE.HalfFloatType : THREE.UnsignedByteType;

    const rw = Math.max(2, Math.floor(this.fullWidth * renderScale));
    const rh = Math.max(2, Math.floor(this.fullHeight * renderScale));

    const depthTex = new THREE.DepthTexture(rw, rh);
    depthTex.format = THREE.DepthFormat;
    depthTex.type = THREE.UnsignedIntType;

    this.sceneRT = new THREE.WebGLRenderTarget(rw, rh, {
      type: rtType,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      depthBuffer: true,
      depthTexture: depthTex,
    });

    this.bloomA = new THREE.WebGLRenderTarget(Math.max(2, rw >> 2), Math.max(2, rh >> 2), {
      type: rtType,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      depthBuffer: false,
    });
    this.bloomB = new THREE.WebGLRenderTarget(Math.max(2, rw >> 3), Math.max(2, rh >> 3), {
      type: rtType,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      depthBuffer: false,
    });

    this.fsCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const triGeo = new THREE.BufferGeometry();
    triGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3));
    triGeo.setAttribute('uv', new THREE.BufferAttribute(new Float32Array([0, 0, 2, 0, 0, 2]), 2));

    this.extractMat = new THREE.ShaderMaterial({
      uniforms: {
        tScene: { value: this.sceneRT.texture },
        uTexel: { value: new THREE.Vector2(1 / rw, 1 / rh) },
        uThreshold: { value: 0.88 },
      },
      depthTest: false,
      depthWrite: false,
      vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,
      fragmentShader: `
        uniform sampler2D tScene;
        uniform vec2 uTexel;
        uniform float uThreshold;
        varying vec2 vUv;
        vec3 bright(vec3 c) {
          float l = max(c.r, max(c.g, c.b));
          float knee = 0.28;
          float soft = clamp(l - uThreshold + knee, 0.0, 2.0 * knee);
          soft = (soft * soft) / (4.0 * knee + 0.0001);
          float contrib = max(soft, l - uThreshold) / max(l, 0.0001);
          return c * max(0.0, contrib);
        }
        void main() {
          vec2 d = uTexel * 1.5;
          vec3 c = bright(texture2D(tScene, vUv + vec2(-d.x, -d.y)).rgb);
          c += bright(texture2D(tScene, vUv + vec2( d.x, -d.y)).rgb);
          c += bright(texture2D(tScene, vUv + vec2(-d.x,  d.y)).rgb);
          c += bright(texture2D(tScene, vUv + vec2( d.x,  d.y)).rgb);
          gl_FragColor = vec4(c * 0.25, 1.0);
        }
      `,
    });

    this.blurMat = new THREE.ShaderMaterial({
      uniforms: {
        tInput: { value: this.bloomA.texture },
        uTexel: { value: new THREE.Vector2(4 / rw, 4 / rh) },
      },
      depthTest: false,
      depthWrite: false,
      vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,
      fragmentShader: `
        uniform sampler2D tInput;
        uniform vec2 uTexel;
        varying vec2 vUv;
        void main() {
          vec2 d = uTexel * 1.7;
          vec3 sum = texture2D(tInput, vUv).rgb * 0.24;
          sum += texture2D(tInput, vUv + vec2(-d.x, -d.y)).rgb * 0.11;
          sum += texture2D(tInput, vUv + vec2( d.x, -d.y)).rgb * 0.11;
          sum += texture2D(tInput, vUv + vec2(-d.x,  d.y)).rgb * 0.11;
          sum += texture2D(tInput, vUv + vec2( d.x,  d.y)).rgb * 0.11;
          sum += texture2D(tInput, vUv + vec2(-d.x * 2.0, 0.0)).rgb * 0.08;
          sum += texture2D(tInput, vUv + vec2( d.x * 2.0, 0.0)).rgb * 0.08;
          sum += texture2D(tInput, vUv + vec2(0.0, -d.y * 2.0)).rgb * 0.08;
          sum += texture2D(tInput, vUv + vec2(0.0,  d.y * 2.0)).rgb * 0.08;
          gl_FragColor = vec4(sum, 1.0);
        }
      `,
    });

    this.compositeMat = new THREE.ShaderMaterial({
      uniforms: {
        tScene: { value: this.sceneRT.texture },
        tDepth: { value: this.sceneRT.depthTexture },
        tBloom: { value: this.bloomB.texture },
        uTexel: { value: new THREE.Vector2(1 / rw, 1 / rh) },
        uNear: { value: 0.015 },
        uFar: { value: 120.0 },
        uFocusDist: { value: 0.45 },
        uAperture: { value: 0.012 }, // Optical Bokeh strength
        uAoStrength: { value: 0.52 },
        uBloomStrength: { value: 0.24 },
        uSharpness: { value: 0.36 },
        uWarmth: { value: 0.08 },
        uVignette: { value: 0.24 },
        uFlash: { value: 0.0 },
        uChromatic: { value: 0.0 },
        uGrain: { value: 0.016 },
        uExposure: { value: 1.08 },
        uTime: { value: 0.0 },
      },
      depthTest: false,
      depthWrite: false,
      vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,
      fragmentShader: /* glsl */ `
        uniform sampler2D tScene;
        uniform sampler2D tDepth;
        uniform sampler2D tBloom;
        uniform vec2 uTexel;
        uniform float uNear;
        uniform float uFar;
        uniform float uFocusDist;
        uniform float uAperture;
        uniform float uAoStrength;
        uniform float uBloomStrength;
        uniform float uSharpness;
        uniform float uWarmth;
        uniform float uVignette;
        uniform float uFlash;
        uniform float uChromatic;
        uniform float uGrain;
        uniform float uExposure;
        uniform float uTime;
        varying vec2 vUv;

        float linearDepth(vec2 uv) {
          float z_b = texture2D(tDepth, uv).x;
          float z_n = 2.0 * z_b - 1.0;
          return (2.0 * uNear * uFar) / (uFar + uNear - z_n * (uFar - uNear));
        }

        float hash12(vec2 p) {
          vec3 p3 = fract(vec3(p.xyx) * 0.1031);
          p3 += dot(p3, p3.yzx + 33.33);
          return fract((p3.x + p3.y) * p3.z);
        }

        // AgX-inspired smooth highlight shoulder + rich cinema blacks
        vec3 cinemaTonemap(vec3 x) {
          float a = 2.46, b = 0.04, c = 2.38, d = 0.58, e = 0.14;
          return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
        }

        void main() {
          float centerZ = linearDepth(vUv);

          // 1. 8-Tap Spiral Screen-Space Contact Ambient Occlusion (SSAO)
          float occ = 0.0;
          if (uAoStrength > 0.01 && centerZ < 20.0) {
            float radiusPx = clamp(3.5 / max(0.18, centerZ), 2.5, 14.0);
            float rot = hash12(vUv * 1024.0) * 6.283185;
            for (int i = 0; i < 8; i++) {
              float fi = float(i) + 0.5;
              float ang = fi * 2.39996 + rot;
              float r = sqrt(fi / 8.0) * radiusPx;
              vec2 off = vec2(cos(ang), sin(ang)) * uTexel * r;
              float sampleZ = linearDepth(vUv + off);
              float diff = centerZ - sampleZ;
              // Occlude micro-crevices (0.8mm .. 65mm depth delta) without haloing across silhouettes!
              float rangeCheck = smoothstep(0.085, 0.012, abs(diff));
              occ += step(0.0012, diff) * rangeCheck;
            }
            occ = clamp((occ / 8.0) * uAoStrength * 1.45, 0.0, 0.58);
          }

          // 2. Physically-Based 12-Tap Vogel Disc Optical Bokeh Depth-of-Field!
          float coc = clamp(abs(centerZ - uFocusDist) / max(0.12, uFocusDist) * uAperture * 420.0, 0.0, 9.5);
          // Keep sharp focus zone generous around focal target so text/PCB traces stay razor-crisp!
          coc = max(0.0, coc - 1.15);

          vec3 col = texture2D(tScene, vUv).rgb;

          if (coc > 0.18) {
            vec3 acc = col;
            float wSum = 1.0;
            for (int i = 0; i < 12; i++) {
              float fi = float(i) + 0.5;
              float ang = fi * 2.39996;
              float rad = sqrt(fi / 12.0) * coc;
              vec2 suv = vUv + vec2(cos(ang), sin(ang)) * uTexel * rad;
              float sz = linearDepth(suv);
              float sCoc = max(0.0, clamp(abs(sz - uFocusDist) / max(0.12, uFocusDist) * uAperture * 420.0, 0.0, 9.5) - 1.15);
              // Prevent sharp foreground bleeding into blurred background
              float w = (sz >= centerZ - 0.02) ? 1.0 : clamp(sCoc / max(coc, 0.01), 0.15, 1.0);
              vec3 sc = texture2D(tScene, suv).rgb;
              // Subtle optical bokeh highlight specular boost!
              float luma = dot(sc, vec3(0.2126, 0.7152, 0.0722));
              w *= (1.0 + max(0.0, luma - 0.85) * 0.75);
              acc += sc * w;
              wSum += w;
            }
            col = acc / wSum;
          } else if (uSharpness > 0.01) {
            // Razor-sharp CAS micro-detail sharpening ONLY inside the in-focus focal plane!
            vec3 n = texture2D(tScene, vUv + vec2(0.0, -uTexel.y)).rgb;
            vec3 s = texture2D(tScene, vUv + vec2(0.0,  uTexel.y)).rgb;
            vec3 w = texture2D(tScene, vUv + vec2(-uTexel.x, 0.0)).rgb;
            vec3 e = texture2D(tScene, vUv + vec2( uTexel.x, 0.0)).rgb;
            vec3 mn = min(col, min(min(n, s), min(w, e)));
            vec3 mx = max(col, max(max(n, s), max(w, e)));
            vec3 amp = clamp(min(mn, 2.0 - mx) / max(mx, vec3(0.001)), 0.0, 1.0);
            vec3 weight = -sqrt(amp) * (uSharpness * 0.20);
            col = max(vec3(0.0), (col + (n + s + w + e) * weight) / (1.0 + 4.0 * weight));
          }

          // Optional subtle radial chromatic aberration at extreme lens corners
          vec2 centered = vUv - 0.5;
          float dist = length(centered);
          if (uChromatic > 0.005) {
            vec2 dir = dist > 0.0001 ? centered / dist : vec2(0.0);
            float sh = uChromatic * dist * 0.015;
            col.r = mix(col.r, texture2D(tScene, vUv + dir * sh).r, 0.65);
            col.b = mix(col.b, texture2D(tScene, vUv - dir * sh).b, 0.65);
          }

          // Apply Contact SSAO
          col *= (1.0 - occ);

          // Add Dual-Kawase Soft HDR Bloom + subtle warm halation
          if (uBloomStrength > 0.005) {
            vec3 bl = texture2D(tBloom, vUv).rgb;
            col += bl * vec3(1.06, 0.98, 0.92) * uBloomStrength;
          }

          // Cinema Color Grading
          col.r *= (1.0 + uWarmth * 0.09);
          col.b *= (1.0 - uWarmth * 0.06);

          col = cinemaTonemap(col * uExposure);

          // Flash & Optical Lens Vignette
          col = mix(col, vec3(1.0, 0.98, 0.94), clamp(uFlash, 0.0, 0.85));
          col *= 1.0 - smoothstep(0.46, 0.95, dist) * uVignette;

          // Linear -> sRGB + subtle 35mm organic film micro-grain
          col = pow(max(col, vec3(0.0)), vec3(1.0 / 2.2));
          float grain = (hash12(vUv * vec2(1280.0, 720.0) + fract(uTime * 7.13)) - 0.5) * uGrain;
          col = clamp(col + grain, 0.0, 1.0);

          gl_FragColor = vec4(col, 1.0);
        }
      `,
    });

    this.extractScene = new THREE.Scene();
    this.extractScene.add(new THREE.Mesh(triGeo, this.extractMat));
    this.blurScene = new THREE.Scene();
    this.blurScene.add(new THREE.Mesh(triGeo, this.blurMat));
    this.compositeScene = new THREE.Scene();
    this.compositeScene.add(new THREE.Mesh(triGeo, this.compositeMat));

    this.lastSceneCalls = 0;
    this.lastTotalCalls = 0;
    this.lastSceneTriangles = 0;
  }

  setSize(width, height, renderScale = this.renderScale) {
    this.fullWidth = Math.max(2, Math.floor(width));
    this.fullHeight = Math.max(2, Math.floor(height));
    this.renderScale = renderScale;

    const rw = Math.max(2, Math.floor(this.fullWidth * renderScale));
    const rh = Math.max(2, Math.floor(this.fullHeight * renderScale));

    this.sceneRT.setSize(rw, rh);
    this.bloomA.setSize(Math.max(2, rw >> 2), Math.max(2, rh >> 2));
    this.bloomB.setSize(Math.max(2, rw >> 3), Math.max(2, rh >> 3));

    this.extractMat.uniforms.uTexel.value.set(1 / rw, 1 / rh);
    this.blurMat.uniforms.uTexel.value.set(4 / rw, 4 / rh);
    this.compositeMat.uniforms.uTexel.value.set(1 / rw, 1 / rh);
  }

  render(scene, camera, fx = {}) {
    const r = this.renderer;
    const prevTM = r.toneMapping;
    r.toneMapping = THREE.NoToneMapping;

    r.setRenderTarget(this.sceneRT);
    r.clear();
    r.render(scene, camera);
    this.lastSceneCalls = r.info.render.calls;
    this.lastSceneTriangles = r.info.render.triangles;

    let postCalls = 1;
    const bloomS = fx.bloomStrength ?? 0.24;
    if (bloomS > 0.005) {
      r.setRenderTarget(this.bloomA);
      r.render(this.extractScene, this.fsCam);
      r.setRenderTarget(this.bloomB);
      r.render(this.blurScene, this.fsCam);
      postCalls += 2;
    }

    const u = this.compositeMat.uniforms;
    u.uNear.value = camera.near;
    u.uFar.value = camera.far;
    u.uFocusDist.value = fx.focusDist ?? 0.45;
    u.uAperture.value = fx.aperture ?? 0.011;
    u.uAoStrength.value = fx.aoStrength ?? 0.52;
    u.uBloomStrength.value = bloomS * 1.25;
    u.uWarmth.value = fx.warmth ?? 0.08;
    u.uFlash.value = fx.flash ?? 0.0;
    u.uChromatic.value = fx.chromatic ?? 0.004;
    u.uTime.value = fx.time ?? 0.0;

    r.setRenderTarget(null);
    r.render(this.compositeScene, this.fsCam);
    this.lastTotalCalls = this.lastSceneCalls + postCalls;

    r.toneMapping = prevTM;
  }

  dispose() {
    this.sceneRT.depthTexture?.dispose();
    this.sceneRT.dispose();
    this.bloomA.dispose();
    this.bloomB.dispose();
  }
}
