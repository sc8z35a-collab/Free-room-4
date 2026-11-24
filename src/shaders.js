import * as THREE from 'three';

export function createSkyDome() {
  const uniforms = {
    uTime: { value: 0 },
    uSunDir: { value: new THREE.Vector3(0.42, 0.34, -0.84).normalize() },
    uZenithColor: { value: new THREE.Color(0x1b4b8c) },
    uHorizonColor: { value: new THREE.Color(0xf6b97a) },
    uGroundColor: { value: new THREE.Color(0x1c2432) },
    uSunColor: { value: new THREE.Color(0xfff1c4) },
    uDomainIntensity: { value: 0 },
    uEmeraldAura: { value: 0 },
    uJojoShift: { value: 0 },
  };

  const vertexShader = /* glsl */ `
    varying vec3 vWorldDir;
    void main() {
      vec4 wp = modelMatrix * vec4(position, 1.0);
      vWorldDir = normalize(position);
      gl_Position = projectionMatrix * viewMatrix * wp;
    }
  `;

  const fragmentShader = /* glsl */ `
    uniform float uTime;
    uniform vec3 uSunDir;
    uniform vec3 uZenithColor;
    uniform vec3 uHorizonColor;
    uniform vec3 uGroundColor;
    uniform vec3 uSunColor;
    uniform float uDomainIntensity;
    uniform float uEmeraldAura;
    uniform float uJojoShift;

    varying vec3 vWorldDir;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(
        mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
        mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
        u.y
      );
    }

    // Voronoi edge distance for razor-sharp Domain Expansion「綻び」fracture cracks
    float voronoiEdge(vec2 x) {
      vec2 n = floor(x);
      vec2 f = fract(x);
      float md = 8.0;
      vec2 mr = vec2(0.0);
      vec2 mg = vec2(0.0);
      for (int j = -1; j <= 1; j++) {
        for (int i = -1; i <= 1; i++) {
          vec2 g = vec2(float(i), float(j));
          vec2 o = vec2(hash(n + g), hash(n + g + vec2(17.3, 41.7)));
          o = 0.5 + 0.42 * sin(uTime * 0.25 + 6.2831 * o);
          vec2 r = g + o - f;
          float d = dot(r, r);
          if (d < md) {
            md = d;
            mr = r;
            mg = g;
          }
        }
      }
      md = 8.0;
      for (int j = -1; j <= 1; j++) {
        for (int i = -1; i <= 1; i++) {
          vec2 g = mg + vec2(float(i), float(j));
          vec2 o = vec2(hash(n + g), hash(n + g + vec2(17.3, 41.7)));
          o = 0.5 + 0.42 * sin(uTime * 0.25 + 6.2831 * o);
          vec2 r = g + o - f;
          if (dot(mr - r, mr - r) > 0.0001) {
            md = min(md, dot(0.5 * (mr + r), normalize(r - mr)));
          }
        }
      }
      return md;
    }

    void main() {
      vec3 dir = normalize(vWorldDir);
      float h = dir.y;

      // Base atmospheric gradient
      float t = pow(clamp(h, 0.0, 1.0), 0.55);
      vec3 col = mix(uHorizonColor, uZenithColor, t);
      if (h < 0.0) {
        col = mix(uHorizonColor * 0.65, uGroundColor, clamp(-h * 3.5, 0.0, 1.0));
      }

      // Mie solar scattering & crisp volumetric sun disc
      float sunDot = max(dot(dir, normalize(uSunDir)), 0.0);
      float mie = pow(sunDot, 8.0) * 0.42 + pow(sunDot, 64.0) * 0.65;
      float disc = smoothstep(0.9982, 0.9994, sunDot);
      col += uSunColor * (mie + disc * 2.4) * (1.0 - uDomainIntensity * 0.85);

      // Subtle drifting stylized voxel-sky cirrus wisps
      if (h > 0.04) {
        vec2 cloudUV = dir.xz / (h + 0.16) * 1.45 + vec2(uTime * 0.014, -uTime * 0.008);
        float c1 = noise(cloudUV * 2.2);
        float c2 = noise(cloudUV * 5.0 + 3.1);
        float cloud = smoothstep(0.54, 0.78, c1 * 0.7 + c2 * 0.3) * smoothstep(0.04, 0.28, h);
        vec3 cloudCol = mix(uHorizonColor * 1.15, vec3(1.0, 0.97, 0.92), 0.5);
        col = mix(col, cloudCol, cloud * 0.38 * (1.0 - uDomainIntensity * 0.8));
      }

      // Creator Riu emerald creation aurora curtains
      if (uEmeraldAura > 0.001 && h > 0.0) {
        float wave = sin(dir.x * 11.0 + uTime * 1.8) * cos(dir.z * 9.0 - uTime * 1.3);
        float curtain = smoothstep(0.15, 0.75, wave * 0.5 + 0.5) * smoothstep(0.0, 0.25, h) * smoothstep(0.85, 0.2, h);
        col += vec3(0.12, 0.95, 0.56) * curtain * uEmeraldAura * 0.75;
      }

      // Domain Expansion「綻び」— Shattered Void Glass & Glowing Fraying Threads!
      if (uDomainIntensity > 0.001) {
        float phi = atan(dir.z, dir.x);
        float theta = acos(clamp(dir.y, -1.0, 1.0));
        vec2 domeUV = vec2(phi * 2.4, theta * 3.2);

        float edge1 = voronoiEdge(domeUV * 2.4);
        float edge2 = voronoiEdge(domeUV * 5.8 + vec2(3.7, 1.9));

        float majorCrack = 1.0 - smoothstep(0.0, 0.036, edge1);
        float fineCrack = (1.0 - smoothstep(0.0, 0.018, edge2)) * 0.45;

        // Glowing unraveling horizontal/vertical cosmic threads ("綻び")
        float thread = pow(abs(sin(phi * 24.0 + sin(theta * 14.0 + uTime * 1.4))), 20.0) * 0.25;
        float pulse = 0.8 + 0.2 * sin(uTime * 3.8 + theta * 6.0);

        vec3 voidCol = mix(vec3(0.025, 0.012, 0.05), vec3(0.11, 0.018, 0.06), clamp(1.0 - abs(h) * 1.5, 0.0, 1.0));
        vec3 crackGlow = mix(vec3(0.95, 0.18, 0.26), vec3(1.0, 0.78, 0.34), majorCrack);
        vec3 domainCol = voidCol + crackGlow * (majorCrack * 1.15 + fineCrack * 0.55) * pulse + vec3(0.95, 0.65, 0.25) * thread;

        col = mix(col, domainCol, uDomainIntensity);
      }

      // JoJo Stand-Battle Hyper Palette Shift (deep dramatic violet-amber anime contrast!)
      if (uJojoShift > 0.001) {
        float angle = atan(dir.z, dir.x);
        float rays = pow(abs(sin(angle * 16.0 + uTime * 4.0)), 7.0);
        vec3 jojoSky = mix(vec3(0.16, 0.02, 0.28), vec3(0.58, 0.22, 0.12), clamp(1.0 - abs(h) * 1.5, 0.0, 1.0));
        jojoSky += vec3(0.85, 0.58, 0.12) * rays * 0.28;
        col = mix(col, jojoSky, uJojoShift * 0.88);
      }

      gl_FragColor = vec4(col, 1.0);
    }
  `;

  const geo = new THREE.SphereGeometry(540, 40, 28);
  const mat = new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    side: THREE.BackSide,
    depthWrite: false,
  });

  const mesh = new THREE.Mesh(geo, mat);
  mesh.frustumCulled = false;
  return { mesh, uniforms };
}

export function createWaterMaterial() {
  const uniforms = {
    uTime: { value: 0 },
    uDeepColor: { value: new THREE.Color(0x0b4f78) },
    uShallowColor: { value: new THREE.Color(0x28a5c8) },
    uSunDir: { value: new THREE.Vector3(0.42, 0.34, -0.84).normalize() },
  };

  return new THREE.ShaderMaterial({
    uniforms,
    transparent: true,
    vertexShader: /* glsl */ `
      uniform float uTime;
      varying vec2 vUv;
      varying vec3 vWorldPos;
      void main() {
        vUv = uv;
        vec3 p = position;
        p.y += sin(p.x * 0.55 + uTime * 2.4) * 0.09 + cos(p.z * 0.7 - uTime * 1.9) * 0.06;
        vec4 wp = modelMatrix * vec4(p, 1.0);
        vWorldPos = wp.xyz;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uTime;
      uniform vec3 uDeepColor;
      uniform vec3 uShallowColor;
      uniform vec3 uSunDir;
      varying vec2 vUv;
      varying vec3 vWorldPos;

      void main() {
        // Stylized voxel-quantized ripple highlights
        vec2 grid = floor(vWorldPos.xz * 2.2) / 2.2;
        float w1 = sin(grid.x * 0.9 + uTime * 2.6 + sin(grid.y * 0.7));
        float w2 = cos(grid.y * 1.2 - uTime * 2.1 + grid.x * 0.4);
        float caustic = smoothstep(0.62, 0.95, (w1 + w2) * 0.5);

        vec3 base = mix(uDeepColor, uShallowColor, 0.45 + 0.35 * sin(grid.x * 0.3 + uTime));
        vec3 col = base + vec3(0.72, 0.94, 1.0) * caustic * 0.55;

        // Edge foam near riverbanks
        float bank = abs(vUv.y - 0.5) * 2.0;
        float foam = smoothstep(0.78, 0.97, bank + sin(grid.x * 1.8 + uTime * 3.0) * 0.06);
        col = mix(col, vec3(0.92, 0.98, 1.0), foam * 0.65);

        gl_FragColor = vec4(col, 0.86);
      }
    `,
  });
}

export function createDomainSealMaterial() {
  const uniforms = {
    uTime: { value: 0 },
    uOpacity: { value: 0 },
    uColorA: { value: new THREE.Color(0xffd166) },
    uColorB: { value: new THREE.Color(0xef233c) },
  };

  return new THREE.ShaderMaterial({
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv * 2.0 - 1.0;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uTime;
      uniform float uOpacity;
      uniform vec3 uColorA;
      uniform vec3 uColorB;
      varying vec2 vUv;

      void main() {
        float r = length(vUv);
        if (r > 1.0) discard;
        float a = atan(vUv.y, vUv.x);

        // Concentric ritual rings + hexagram/octagram fracture lines
        float ring1 = smoothstep(0.022, 0.0, abs(r - 0.94));
        float ring2 = smoothstep(0.018, 0.0, abs(r - 0.72));
        float ring3 = smoothstep(0.018, 0.0, abs(r - 0.44));
        float ring4 = smoothstep(0.016, 0.0, abs(r - 0.18));

        // Rotating geometric star blades
        float starA = abs(cos((a + uTime * 0.45) * 4.0));
        float starLine = smoothstep(0.025, 0.0, abs(r - (0.45 + 0.27 * starA)));

        // Rune ticks around outer ring
        float ticks = step(0.55, sin(a * 36.0 - uTime * 2.2)) * smoothstep(0.055, 0.0, abs(r - 0.83));

        // Fractured spokes
        float spokes = smoothstep(0.016, 0.0, abs(sin((a - uTime * 0.2) * 6.0))) * smoothstep(0.18, 0.25, r) * (1.0 - smoothstep(0.92, 0.97, r));

        float pattern = clamp(ring1 + ring2 + ring3 + ring4 + starLine * 0.9 + ticks * 0.85 + spokes * 0.45, 0.0, 1.5);
        vec3 col = mix(uColorB, uColorA, ring1 + ring3 + ticks * 0.7);
        float alpha = pattern * uOpacity;
        if (alpha < 0.01) discard;
        gl_FragColor = vec4(col * 1.4, alpha);
      }
    `,
  });
}

export const CinemaPostShader = {
  uniforms: {
    tDiffuse: { value: null },
    uTime: { value: 0 },
    uChromatic: { value: 0 },
    uSpeedLines: { value: 0 },
    uVignette: { value: 0.28 },
    uFlash: { value: 0 },
    uInvert: { value: 0 },
    uWarmth: { value: 0 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform float uChromatic;
    uniform float uSpeedLines;
    uniform float uVignette;
    uniform float uFlash;
    uniform float uInvert;
    uniform float uWarmth;
    varying vec2 vUv;

    void main() {
      vec2 centered = vUv - 0.5;
      float dist = length(centered);
      vec2 dir = dist > 0.0001 ? centered / dist : vec2(0.0);

      // Dynamic radial chromatic aberration during explosions / ORA-ORA impacts
      float shift = uChromatic * dist * 0.022;
      float r = texture2D(tDiffuse, vUv + dir * shift).r;
      float g = texture2D(tDiffuse, vUv).g;
      float b = texture2D(tDiffuse, vUv - dir * shift).b;
      vec3 col = vec3(r, g, b);

      // Subtle cinema warmth / grading
      col.r *= (1.0 + uWarmth * 0.12);
      col.b *= (1.0 - uWarmth * 0.08);

      // Anime / Manga Radial Action Speed-Lines around outer viewport
      if (uSpeedLines > 0.01) {
        float ang = atan(centered.y, centered.x);
        float s1 = sin(ang * 58.0 + floor(uTime * 28.0) * 1.7);
        float s2 = sin(ang * 93.0 - floor(uTime * 34.0) * 2.3);
        float streak = smoothstep(0.68, 0.96, (s1 * 0.55 + s2 * 0.45));
        float radialMask = smoothstep(0.24, 0.62, dist);
        vec3 lineCol = mix(vec3(1.0, 0.96, 0.82), vec3(1.0, 0.72, 0.25), streak);
        col = mix(col, lineCol, streak * radialMask * uSpeedLines * 0.62);
      }

      // Dramatic anime monochrome/negative impact frame
      if (uInvert > 0.01) {
        vec3 inv = vec3(1.0) - col;
        float lum = dot(inv, vec3(0.299, 0.587, 0.114));
        vec3 comic = mix(inv, vec3(step(0.45, lum)), 0.45);
        col = mix(col, comic, uInvert);
      }

      // Impact flash
      col = mix(col, vec3(1.0, 0.98, 0.92), clamp(uFlash, 0.0, 0.92));

      // Filmic vignette
      float vig = 1.0 - smoothstep(0.48, 0.96, dist) * uVignette;
      col *= vig;

      gl_FragColor = vec4(col, 1.0);
    }
  `,
};
