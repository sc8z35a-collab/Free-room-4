import{C as e,G as t,H as n,N as r,P as i,T as a,W as o,Y as s,_ as c,_t as l,at as u,ct as d,f,g as p,gt as m,h,ht as g,it as _,nt as v,ot as y,v as b,w as x,x as S,yt as C,z as w}from"./optimizer.js";var T=class{constructor(e,t,r,o=1){this.renderer=e,this.renderScale=o,this.fullWidth=Math.max(2,Math.floor(t)),this.fullHeight=Math.max(2,Math.floor(r));let c=e.getContext(),d=c.getExtension(`EXT_color_buffer_half_float`)||c.getExtension(`EXT_color_buffer_float`)?i:g,f=Math.max(2,Math.floor(this.fullWidth*o)),_=Math.max(2,Math.floor(this.fullHeight*o)),v=new a(f,_);v.format=x,v.type=m,this.sceneRT=new C(f,_,{type:d,minFilter:w,magFilter:w,depthBuffer:!0,depthTexture:v}),this.bloomA=new C(Math.max(2,f>>2),Math.max(2,_>>2),{type:d,minFilter:w,magFilter:w,depthBuffer:!1}),this.bloomB=new C(Math.max(2,f>>3),Math.max(2,_>>3),{type:d,minFilter:w,magFilter:w,depthBuffer:!1}),this.fsCam=new s(-1,1,1,-1,0,1);let b=new p;b.setAttribute(`position`,new h(new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),3)),b.setAttribute(`uv`,new h(new Float32Array([0,0,2,0,0,2]),2)),this.extractMat=new y({uniforms:{tScene:{value:this.sceneRT.texture},uTexel:{value:new l(1/f,1/_)},uThreshold:{value:.88}},depthTest:!1,depthWrite:!1,vertexShader:`varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,fragmentShader:`
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
      `}),this.blurMat=new y({uniforms:{tInput:{value:this.bloomA.texture},uTexel:{value:new l(4/f,4/_)}},depthTest:!1,depthWrite:!1,vertexShader:`varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,fragmentShader:`
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
      `}),this.compositeMat=new y({uniforms:{tScene:{value:this.sceneRT.texture},tDepth:{value:this.sceneRT.depthTexture},tBloom:{value:this.bloomB.texture},uTexel:{value:new l(1/f,1/_)},uNear:{value:.015},uFar:{value:120},uFocusDist:{value:.45},uAperture:{value:.012},uAoStrength:{value:.52},uBloomStrength:{value:.24},uSharpness:{value:.36},uWarmth:{value:.08},uVignette:{value:.24},uFlash:{value:0},uChromatic:{value:0},uGrain:{value:.016},uExposure:{value:1.08},uTime:{value:0}},depthTest:!1,depthWrite:!1,vertexShader:`varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,fragmentShader:`
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
      `}),this.extractScene=new u,this.extractScene.add(new n(b,this.extractMat)),this.blurScene=new u,this.blurScene.add(new n(b,this.blurMat)),this.compositeScene=new u,this.compositeScene.add(new n(b,this.compositeMat)),this.lastSceneCalls=0,this.lastTotalCalls=0,this.lastSceneTriangles=0}setSize(e,t,n=this.renderScale){this.fullWidth=Math.max(2,Math.floor(e)),this.fullHeight=Math.max(2,Math.floor(t)),this.renderScale=n;let r=Math.max(2,Math.floor(this.fullWidth*n)),i=Math.max(2,Math.floor(this.fullHeight*n));this.sceneRT.setSize(r,i),this.bloomA.setSize(Math.max(2,r>>2),Math.max(2,i>>2)),this.bloomB.setSize(Math.max(2,r>>3),Math.max(2,i>>3)),this.extractMat.uniforms.uTexel.value.set(1/r,1/i),this.blurMat.uniforms.uTexel.value.set(4/r,4/i),this.compositeMat.uniforms.uTexel.value.set(1/r,1/i)}render(e,t,n={}){let r=this.renderer,i=r.toneMapping;r.toneMapping=0,r.setRenderTarget(this.sceneRT),r.clear(),r.render(e,t),this.lastSceneCalls=r.info.render.calls,this.lastSceneTriangles=r.info.render.triangles;let a=1,o=n.bloomStrength??.24;o>.005&&(r.setRenderTarget(this.bloomA),r.render(this.extractScene,this.fsCam),r.setRenderTarget(this.bloomB),r.render(this.blurScene,this.fsCam),a+=2);let s=this.compositeMat.uniforms;s.uNear.value=t.near,s.uFar.value=t.far,s.uFocusDist.value=n.focusDist??.45,s.uAperture.value=n.aperture??.011,s.uAoStrength.value=n.aoStrength??.52,s.uBloomStrength.value=o*1.25,s.uWarmth.value=n.warmth??.08,s.uFlash.value=n.flash??0,s.uChromatic.value=n.chromatic??.004,s.uTime.value=n.time??0,r.setRenderTarget(null),r.render(this.compositeScene,this.fsCam),this.lastTotalCalls=this.lastSceneCalls+a,r.toneMapping=i}dispose(){this.sceneRT.depthTexture?.dispose(),this.sceneRT.dispose(),this.bloomA.dispose(),this.bloomB.dispose()}};function E(e,t=2.4,n=1,r=1){let i=e.width,a=e.height,o=e.getContext(`2d`).getImageData(0,0,i,a).data,s=document.createElement(`canvas`);s.width=i,s.height=a;let l=s.getContext(`2d`),u=l.createImageData(i,a),d=u.data,f=(e,t)=>{let n=(e%i+i)%i,r=(t%a+a)%a;return o[(r*i+n)*4]/255};for(let e=0;e<a;e++)for(let n=0;n<i;n++){let r=(f(n+1,e)-f(n-1,e))*t,a=(f(n,e+1)-f(n,e-1))*t,o=-r,s=a,c=1,l=1/Math.hypot(o,s,c);o*=l,s*=l,c*=l;let u=(e*i+n)*4;d[u]=Math.round((o*.5+.5)*255),d[u+1]=Math.round((s*.5+.5)*255),d[u+2]=Math.round((c*.5+.5)*255),d[u+3]=255}l.putImageData(u,0,0);let p=new c(s);return p.wrapS=v,p.wrapT=v,p.repeat.set(n,r),p.anisotropy=8,p}function D(e){let t=1024,n=document.createElement(`canvas`);n.width=t,n.height=512;let r=n.getContext(`2d`),i=r.createLinearGradient(0,0,0,512);i.addColorStop(0,`#dce8f8`),i.addColorStop(.28,`#cbd5e1`),i.addColorStop(.48,`#64748b`),i.addColorStop(.52,`#3b332b`),i.addColorStop(1,`#181411`),r.fillStyle=i,r.fillRect(0,0,t,512);let a=(e,n,i,a,o)=>{let s=r.createRadialGradient(e,n,4,e,n,Math.max(i,a));s.addColorStop(0,o),s.addColorStop(.55,o.replace(`0.98`,`0.35`)),s.addColorStop(1,`rgba(255,255,255,0)`),r.fillStyle=s,r.fillRect(0,0,t,512)};a(t*.24,153.6,180,110,`rgba(235, 246, 255, 0.98)`),a(t*.72,122.88,165,95,`rgba(255, 232, 185, 0.98)`),r.fillStyle=`rgba(255, 255, 255, 0.92)`,r.fillRect(t*.44,56.32,t*.16,17.92),r.fillStyle=`rgba(255, 242, 210, 0.85)`,r.fillRect(t*.66,81.92,t*.09,12.8);let o=new c(n);o.mapping=303,o.colorSpace=_;let s=new f(e);s.compileEquirectangularShader();let l=s.fromEquirectangular(o);return o.dispose(),s.dispose(),l}function O(){let e=document.createElement(`canvas`);e.width=1024,e.height=1024;let n=e.getContext(`2d`),r=document.createElement(`canvas`);r.width=1024,r.height=1024;let i=r.getContext(`2d`),a=document.createElement(`canvas`);a.width=1024,a.height=1024;let s=a.getContext(`2d`);n.fillStyle=`#075e36`,n.fillRect(0,0,1024,1024),i.fillStyle=`#707070`,i.fillRect(0,0,1024,1024),s.fillStyle=`#2e2e2e`,s.fillRect(0,0,1024,1024),n.strokeStyle=`#0d7a47`,i.strokeStyle=`#b8b8b8`,n.lineWidth=7,i.lineWidth=8;for(let e=0;e<22;e++){let t=90+e*38;n.beginPath(),n.moveTo(95,t),n.lineTo(360,t),n.lineTo(410,t+(e%2==0?22:-22)),n.lineTo(920,t+(e%2==0?22:-22)),n.stroke(),i.beginPath(),i.moveTo(95,t),i.lineTo(360,t),i.lineTo(410,t+(e%2==0?22:-22)),i.lineTo(920,t+(e%2==0?22:-22)),i.stroke()}n.fillStyle=`#eab308`,n.fillRect(110,448,804,128),n.fillStyle=`#fde047`,n.fillRect(116,456,792,112),i.fillStyle=`#d8d8d8`,i.fillRect(110,448,804,128),s.fillStyle=`#181818`,s.fillRect(110,448,804,128);let u=(e,t,r=9)=>{n.fillStyle=`#fbbf24`,n.beginPath(),n.arc(e,t,r,0,Math.PI*2),n.fill(),n.fillStyle=`#041f12`,n.beginPath(),n.arc(e,t,r*.45,0,Math.PI*2),n.fill(),i.fillStyle=`#202020`,i.beginPath(),i.arc(e,t,r*.5,0,Math.PI*2),i.fill()};for(let e=140;e<=884;e+=38)u(e,472,8),u(e,552,8);for(let e=120;e<=900;e+=76)for(let t of[120,904])u(e,t,7);for(let[e,t]of[[68,68],[956,68],[68,956],[956,956]])n.fillStyle=`#facc15`,n.beginPath(),n.arc(e,t,34,0,Math.PI*2),n.fill(),n.fillStyle=`#090d12`,n.beginPath(),n.arc(e,t,18,0,Math.PI*2),n.fill();n.fillStyle=`#f8fafc`,s.fillStyle=`#a0a0a0`,n.font=`900 38px monospace`,n.fillText(`HMD-CORE-v1  Rev 1.0`,128,78),n.font=`800 30px monospace`,n.fillText(`Designed by M.Saeki`,545,968),n.font=`800 22px monospace`,n.fillText(`PORT1:R_LEG`,135,868),n.fillText(`PORT2:L_LEG`,335,868),n.fillText(`PORT3:R_ARM`,545,868),n.fillText(`PORT4:L_ARM`,755,868),n.fillText(`3S LiPo 12.6V`,120,432),n.fillText(`Q1:4mΩ IDEAL DIODE`,360,432),n.fillText(`BNO085 IMU (CoM)`,415,622),n.fillText(`BZ1 10.2V`,815,220),n.strokeStyle=`#f8fafc`,n.lineWidth=4,n.strokeRect(130,140,290,240),n.strokeRect(435,640,165,130);for(let e of[155,355,565,775])n.strokeRect(e,882,115,56);let d=new c(e);d.colorSpace=_,d.anisotropy=8;let f=E(r,2.8),p=new c(a),m=new o({map:d,normalMap:f,normalScale:new l(.55,.55),roughnessMap:p,roughness:.85,metalness:.18,clearcoat:.92,clearcoatRoughness:.09}),h=new t({color:13152888,roughness:.62}),g=document.createElement(`canvas`);g.width=1024,g.height=512;let v=g.getContext(`2d`),y=document.createElement(`canvas`);y.width=512,y.height=256;let b=y.getContext(`2d`);v.fillStyle=`#d9be93`,v.fillRect(0,0,1024,512),b.fillStyle=`#808080`,b.fillRect(0,0,512,256);for(let e=0;e<512;e+=2){let t=Math.sin(e*.035)*18+Math.cos(e*.09)*7,n=205+Math.sin((e+t)*.14)*18;v.fillStyle=`rgb(${n+12}, ${n-14}, ${n-52})`,v.fillRect(0,e,1024,2)}for(let e=0;e<320;e++)b.fillStyle=e%2==0?`rgba(255,255,255,0.12)`:`rgba(0,0,0,0.12)`,b.fillRect(0,Math.random()*256,512,1.5);let x=new c(g);x.colorSpace=_,x.anisotropy=8;let C=E(y,1.8),w=new o({map:x,normalMap:C,normalScale:new l(.35,.35),roughness:.58,clearcoat:.08}),T=document.createElement(`canvas`);T.width=1024,T.height=512;let D=T.getContext(`2d`),O=D.createLinearGradient(0,0,1024,0);O.addColorStop(0,`#4a2f1d`),O.addColorStop(.5,`#5b3b25`),O.addColorStop(1,`#462c1a`),D.fillStyle=O,D.fillRect(0,0,1024,512);for(let e=0;e<480;e++)D.fillStyle=e%2==0?`rgba(22,10,4,0.16)`:`rgba(145,98,62,0.09)`,D.fillRect(0,Math.random()*512,1024,1+Math.random()*2.5);let k=new c(T);k.colorSpace=_,k.anisotropy=8;let A=new o({map:k,normalMap:C,normalScale:new l(.22,.22),roughness:.32,metalness:.02,clearcoat:.36,clearcoatRoughness:.24}),j=document.createElement(`canvas`);j.width=256,j.height=256;let M=j.getContext(`2d`);M.fillStyle=`#808080`,M.fillRect(0,0,256,256);for(let e=0;e<2400;e++)M.fillStyle=e%2==0?`#949494`:`#6b6b6b`,M.fillRect(Math.random()*256,Math.random()*256,2,1.5);let N=E(j,1.3,4,4);return{hmdCorePcbTopMat:m,fr4EdgeMat:h,birchPlywoodMat:w,walnutProMat:A,skinNextGen:new o({color:15646882,normalMap:N,normalScale:new l(.18,.18),roughness:.52,sheen:.34,sheenRoughness:.62,sheenColor:new S(16758942),clearcoat:.06,clearcoatRoughness:.5}),fingernailMat:new o({color:16243922,roughness:.18,clearcoat:.92,clearcoatRoughness:.08}),goldEnigMat:new o({color:16498468,metalness:.98,roughness:.11,clearcoat:.5}),solderBusbarMat:new o({color:15659768,normalMap:N,normalScale:new l(.08,.08),metalness:.99,roughness:.07,clearcoat:.75}),uvMaskResinMat:new o({color:1096065,emissive:366185,emissiveIntensity:.25,transparent:!0,opacity:.88,roughness:.08,clearcoat:1}),lipoWrapBlue:new o({color:165063,roughness:.24,metalness:.12,clearcoat:.75,clearcoatRoughness:.15})}}function k(t,i,a=1){let o=new r,s=new n(new e(.036,.03,.2,24),t.hoodieNavy);s.rotation.x=Math.PI/2,s.position.set(0,0,.145),s.castShadow=!0,o.add(s);let c=new n(new e(.026,.025,.045,20),i.skinNextGen);c.rotation.x=Math.PI/2,c.position.set(0,0,.032),o.add(c);let l=new n(new d(.03,24,18),i.skinNextGen);l.scale.set(.98,.42,1.15),l.position.set(0,0,-.004),l.castShadow=!0,o.add(l);let u=[{x:-.02*a,r:.0056,l1:.024,l2:.019},{x:-.007*a,r:.0059,l1:.026,l2:.021},{x:.006*a,r:.0055,l1:.024,l2:.019},{x:.018*a,r:.0049,l1:.019,l2:.016}],f=[];for(let e of u){let t=new r;t.position.set(e.x,.001,-.032);let a=new n(new b(e.r,e.l1,8,14),i.skinNextGen);a.rotation.x=Math.PI/2,a.position.z=-e.l1*.5,a.castShadow=!0,t.add(a);let s=new r;s.position.z=-e.l1-e.r*.25;let c=new n(new b(e.r*.88,e.l2,8,14),i.skinNextGen);c.rotation.x=Math.PI/2,c.position.z=-e.l2*.5,c.castShadow=!0,s.add(c);let l=new n(new d(e.r*.78,14,10),i.fingernailMat);l.scale.set(.92,.24,1.35),l.position.set(0,e.r*.76,-e.l2*.68),s.add(l),t.add(s),o.add(t),f.push({knuckle:t,tip:s})}let p=new r;p.position.set(-.026*a,-.004,-.014),p.rotation.y=a*.48;let m=new n(new b(.0062,.024,8,14),i.skinNextGen);m.rotation.x=Math.PI/2,m.position.z=-.015,m.castShadow=!0,p.add(m);let h=new n(new d(.005,12,10),i.fingernailMat);h.scale.set(.95,.24,1.3),h.position.set(0,.005,-.023),p.add(h),o.add(p);function g(e=.45){f.forEach((t,n)=>{t.knuckle.rotation.x=-e*(.65+n*.07),t.tip.rotation.x=-e*.78}),p.rotation.x=-e*.35}return{group:o,fingers:f,thumb:p,setGrip:g}}export{T as a,E as i,O as n,D as r,k as t};