import{$ as e,A as t,B as n,C as r,H as i,I as a,J as o,K as s,O as c,S as l,T as u,V as d,Y as f,Z as p,_ as m,dt as h,et as g,f as _,ft as v,g as y,h as b,j as x,lt as S,m as C,mt as w,nt as T,pt as E,rt as D,tt as O,ut as k,v as A,w as j,x as M,y as N,z as P}from"./optimizer.js";var F=class{constructor(e,t,n,r=1){this.renderer=e,this.renderScale=r,this.fullWidth=Math.max(2,Math.floor(t)),this.fullHeight=Math.max(2,Math.floor(n));let i=e.getContext(),o=i.getExtension(`EXT_color_buffer_half_float`)||i.getExtension(`EXT_color_buffer_float`)?x:k,c=Math.max(2,Math.floor(this.fullWidth*r)),l=Math.max(2,Math.floor(this.fullHeight*r)),d=new u(c,l);d.format=j,d.type=h,this.sceneRT=new w(c,l,{type:o,minFilter:a,magFilter:a,depthBuffer:!0,depthTexture:d}),this.bloomA=new w(Math.max(2,c>>2),Math.max(2,l>>2),{type:o,minFilter:a,magFilter:a,depthBuffer:!1}),this.bloomB=new w(Math.max(2,c>>3),Math.max(2,l>>3),{type:o,minFilter:a,magFilter:a,depthBuffer:!1}),this.fsCam=new s(-1,1,1,-1,0,1);let f=new y;f.setAttribute(`position`,new b(new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),3)),f.setAttribute(`uv`,new b(new Float32Array([0,0,2,0,0,2]),2)),this.extractMat=new O({uniforms:{tScene:{value:this.sceneRT.texture},uTexel:{value:new v(1/c,1/l)},uThreshold:{value:.88}},depthTest:!1,depthWrite:!1,vertexShader:`varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,fragmentShader:`
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
      `}),this.blurMat=new O({uniforms:{tInput:{value:this.bloomA.texture},uTexel:{value:new v(4/c,4/l)}},depthTest:!1,depthWrite:!1,vertexShader:`varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,fragmentShader:`
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
      `}),this.compositeMat=new O({uniforms:{tScene:{value:this.sceneRT.texture},tDepth:{value:this.sceneRT.depthTexture},tBloom:{value:this.bloomB.texture},uTexel:{value:new v(1/c,1/l)},uNear:{value:.015},uFar:{value:120},uFocusDist:{value:.45},uAperture:{value:.012},uAoStrength:{value:.52},uBloomStrength:{value:.24},uSharpness:{value:.36},uWarmth:{value:.08},uVignette:{value:.24},uFlash:{value:0},uChromatic:{value:0},uGrain:{value:.016},uExposure:{value:1.08},uTime:{value:0}},depthTest:!1,depthWrite:!1,vertexShader:`varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,fragmentShader:`
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
      `}),this.extractScene=new g,this.extractScene.add(new P(f,this.extractMat)),this.blurScene=new g,this.blurScene.add(new P(f,this.blurMat)),this.compositeScene=new g,this.compositeScene.add(new P(f,this.compositeMat)),this.lastSceneCalls=0,this.lastTotalCalls=0,this.lastSceneTriangles=0}setSize(e,t,n=this.renderScale){this.fullWidth=Math.max(2,Math.floor(e)),this.fullHeight=Math.max(2,Math.floor(t)),this.renderScale=n;let r=Math.max(2,Math.floor(this.fullWidth*n)),i=Math.max(2,Math.floor(this.fullHeight*n));this.sceneRT.setSize(r,i),this.bloomA.setSize(Math.max(2,r>>2),Math.max(2,i>>2)),this.bloomB.setSize(Math.max(2,r>>3),Math.max(2,i>>3)),this.extractMat.uniforms.uTexel.value.set(1/r,1/i),this.blurMat.uniforms.uTexel.value.set(4/r,4/i),this.compositeMat.uniforms.uTexel.value.set(1/r,1/i)}render(e,t,n={}){let r=this.renderer,i=r.toneMapping;r.toneMapping=0,r.setRenderTarget(this.sceneRT),r.clear(),r.render(e,t),this.lastSceneCalls=r.info.render.calls,this.lastSceneTriangles=r.info.render.triangles;let a=1,o=n.bloomStrength??.24;o>.005&&(r.setRenderTarget(this.bloomA),r.render(this.extractScene,this.fsCam),r.setRenderTarget(this.bloomB),r.render(this.blurScene,this.fsCam),a+=2);let s=this.compositeMat.uniforms;s.uNear.value=t.near,s.uFar.value=t.far,s.uFocusDist.value=n.focusDist??.45,s.uAperture.value=n.aperture??.011,s.uAoStrength.value=n.aoStrength??.52,s.uBloomStrength.value=o*1.25,s.uWarmth.value=n.warmth??.08,s.uFlash.value=n.flash??0,s.uChromatic.value=n.chromatic??.004,s.uTime.value=n.time??0,r.setRenderTarget(null),r.render(this.compositeScene,this.fsCam),this.lastTotalCalls=this.lastSceneCalls+a,r.toneMapping=i}dispose(){this.sceneRT.depthTexture?.dispose(),this.sceneRT.dispose(),this.bloomA.dispose(),this.bloomB.dispose()}};function I(e,t=2.4,n=1,r=1){let i=e.width,a=e.height,o=e.getContext(`2d`).getImageData(0,0,i,a).data,s=document.createElement(`canvas`);s.width=i,s.height=a;let c=s.getContext(`2d`),l=c.createImageData(i,a),u=l.data,d=(e,t)=>{let n=(e%i+i)%i,r=(t%a+a)%a;return o[(r*i+n)*4]/255};for(let e=0;e<a;e++)for(let n=0;n<i;n++){let r=(d(n+1,e)-d(n-1,e))*t,a=(d(n,e+1)-d(n,e-1))*t,o=-r,s=a,c=1,l=1/Math.hypot(o,s,c);o*=l,s*=l,c*=l;let f=(e*i+n)*4;u[f]=Math.round((o*.5+.5)*255),u[f+1]=Math.round((s*.5+.5)*255),u[f+2]=Math.round((c*.5+.5)*255),u[f+3]=255}c.putImageData(l,0,0);let f=new m(s);return f.wrapS=p,f.wrapT=p,f.repeat.set(n,r),f.anisotropy=8,f}function L(t){let n=1024,r=document.createElement(`canvas`);r.width=n,r.height=512;let i=r.getContext(`2d`),a=i.createLinearGradient(0,0,0,512);a.addColorStop(0,`#dce8f8`),a.addColorStop(.28,`#cbd5e1`),a.addColorStop(.48,`#64748b`),a.addColorStop(.52,`#3b332b`),a.addColorStop(1,`#181411`),i.fillStyle=a,i.fillRect(0,0,n,512);let o=(e,t,r,a,o)=>{let s=i.createRadialGradient(e,t,4,e,t,Math.max(r,a));s.addColorStop(0,o),s.addColorStop(.55,o.replace(`0.98`,`0.35`)),s.addColorStop(1,`rgba(255,255,255,0)`),i.fillStyle=s,i.fillRect(0,0,n,512)};o(n*.24,153.6,180,110,`rgba(235, 246, 255, 0.98)`),o(n*.72,122.88,165,95,`rgba(255, 232, 185, 0.98)`),i.fillStyle=`rgba(255, 255, 255, 0.92)`,i.fillRect(n*.44,56.32,n*.16,17.92),i.fillStyle=`rgba(255, 242, 210, 0.85)`,i.fillRect(n*.66,81.92,n*.09,12.8);let s=new m(r);s.mapping=303,s.colorSpace=e;let c=new _(t);c.compileEquirectangularShader();let l=c.fromEquirectangular(s);return s.dispose(),c.dispose(),l}function R(){let t=document.createElement(`canvas`);t.width=1024,t.height=1024;let n=t.getContext(`2d`),r=document.createElement(`canvas`);r.width=1024,r.height=1024;let a=r.getContext(`2d`),o=document.createElement(`canvas`);o.width=1024,o.height=1024;let s=o.getContext(`2d`);n.fillStyle=`#075e36`,n.fillRect(0,0,1024,1024),a.fillStyle=`#707070`,a.fillRect(0,0,1024,1024),s.fillStyle=`#2e2e2e`,s.fillRect(0,0,1024,1024),n.strokeStyle=`#0d7a47`,a.strokeStyle=`#b8b8b8`,n.lineWidth=7,a.lineWidth=8;for(let e=0;e<22;e++){let t=90+e*38;n.beginPath(),n.moveTo(95,t),n.lineTo(360,t),n.lineTo(410,t+(e%2==0?22:-22)),n.lineTo(920,t+(e%2==0?22:-22)),n.stroke(),a.beginPath(),a.moveTo(95,t),a.lineTo(360,t),a.lineTo(410,t+(e%2==0?22:-22)),a.lineTo(920,t+(e%2==0?22:-22)),a.stroke()}n.fillStyle=`#eab308`,n.fillRect(110,448,804,128),n.fillStyle=`#fde047`,n.fillRect(116,456,792,112),a.fillStyle=`#d8d8d8`,a.fillRect(110,448,804,128),s.fillStyle=`#181818`,s.fillRect(110,448,804,128);let c=(e,t,r=9)=>{n.fillStyle=`#fbbf24`,n.beginPath(),n.arc(e,t,r,0,Math.PI*2),n.fill(),n.fillStyle=`#041f12`,n.beginPath(),n.arc(e,t,r*.45,0,Math.PI*2),n.fill(),a.fillStyle=`#202020`,a.beginPath(),a.arc(e,t,r*.5,0,Math.PI*2),a.fill()};for(let e=140;e<=884;e+=38)c(e,472,8),c(e,552,8);for(let e=120;e<=900;e+=76)for(let t of[120,904])c(e,t,7);for(let[e,t]of[[68,68],[956,68],[68,956],[956,956]])n.fillStyle=`#facc15`,n.beginPath(),n.arc(e,t,34,0,Math.PI*2),n.fill(),n.fillStyle=`#090d12`,n.beginPath(),n.arc(e,t,18,0,Math.PI*2),n.fill();n.fillStyle=`#f8fafc`,s.fillStyle=`#a0a0a0`,n.font=`900 38px monospace`,n.fillText(`HMD-CORE-v1  Rev 1.0`,128,78),n.font=`800 30px monospace`,n.fillText(`Designed by M.Saeki`,545,968),n.font=`800 22px monospace`,n.fillText(`PORT1:R_LEG`,135,868),n.fillText(`PORT2:L_LEG`,335,868),n.fillText(`PORT3:R_ARM`,545,868),n.fillText(`PORT4:L_ARM`,755,868),n.fillText(`3S LiPo 12.6V`,120,432),n.fillText(`Q1:4mΩ IDEAL DIODE`,360,432),n.fillText(`BNO085 IMU (CoM)`,415,622),n.fillText(`BZ1 10.2V`,815,220),n.strokeStyle=`#f8fafc`,n.lineWidth=4,n.strokeRect(130,140,290,240),n.strokeRect(435,640,165,130);for(let e of[155,355,565,775])n.strokeRect(e,882,115,56);let l=new m(t);l.colorSpace=e,l.anisotropy=8;let u=I(r,2.8),f=new m(o),p=new d({map:l,normalMap:u,normalScale:new v(.55,.55),roughnessMap:f,roughness:.85,metalness:.18,clearcoat:.92,clearcoatRoughness:.09}),h=new i({color:13152888,roughness:.62}),g=document.createElement(`canvas`);g.width=1024,g.height=512;let _=g.getContext(`2d`),y=document.createElement(`canvas`);y.width=512,y.height=256;let b=y.getContext(`2d`);_.fillStyle=`#d9be93`,_.fillRect(0,0,1024,512),b.fillStyle=`#808080`,b.fillRect(0,0,512,256);for(let e=0;e<512;e+=2){let t=Math.sin(e*.035)*18+Math.cos(e*.09)*7,n=205+Math.sin((e+t)*.14)*18;_.fillStyle=`rgb(${n+12}, ${n-14}, ${n-52})`,_.fillRect(0,e,1024,2)}for(let e=0;e<320;e++)b.fillStyle=e%2==0?`rgba(255,255,255,0.12)`:`rgba(0,0,0,0.12)`,b.fillRect(0,Math.random()*256,512,1.5);let x=new m(g);x.colorSpace=e,x.anisotropy=8;let S=I(y,1.8),C=new d({map:x,normalMap:S,normalScale:new v(.35,.35),roughness:.58,clearcoat:.08}),w=document.createElement(`canvas`);w.width=1024,w.height=512;let T=w.getContext(`2d`),E=T.createLinearGradient(0,0,1024,0);E.addColorStop(0,`#4a2f1d`),E.addColorStop(.5,`#5b3b25`),E.addColorStop(1,`#462c1a`),T.fillStyle=E,T.fillRect(0,0,1024,512);for(let e=0;e<480;e++)T.fillStyle=e%2==0?`rgba(22,10,4,0.16)`:`rgba(145,98,62,0.09)`,T.fillRect(0,Math.random()*512,1024,1+Math.random()*2.5);let D=new m(w);D.colorSpace=e,D.anisotropy=8;let O=new d({map:D,normalMap:S,normalScale:new v(.22,.22),roughness:.32,metalness:.02,clearcoat:.36,clearcoatRoughness:.24}),k=document.createElement(`canvas`);k.width=256,k.height=256;let A=k.getContext(`2d`);A.fillStyle=`#808080`,A.fillRect(0,0,256,256);for(let e=0;e<2400;e++)A.fillStyle=e%2==0?`#949494`:`#6b6b6b`,A.fillRect(Math.random()*256,Math.random()*256,2,1.5);let j=I(k,1.3,4,4);return{hmdCorePcbTopMat:p,fr4EdgeMat:h,birchPlywoodMat:C,walnutProMat:O,skinNextGen:new d({color:15646882,normalMap:j,normalScale:new v(.18,.18),roughness:.52,sheen:.34,sheenRoughness:.62,sheenColor:new M(16758942),clearcoat:.06,clearcoatRoughness:.5}),fingernailMat:new d({color:16243922,roughness:.18,clearcoat:.92,clearcoatRoughness:.08}),goldEnigMat:new d({color:16498468,metalness:.98,roughness:.11,clearcoat:.5}),solderBusbarMat:new d({color:15659768,normalMap:j,normalScale:new v(.08,.08),metalness:.99,roughness:.07,clearcoat:.75}),uvMaskResinMat:new d({color:1096065,emissive:366185,emissiveIntensity:.25,transparent:!0,opacity:.88,roughness:.08,clearcoat:1}),lipoWrapBlue:new d({color:165063,roughness:.24,metalness:.12,clearcoat:.75,clearcoatRoughness:.15})}}function z(e,n,i=1){let a=new t,o=new P(new r(.036,.03,.2,24),e.hoodieNavy);o.rotation.x=Math.PI/2,o.position.set(0,0,.145),o.castShadow=!0,a.add(o);let s=new P(new r(.026,.025,.045,20),n.skinNextGen);s.rotation.x=Math.PI/2,s.position.set(0,0,.032),a.add(s);let c=new P(new D(.03,24,18),n.skinNextGen);c.scale.set(.98,.42,1.15),c.position.set(0,0,-.004),c.castShadow=!0,a.add(c);let l=[{x:-.02*i,r:.0056,l1:.024,l2:.019},{x:-.007*i,r:.0059,l1:.026,l2:.021},{x:.006*i,r:.0055,l1:.024,l2:.019},{x:.018*i,r:.0049,l1:.019,l2:.016}],u=[];for(let e of l){let r=new t;r.position.set(e.x,.001,-.032);let i=new P(new A(e.r,e.l1,8,14),n.skinNextGen);i.rotation.x=Math.PI/2,i.position.z=-e.l1*.5,i.castShadow=!0,r.add(i);let o=new t;o.position.z=-e.l1-e.r*.25;let s=new P(new A(e.r*.88,e.l2,8,14),n.skinNextGen);s.rotation.x=Math.PI/2,s.position.z=-e.l2*.5,s.castShadow=!0,o.add(s);let c=new P(new D(e.r*.78,14,10),n.fingernailMat);c.scale.set(.92,.24,1.35),c.position.set(0,e.r*.76,-e.l2*.68),o.add(c),r.add(o),a.add(r),u.push({knuckle:r,tip:o})}let d=new t;d.position.set(-.026*i,-.004,-.014),d.rotation.y=i*.48;let f=new P(new A(.0062,.024,8,14),n.skinNextGen);f.rotation.x=Math.PI/2,f.position.z=-.015,f.castShadow=!0,d.add(f);let p=new P(new D(.005,12,10),n.fingernailMat);p.scale.set(.95,.24,1.3),p.position.set(0,.005,-.023),d.add(p),a.add(d);function m(e=.45){u.forEach((t,n)=>{t.knuckle.rotation.x=-e*(.65+n*.07),t.tip.rotation.x=-e*.78}),d.rotation.x=-e*.35}return{group:a,fingers:u,thumb:d,setGrip:m}}function B(e,t,n,r=16){let i=new N(e.map(e=>new E(...e))),a=new P(new S(i,r,t,8,!1),n);return a.castShadow=!0,a}function V(e,a,o=1){let s=new t;s.scale.setScalar(o);let c=new C(.055,.0016,.05),l=[a.fr4EdgeMat,a.fr4EdgeMat,a.hmdCorePcbTopMat,a.hmdCorePcbTopMat,a.fr4EdgeMat,a.fr4EdgeMat],u=new P(c,l);u.castShadow=!0,u.receiveShadow=!0,s.add(u);let f=new r(.0018,.0018,.008,12);for(let[t,n]of[[-.0238,-.0215],[.0238,-.0215],[-.0238,.0215],[.0238,.0215]]){let r=new P(f,e.brass);r.position.set(t,-.004,n),s.add(r)}let p=new t;s.add(p);let m=new i({color:11830350,roughness:.35});[[-.018,-.005],[-.014,-.005],[-.01,-.005],[-.006,-.005],[.008,-.006],[.012,-.006],[.016,-.006],[.02,-.006],[-.018,.008],[-.013,.008],[.012,.008],[.017,.008],[.015,-.016],[.019,-.016],[.015,-.012],[.019,-.012]].forEach(([n,r],i)=>{let o=new t;o.position.set(n,.0012,r);let s=new P(new C(.002,8e-4,.0012),i%2==0?e.icPackage:m),c=new P(new C(4e-4,85e-5,.00125),a.solderBusbarMat);c.position.x=-9e-4;let l=c.clone();l.position.x=9e-4,o.add(s,c,l),p.add(o)});let h=new P(new C(.005,.0012,.005),e.icPackage);h.position.set(-.008,.0014,-.004),h.castShadow=!0,p.add(h);let g=new P(new C(.0065,.003,.0065),e.darkAnodized);g.position.set(.004,.0023,-.012),g.castShadow=!0,p.add(g);let _=new P(new C(.0062,.0016,.0035),e.icPackage);_.position.set(.014,.0016,-.006),p.add(_);let v=new t;v.position.set(.019,.0035,-.016);let y=new P(new r(.0045,.0045,.0055,22),e.icPackage);y.castShadow=!0;let b=new P(new r(.0012,.0012,.0058,14),e.rubberBlack);v.add(y,b),p.add(v);let x=new P(new C(.008,.0075,.015),e.xt60Yellow);x.position.set(-.023,.0045,0),x.castShadow=!0,p.add(x);let S=new n({color:1467700}),w=new P(new C(.0018,.001,.0012),S);w.position.set(.022,.0013,-.006),p.add(w);let T=new P(new A(.0026,.036,10,24),a.solderBusbarMat);T.rotation.z=Math.PI/2,T.scale.set(1,1,.48),T.position.set(.002,.0012,0),T.castShadow=!0,p.add(T);let E=new t;s.add(E);let O=new P(new C(.018,.0012,.024),e.pcbEsp);O.position.set(-.012,.0016,-.012);let k=new P(new C(.014,.0028,.016),e.chromeSteel);k.position.set(-.012,.0032,-.01),k.castShadow=!0,E.add(O,k);let j=new P(new C(.011,.0012,.009),new d({color:3223169,roughness:.3,clearcoat:.6}));j.position.set(.001,.0016,.009);let M=new P(new C(.0042,.0011,.0038),e.icPackage);M.position.set(.001,.0026,.009),E.add(j,M);let N=new P(new C(.0085,.0015,.0042),e.icPackage);N.position.set(-.014,.0016,.009),E.add(N);let F=[-.0175,-.006,.006,.0175];for(let n of F){let i=new t;i.position.set(n,.0032,.0205);let o=new P(new C(.0076,.0048,.0042),e.servoHornWhite);o.castShadow=!0;let s=new P(new C(.0076,.0068,.001),e.servoHornWhite);s.position.set(0,.001,-.0018),i.add(o,s);for(let e of[-.0025,0,.0025]){let t=new P(new r(35e-5,35e-5,.0055,8),a.goldEnigMat);t.position.set(e,8e-4,4e-4),i.add(t)}E.add(i)}let I=new t,L=new t,R=new t,z=new t;I.add(L,R,z),s.add(I);let V=new d({color:16007006,roughness:.24,clearcoat:.65}),H=new d({color:3718648,roughness:.24,clearcoat:.65}),U=new i({color:4140574,roughness:.85});for(let e of F){for(let t of[-.0025,.0025]){let n=new P(new C(.0016,45e-5,85e-5),U);n.position.set(e+t,92e-5,.0152);let r=new P(new C(.0015,48e-5,25e-5),a.goldEnigMat);r.position.set(e+t,95e-5,.0146),L.add(n,r)}R.add(B([[e-.0026,.0011,.0126],[e,.0021,.0152],[e+.0026,.0011,.0178]],38e-5,V,14),B([[e+.0026,.0011,.0126],[e,.0028,.0152],[e-.0026,.0011,.0178]],38e-5,H,14));let t=new P(new D(.003,18,12),a.uvMaskResinMat);t.scale.set(1.18,.38,1.08),t.position.set(e,.0014,.0152),z.add(t)}function W({stage:e=`bare`,busbarProgress:t=1,ledOn:n=!1,uvGlow:r=0}={}){p.visible=e!==`bare`,T.visible=t>.02,T.scale.set(Math.max(.02,t),1,.48),E.visible=e===`full_bug`||e===`knife_cut`||e===`x_jumper`||e===`uv_cured`,L.visible=e===`knife_cut`||e===`x_jumper`||e===`uv_cured`,R.visible=e===`x_jumper`||e===`uv_cured`,z.visible=e===`uv_cured`,S.color.setHex(n?4906624:1332013),a.uvMaskResinMat.emissiveIntensity=.22+r*2.2}return{root:s,setAssemblyState:W}}function H(e,a){let s=new t,u=new P(new C(.18,.008,.14),new d({color:16436245,roughness:.35,clearcoat:.4}));u.position.set(-.11,.004,-.03),u.rotation.y=.22,u.receiveShadow=!0,s.add(u);let p=new P(new C(.095,.028,.082),new d({color:1920728,roughness:.42,clearcoat:.25}));p.position.set(-.085,.018,-.04),p.rotation.y=.14,p.castShadow=!0,s.add(p);for(let t=0;t<4;t++){let n=V(e,a,1.35);n.setAssemblyState({stage:`bare`,busbarProgress:0}),n.root.position.set(.03+t*.022,.003+t*.0032,.02-t*.012),n.root.rotation.set(.04*t,-.18+t*.11,-.03*t),s.add(n.root)}let m=new t,h=new P(new r(.0045,.0052,.125,18),new d({color:16436245,roughness:.32,clearcoat:.35}));h.rotation.x=Math.PI/2,h.position.z=.075,h.castShadow=!0,m.add(h);let g=new P(new r(.0054,.005,.032,18),e.rubberBlack);g.rotation.x=Math.PI/2,g.position.z=.028,m.add(g);let _=new P(new r(.0032,.0044,.016,16),e.brass);_.rotation.x=Math.PI/2,_.position.z=.008,m.add(_);let v=new T;v.moveTo(0,0),v.lineTo(.014,.0045),v.lineTo(.014,5e-4),v.closePath();let y=new c(v,{depth:4e-4,bevelEnabled:!1}),b=new P(y,e.chromeSteel);b.rotation.y=Math.PI/2,b.position.set(-2e-4,-.001,-.012),m.add(b);let x=new t,S=new P(new r(.007,.007,.11,20),e.darkAnodized);S.position.y=.105,S.castShadow=!0;let w=new P(new r(.0062,.0062,.003,20),new n({color:12616956}));w.position.y=.049,x.add(S,w);let E=new n({color:9647082,transparent:!0,opacity:.18,side:2,depthWrite:!1,blending:2}),D=new P(new l(.036,.072,24,1,!0),E);D.position.y=.014,x.add(D);let O=new f(9647082,0,.38,1.4);O.position.set(0,.042,0),x.add(O);let k=new t,A=new P(new C(.072,.022,.035),a.lipoWrapBlue);A.position.y=.011,A.castShadow=!0,k.add(A);let j=new P(new o(.056,.024),new i({color:16317180,roughness:.4}));return j.rotation.x=-Math.PI/2,j.position.y=.0222,k.add(j),{unboxGroup:s,craftKnife:m,uvTorch:x,uvSpotLight:O,lipoPack:k}}export{L as a,R as i,V as n,I as o,z as r,F as s,H as t};