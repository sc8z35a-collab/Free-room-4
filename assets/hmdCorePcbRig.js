import{$ as e,C as t,H as n,J as r,M as i,N as a,R as o,S as s,T as c,U as l,V as u,W as d,X as f,Z as p,_ as m,at as h,dt as g,f as _,ft as v,g as y,gt as b,h as x,ht as S,it as C,k as w,m as T,mt as E,nt as D,pt as O,rt as k,tt as A,v as j,w as M,x as N,y as P}from"./optimizer.js";var F=class{constructor(e,t,n,i=1){this.renderer=e,this.renderScale=i,this.fullWidth=Math.max(2,Math.floor(t)),this.fullHeight=Math.max(2,Math.floor(n));let s=e.getContext(),l=s.getExtension(`EXT_color_buffer_half_float`)||s.getExtension(`EXT_color_buffer_float`)?a:v,d=Math.max(2,Math.floor(this.fullWidth*i)),f=Math.max(2,Math.floor(this.fullHeight*i)),p=new c(d,f);p.format=M,p.type=O,this.sceneRT=new b(d,f,{type:l,minFilter:o,magFilter:o,depthBuffer:!0,depthTexture:p}),this.bloomA=new b(Math.max(2,d>>2),Math.max(2,f>>2),{type:l,minFilter:o,magFilter:o,depthBuffer:!1}),this.bloomB=new b(Math.max(2,d>>3),Math.max(2,f>>3),{type:l,minFilter:o,magFilter:o,depthBuffer:!1}),this.fsCam=new r(-1,1,1,-1,0,1);let m=new y;m.setAttribute(`position`,new x(new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),3)),m.setAttribute(`uv`,new x(new Float32Array([0,0,2,0,0,2]),2)),this.extractMat=new k({uniforms:{tScene:{value:this.sceneRT.texture},uTexel:{value:new E(1/d,1/f)},uThreshold:{value:.88}},depthTest:!1,depthWrite:!1,vertexShader:`varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,fragmentShader:`
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
      `}),this.blurMat=new k({uniforms:{tInput:{value:this.bloomA.texture},uTexel:{value:new E(4/d,4/f)}},depthTest:!1,depthWrite:!1,vertexShader:`varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,fragmentShader:`
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
      `}),this.compositeMat=new k({uniforms:{tScene:{value:this.sceneRT.texture},tDepth:{value:this.sceneRT.depthTexture},tBloom:{value:this.bloomB.texture},uTexel:{value:new E(1/d,1/f)},uNear:{value:.015},uFar:{value:120},uFocusDist:{value:.45},uAperture:{value:.012},uAoStrength:{value:.52},uBloomStrength:{value:.24},uSharpness:{value:.36},uWarmth:{value:.08},uVignette:{value:.24},uFlash:{value:0},uChromatic:{value:0},uGrain:{value:.016},uExposure:{value:1.08},uTime:{value:0}},depthTest:!1,depthWrite:!1,vertexShader:`varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,fragmentShader:`
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
      `}),this.extractScene=new D,this.extractScene.add(new u(m,this.extractMat)),this.blurScene=new D,this.blurScene.add(new u(m,this.blurMat)),this.compositeScene=new D,this.compositeScene.add(new u(m,this.compositeMat)),this.lastSceneCalls=0,this.lastTotalCalls=0,this.lastSceneTriangles=0}setSize(e,t,n=this.renderScale){this.fullWidth=Math.max(2,Math.floor(e)),this.fullHeight=Math.max(2,Math.floor(t)),this.renderScale=n;let r=Math.max(2,Math.floor(this.fullWidth*n)),i=Math.max(2,Math.floor(this.fullHeight*n));this.sceneRT.setSize(r,i),this.bloomA.setSize(Math.max(2,r>>2),Math.max(2,i>>2)),this.bloomB.setSize(Math.max(2,r>>3),Math.max(2,i>>3)),this.extractMat.uniforms.uTexel.value.set(1/r,1/i),this.blurMat.uniforms.uTexel.value.set(4/r,4/i),this.compositeMat.uniforms.uTexel.value.set(1/r,1/i)}render(e,t,n={}){let r=this.renderer,i=r.toneMapping;r.toneMapping=0,r.setRenderTarget(this.sceneRT),r.clear(),r.render(e,t),this.lastSceneCalls=r.info.render.calls,this.lastSceneTriangles=r.info.render.triangles;let a=1,o=n.bloomStrength??.24;o>.005&&(r.setRenderTarget(this.bloomA),r.render(this.extractScene,this.fsCam),r.setRenderTarget(this.bloomB),r.render(this.blurScene,this.fsCam),a+=2);let s=this.compositeMat.uniforms;s.uNear.value=t.near,s.uFar.value=t.far,s.uFocusDist.value=n.focusDist??.45,s.uAperture.value=n.aperture??.011,s.uAoStrength.value=n.aoStrength??.52,s.uBloomStrength.value=o*1.25,s.uWarmth.value=n.warmth??.08,s.uFlash.value=n.flash??0,s.uChromatic.value=n.chromatic??.004,s.uTime.value=n.time??0,r.setRenderTarget(null),r.render(this.compositeScene,this.fsCam),this.lastTotalCalls=this.lastSceneCalls+a,r.toneMapping=i}dispose(){this.sceneRT.depthTexture?.dispose(),this.sceneRT.dispose(),this.bloomA.dispose(),this.bloomB.dispose()}};function I(t,n=2.4,r=1,i=1){let a=t.width,o=t.height,s=t.getContext(`2d`).getImageData(0,0,a,o).data,c=document.createElement(`canvas`);c.width=a,c.height=o;let l=c.getContext(`2d`),u=l.createImageData(a,o),d=u.data,f=(e,t)=>{let n=(e%a+a)%a,r=(t%o+o)%o;return s[(r*a+n)*4]/255};for(let e=0;e<o;e++)for(let t=0;t<a;t++){let r=(f(t+1,e)-f(t-1,e))*n,i=(f(t,e+1)-f(t,e-1))*n,o=-r,s=i,c=1,l=1/Math.hypot(o,s,c);o*=l,s*=l,c*=l;let u=(e*a+t)*4;d[u]=Math.round((o*.5+.5)*255),d[u+1]=Math.round((s*.5+.5)*255),d[u+2]=Math.round((c*.5+.5)*255),d[u+3]=255}l.putImageData(u,0,0);let p=new m(c);return p.wrapS=e,p.wrapT=e,p.repeat.set(r,i),p.anisotropy=8,p}function L(e){let t=1024,n=document.createElement(`canvas`);n.width=t,n.height=512;let r=n.getContext(`2d`),i=r.createLinearGradient(0,0,0,512);i.addColorStop(0,`#dce8f8`),i.addColorStop(.28,`#cbd5e1`),i.addColorStop(.48,`#64748b`),i.addColorStop(.52,`#3b332b`),i.addColorStop(1,`#181411`),r.fillStyle=i,r.fillRect(0,0,t,512);let a=(e,n,i,a,o)=>{let s=r.createRadialGradient(e,n,4,e,n,Math.max(i,a));s.addColorStop(0,o),s.addColorStop(.55,o.replace(`0.98`,`0.35`)),s.addColorStop(1,`rgba(255,255,255,0)`),r.fillStyle=s,r.fillRect(0,0,t,512)};a(t*.24,153.6,180,110,`rgba(235, 246, 255, 0.98)`),a(t*.72,122.88,165,95,`rgba(255, 232, 185, 0.98)`),r.fillStyle=`rgba(255, 255, 255, 0.92)`,r.fillRect(t*.44,56.32,t*.16,17.92),r.fillStyle=`rgba(255, 242, 210, 0.85)`,r.fillRect(t*.66,81.92,t*.09,12.8);let o=new m(n);o.mapping=303,o.colorSpace=A;let s=new _(e);s.compileEquirectangularShader();let c=s.fromEquirectangular(o);return o.dispose(),s.dispose(),c}function R(){let e=document.createElement(`canvas`);e.width=1024,e.height=1024;let t=e.getContext(`2d`),n=document.createElement(`canvas`);n.width=1024,n.height=1024;let r=n.getContext(`2d`),i=document.createElement(`canvas`);i.width=1024,i.height=1024;let a=i.getContext(`2d`);t.fillStyle=`#075e36`,t.fillRect(0,0,1024,1024),r.fillStyle=`#707070`,r.fillRect(0,0,1024,1024),a.fillStyle=`#2e2e2e`,a.fillRect(0,0,1024,1024),t.strokeStyle=`#0d7a47`,r.strokeStyle=`#b8b8b8`,t.lineWidth=7,r.lineWidth=8;for(let e=0;e<22;e++){let n=90+e*38;t.beginPath(),t.moveTo(95,n),t.lineTo(360,n),t.lineTo(410,n+(e%2==0?22:-22)),t.lineTo(920,n+(e%2==0?22:-22)),t.stroke(),r.beginPath(),r.moveTo(95,n),r.lineTo(360,n),r.lineTo(410,n+(e%2==0?22:-22)),r.lineTo(920,n+(e%2==0?22:-22)),r.stroke()}t.fillStyle=`#eab308`,t.fillRect(110,448,804,128),t.fillStyle=`#fde047`,t.fillRect(116,456,792,112),r.fillStyle=`#d8d8d8`,r.fillRect(110,448,804,128),a.fillStyle=`#181818`,a.fillRect(110,448,804,128);let o=(e,n,i=9)=>{t.fillStyle=`#fbbf24`,t.beginPath(),t.arc(e,n,i,0,Math.PI*2),t.fill(),t.fillStyle=`#041f12`,t.beginPath(),t.arc(e,n,i*.45,0,Math.PI*2),t.fill(),r.fillStyle=`#202020`,r.beginPath(),r.arc(e,n,i*.5,0,Math.PI*2),r.fill()};for(let e=140;e<=884;e+=38)o(e,472,8),o(e,552,8);for(let e=120;e<=900;e+=76)for(let t of[120,904])o(e,t,7);for(let[e,n]of[[68,68],[956,68],[68,956],[956,956]])t.fillStyle=`#facc15`,t.beginPath(),t.arc(e,n,34,0,Math.PI*2),t.fill(),t.fillStyle=`#090d12`,t.beginPath(),t.arc(e,n,18,0,Math.PI*2),t.fill();t.fillStyle=`#f8fafc`,a.fillStyle=`#a0a0a0`,t.font=`900 38px monospace`,t.fillText(`HMD-CORE-v1  Rev 1.0`,128,78),t.font=`800 30px monospace`,t.fillText(`Designed by M.Saeki`,545,968),t.font=`800 22px monospace`,t.fillText(`PORT1:R_LEG`,135,868),t.fillText(`PORT2:L_LEG`,335,868),t.fillText(`PORT3:R_ARM`,545,868),t.fillText(`PORT4:L_ARM`,755,868),t.fillText(`3S LiPo 12.6V`,120,432),t.fillText(`Q1:4mΩ IDEAL DIODE`,360,432),t.fillText(`BNO085 IMU (CoM)`,415,622),t.fillText(`BZ1 10.2V`,815,220),t.strokeStyle=`#f8fafc`,t.lineWidth=4,t.strokeRect(130,140,290,240),t.strokeRect(435,640,165,130);for(let e of[155,355,565,775])t.strokeRect(e,882,115,56);let s=new m(e);s.colorSpace=A,s.anisotropy=8;let c=I(n,2.8),u=new m(i),f=new l({map:s,normalMap:c,normalScale:new E(.55,.55),roughnessMap:u,roughness:.85,metalness:.18,clearcoat:.92,clearcoatRoughness:.09}),p=new d({color:13152888,roughness:.62}),h=document.createElement(`canvas`);h.width=1024,h.height=512;let g=h.getContext(`2d`),_=document.createElement(`canvas`);_.width=512,_.height=256;let v=_.getContext(`2d`);g.fillStyle=`#d9be93`,g.fillRect(0,0,1024,512),v.fillStyle=`#808080`,v.fillRect(0,0,512,256);for(let e=0;e<512;e+=2){let t=Math.sin(e*.035)*18+Math.cos(e*.09)*7,n=205+Math.sin((e+t)*.14)*18;g.fillStyle=`rgb(${n+12}, ${n-14}, ${n-52})`,g.fillRect(0,e,1024,2)}for(let e=0;e<320;e++)v.fillStyle=e%2==0?`rgba(255,255,255,0.12)`:`rgba(0,0,0,0.12)`,v.fillRect(0,Math.random()*256,512,1.5);let y=new m(h);y.colorSpace=A,y.anisotropy=8;let b=I(_,1.8),x=new l({map:y,normalMap:b,normalScale:new E(.35,.35),roughness:.58,clearcoat:.08}),S=document.createElement(`canvas`);S.width=1024,S.height=512;let C=S.getContext(`2d`),w=C.createLinearGradient(0,0,1024,0);w.addColorStop(0,`#4a2f1d`),w.addColorStop(.5,`#5b3b25`),w.addColorStop(1,`#462c1a`),C.fillStyle=w,C.fillRect(0,0,1024,512);for(let e=0;e<480;e++)C.fillStyle=e%2==0?`rgba(22,10,4,0.16)`:`rgba(145,98,62,0.09)`,C.fillRect(0,Math.random()*512,1024,1+Math.random()*2.5);let T=new m(S);T.colorSpace=A,T.anisotropy=8;let D=new l({map:T,normalMap:b,normalScale:new E(.22,.22),roughness:.32,metalness:.02,clearcoat:.36,clearcoatRoughness:.24}),O=document.createElement(`canvas`);O.width=256,O.height=256;let k=O.getContext(`2d`);k.fillStyle=`#808080`,k.fillRect(0,0,256,256);for(let e=0;e<2400;e++)k.fillStyle=e%2==0?`#949494`:`#6b6b6b`,k.fillRect(Math.random()*256,Math.random()*256,2,1.5);let j=I(O,1.3,4,4);return{hmdCorePcbTopMat:f,fr4EdgeMat:p,birchPlywoodMat:x,walnutProMat:D,skinNextGen:new l({color:15646882,normalMap:j,normalScale:new E(.18,.18),roughness:.52,sheen:.34,sheenRoughness:.62,sheenColor:new N(16758942),clearcoat:.06,clearcoatRoughness:.5}),fingernailMat:new l({color:16243922,roughness:.18,clearcoat:.92,clearcoatRoughness:.08}),goldEnigMat:new l({color:16498468,metalness:.98,roughness:.11,clearcoat:.5}),solderBusbarMat:new l({color:15659768,normalMap:j,normalScale:new E(.08,.08),metalness:.99,roughness:.07,clearcoat:.75}),uvMaskResinMat:new l({color:1096065,emissive:366185,emissiveIntensity:.25,transparent:!0,opacity:.88,roughness:.08,clearcoat:1}),lipoWrapBlue:new l({color:165063,roughness:.24,metalness:.12,clearcoat:.75,clearcoatRoughness:.15})}}function z(e,n,r=1){let a=new i,o=new u(new t(.036,.03,.2,24),e.hoodieNavy);o.rotation.x=Math.PI/2,o.position.set(0,0,.145),o.castShadow=!0,a.add(o);let s=new u(new t(.026,.025,.045,20),n.skinNextGen);s.rotation.x=Math.PI/2,s.position.set(0,0,.032),a.add(s);let c=new u(new h(.03,24,18),n.skinNextGen);c.scale.set(.98,.42,1.15),c.position.set(0,0,-.004),c.castShadow=!0,a.add(c);let l=[{x:-.02*r,r:.0056,l1:.024,l2:.019},{x:-.007*r,r:.0059,l1:.026,l2:.021},{x:.006*r,r:.0055,l1:.024,l2:.019},{x:.018*r,r:.0049,l1:.019,l2:.016}],d=[];for(let e of l){let t=new i;t.position.set(e.x,.001,-.032);let r=new u(new j(e.r,e.l1,8,14),n.skinNextGen);r.rotation.x=Math.PI/2,r.position.z=-e.l1*.5,r.castShadow=!0,t.add(r);let o=new i;o.position.z=-e.l1-e.r*.25;let s=new u(new j(e.r*.88,e.l2,8,14),n.skinNextGen);s.rotation.x=Math.PI/2,s.position.z=-e.l2*.5,s.castShadow=!0,o.add(s);let c=new u(new h(e.r*.78,14,10),n.fingernailMat);c.scale.set(.92,.24,1.35),c.position.set(0,e.r*.76,-e.l2*.68),o.add(c),t.add(o),a.add(t),d.push({knuckle:t,tip:o})}let f=new i;f.position.set(-.026*r,-.004,-.014),f.rotation.y=r*.48;let p=new u(new j(.0062,.024,8,14),n.skinNextGen);p.rotation.x=Math.PI/2,p.position.z=-.015,p.castShadow=!0,f.add(p);let m=new u(new h(.005,12,10),n.fingernailMat);m.scale.set(.95,.24,1.3),m.position.set(0,.005,-.023),f.add(m),a.add(f);function g(e=.45){d.forEach((t,n)=>{t.knuckle.rotation.x=-e*(.65+n*.07),t.tip.rotation.x=-e*.78}),f.rotation.x=-e*.35}return{group:a,fingers:d,thumb:f,setGrip:g}}function B(e,t,n,r=16){let i=new P(e.map(e=>new S(...e))),a=new u(new g(i,r,t,8,!1),n);return a.castShadow=!0,a}function V(e,r,a=1){let o=new i;o.scale.setScalar(a);let s=new T(.055,.0016,.05),c=[r.fr4EdgeMat,r.fr4EdgeMat,r.hmdCorePcbTopMat,r.hmdCorePcbTopMat,r.fr4EdgeMat,r.fr4EdgeMat],f=new u(s,c);f.castShadow=!0,f.receiveShadow=!0,o.add(f);let p=new t(.0018,.0018,.008,12);for(let[t,n]of[[-.0238,-.0215],[.0238,-.0215],[-.0238,.0215],[.0238,.0215]]){let r=new u(p,e.brass);r.position.set(t,-.004,n),o.add(r)}let m=new i;o.add(m);let g=new d({color:11830350,roughness:.35});[[-.018,-.005],[-.014,-.005],[-.01,-.005],[-.006,-.005],[.008,-.006],[.012,-.006],[.016,-.006],[.02,-.006],[-.018,.008],[-.013,.008],[.012,.008],[.017,.008],[.015,-.016],[.019,-.016],[.015,-.012],[.019,-.012]].forEach(([t,n],a)=>{let o=new i;o.position.set(t,.0012,n);let s=new u(new T(.002,8e-4,.0012),a%2==0?e.icPackage:g),c=new u(new T(4e-4,85e-5,.00125),r.solderBusbarMat);c.position.x=-9e-4;let l=c.clone();l.position.x=9e-4,o.add(s,c,l),m.add(o)});let _=new u(new T(.005,.0012,.005),e.icPackage);_.position.set(-.008,.0014,-.004),_.castShadow=!0,m.add(_);let v=new u(new T(.0065,.003,.0065),e.darkAnodized);v.position.set(.004,.0023,-.012),v.castShadow=!0,m.add(v);let y=new u(new T(.0062,.0016,.0035),e.icPackage);y.position.set(.014,.0016,-.006),m.add(y);let b=new i;b.position.set(.019,.0035,-.016);let x=new u(new t(.0045,.0045,.0055,22),e.icPackage);x.castShadow=!0;let S=new u(new t(.0012,.0012,.0058,14),e.rubberBlack);b.add(x,S),m.add(b);let C=new u(new T(.008,.0075,.015),e.xt60Yellow);C.position.set(-.023,.0045,0),C.castShadow=!0,m.add(C);let w=new n({color:1467700}),E=new u(new T(.0018,.001,.0012),w);E.position.set(.022,.0013,-.006),m.add(E);let D=new u(new j(.0026,.036,10,24),r.solderBusbarMat);D.rotation.z=Math.PI/2,D.scale.set(1,1,.48),D.position.set(.002,.0012,0),D.castShadow=!0,m.add(D);let O=new i;o.add(O);let k=new u(new T(.018,.0012,.024),e.pcbEsp);k.position.set(-.012,.0016,-.012);let A=new u(new T(.014,.0028,.016),e.chromeSteel);A.position.set(-.012,.0032,-.01),A.castShadow=!0,O.add(k,A);let M=new u(new T(.011,.0012,.009),new l({color:3223169,roughness:.3,clearcoat:.6}));M.position.set(.001,.0016,.009);let N=new u(new T(.0042,.0011,.0038),e.icPackage);N.position.set(.001,.0026,.009),O.add(M,N);let P=new u(new T(.0085,.0015,.0042),e.icPackage);P.position.set(-.014,.0016,.009),O.add(P);let F=[-.0175,-.006,.006,.0175];for(let n of F){let a=new i;a.position.set(n,.0032,.0205);let o=new u(new T(.0076,.0048,.0042),e.servoHornWhite);o.castShadow=!0;let s=new u(new T(.0076,.0068,.001),e.servoHornWhite);s.position.set(0,.001,-.0018),a.add(o,s);for(let e of[-.0025,0,.0025]){let n=new u(new t(35e-5,35e-5,.0055,8),r.goldEnigMat);n.position.set(e,8e-4,4e-4),a.add(n)}O.add(a)}let I=new i,L=new i,R=new i,z=new i;I.add(L,R,z),o.add(I);let V=new l({color:16007006,roughness:.24,clearcoat:.65}),H=new l({color:3718648,roughness:.24,clearcoat:.65}),U=new d({color:4140574,roughness:.85});for(let e of F){for(let t of[-.0025,.0025]){let n=new u(new T(.0016,45e-5,85e-5),U);n.position.set(e+t,92e-5,.0152);let i=new u(new T(.0015,48e-5,25e-5),r.goldEnigMat);i.position.set(e+t,95e-5,.0146),L.add(n,i)}R.add(B([[e-.0026,.0011,.0126],[e,.0021,.0152],[e+.0026,.0011,.0178]],38e-5,V,14),B([[e+.0026,.0011,.0126],[e,.0028,.0152],[e-.0026,.0011,.0178]],38e-5,H,14));let t=new u(new h(.003,18,12),r.uvMaskResinMat);t.scale.set(1.18,.38,1.08),t.position.set(e,.0014,.0152),z.add(t)}function W({stage:e=`bare`,busbarProgress:t=1,ledOn:n=!1,uvGlow:i=0}={}){m.visible=e!==`bare`,D.visible=t>.02,D.scale.set(Math.max(.02,t),1,.48),O.visible=e===`full_bug`||e===`knife_cut`||e===`x_jumper`||e===`uv_cured`,L.visible=e===`knife_cut`||e===`x_jumper`||e===`uv_cured`,R.visible=e===`x_jumper`||e===`uv_cured`,z.visible=e===`uv_cured`,w.color.setHex(n?4906624:1332013),r.uvMaskResinMat.emissiveIntensity=.22+i*2.2}return{root:o,setAssemblyState:W}}function H(e,r){let a=new i,o=new u(new T(.18,.008,.14),new l({color:16436245,roughness:.35,clearcoat:.4}));o.position.set(-.11,.004,-.03),o.rotation.y=.22,o.receiveShadow=!0,a.add(o);let c=new u(new T(.095,.028,.082),new l({color:1920728,roughness:.42,clearcoat:.25}));c.position.set(-.085,.018,-.04),c.rotation.y=.14,c.castShadow=!0,a.add(c);for(let t=0;t<4;t++){let n=V(e,r,1.35);n.setAssemblyState({stage:`bare`,busbarProgress:0}),n.root.position.set(.03+t*.022,.003+t*.0032,.02-t*.012),n.root.rotation.set(.04*t,-.18+t*.11,-.03*t),a.add(n.root)}let m=new i,h=new u(new t(.0045,.0052,.125,18),new l({color:16436245,roughness:.32,clearcoat:.35}));h.rotation.x=Math.PI/2,h.position.z=.075,h.castShadow=!0,m.add(h);let g=new u(new t(.0054,.005,.032,18),e.rubberBlack);g.rotation.x=Math.PI/2,g.position.z=.028,m.add(g);let _=new u(new t(.0032,.0044,.016,16),e.brass);_.rotation.x=Math.PI/2,_.position.z=.008,m.add(_);let v=new C;v.moveTo(0,0),v.lineTo(.014,.0045),v.lineTo(.014,5e-4),v.closePath();let y=new w(v,{depth:4e-4,bevelEnabled:!1}),b=new u(y,e.chromeSteel);b.rotation.y=Math.PI/2,b.position.set(-2e-4,-.001,-.012),m.add(b);let x=new i,S=new u(new t(.007,.007,.11,20),e.darkAnodized);S.position.y=.105,S.castShadow=!0;let E=new u(new t(.0062,.0062,.003,20),new n({color:12616956}));E.position.y=.049,x.add(S,E);let D=new n({color:9647082,transparent:!0,opacity:.18,side:2,depthWrite:!1,blending:2}),O=new u(new s(.036,.072,24,1,!0),D);O.position.y=.014,x.add(O);let k=new p(9647082,0,.38,1.4);k.position.set(0,.042,0),x.add(k);let A=new i,j=new u(new T(.072,.022,.035),r.lipoWrapBlue);j.position.y=.011,j.castShadow=!0,A.add(j);let M=new u(new f(.056,.024),new d({color:16317180,roughness:.4}));return M.rotation.x=-Math.PI/2,M.position.y=.0222,A.add(M),{unboxGroup:a,craftKnife:m,uvTorch:x,uvSpotLight:k,lipoPack:A}}export{L as a,R as i,V as n,I as o,z as r,F as s,H as t};