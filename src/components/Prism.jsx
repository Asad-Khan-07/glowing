import { useEffect, useRef } from 'react';

const Prism = ({
  height = 3.5,
  baseWidth = 5.5,
  animationType = 'rotate',
  glow = 1,
  offset = { x: 0, y: 0 },
  noise = 0,
  transparent = true,
  scale = 3.6,
  hueShift = 0,
  colorFrequency = 1,
  hoverStrength = 2,
  inertia = 0.05,
  bloom = 1,
  suspendWhenOffscreen = true,
  timeScale = 0.5
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const H      = Math.max(0.001, height);
    const BW     = Math.max(0.001, baseWidth);
    const BH     = BW * 0.5;
    const GLOW   = Math.max(0, glow);
    const NOISE  = Math.max(0, noise);
    const offX   = offset?.x ?? 0;
    const offY   = offset?.y ?? 0;
    const SAT    = transparent ? 1.5 : 1;
    const SCALE  = Math.max(0.001, scale);
    const HUE    = hueShift || 0;
    const CFREQ  = Math.max(0, colorFrequency || 1);
    const BLOOM  = Math.max(0, bloom || 1);
    const TS     = Math.max(0, timeScale || 0.5);
    const HOVSTR = Math.max(0, hoverStrength || 1);
    const INERT  = Math.max(0, Math.min(1, inertia || 0.05));

    // ── Canvas setup ──────────────────────────────────────────────
    const canvas = document.createElement('canvas');
    Object.assign(canvas.style, {
      position: 'absolute', inset: '0',
      width: '100%', height: '100%', display: 'block'
    });
    container.appendChild(canvas);

    // Cap DPR at 1.5 — biggest single perf win on retina screens
    const dpr = Math.min(1.5, window.devicePixelRatio || 1);

    const gl = canvas.getContext('webgl', {
      alpha: transparent,
      antialias: false,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: false
    });
    if (!gl) return;

    if (!transparent) {
      gl.disable(gl.BLEND);
    } else {
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    }
    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.CULL_FACE);

    // ── Shaders ───────────────────────────────────────────────────
    const vert = `attribute vec2 p; void main(){ gl_Position=vec4(p,0,1); }`;

    const frag = `
precision mediump float;

uniform vec2  iRes;
uniform float iTime;
uniform float uH;
uniform float uBH;
uniform float uGlow;
uniform float uBloom;
uniform float uCFreq;
uniform float uSat;
uniform float uNoise;
uniform float uHue;
uniform float uScale;
uniform float uOffX;
uniform float uOffY;
uniform float uTS;
uniform int   uWobble;
uniform mat3  uRot;

vec4 tanh4(vec4 x){ vec4 e=exp(clamp(2.0*x,-10.0,10.0)); return (e-1.0)/(e+1.0); }

float rand(vec2 co){ return fract(sin(dot(co,vec2(12.9898,78.233)))*43758.5453); }

float sdPrism(vec3 p){
  float iBH=1.0/uBH, iH=1.0/uH;
  vec3 q=vec3(abs(p.x)*iBH, abs(p.y)*iH, abs(p.z)*iBH);
  float m=q.x+q.y+q.z-1.0;
  float d=m*min(uBH,uH)*0.5774;
  return max(d,-p.y);
}

mat3 hueRot(float a){
  float c=cos(a),s=sin(a);
  return mat3(
    0.299+0.701*c+0.168*s, 0.587-0.587*c-0.330*s, 0.114-0.114*c+0.463*s,
    0.299-0.299*c-0.328*s, 0.587+0.413*c+0.035*s, 0.114-0.114*c-0.384*s,
    0.299-0.300*c+1.250*s, 0.587-0.588*c-1.050*s, 0.114+0.886*c-0.203*s
  );
}

void main(){
  vec2 f=(gl_FragCoord.xy - 0.5*iRes - vec2(uOffX,uOffY)) / (iRes.y*0.1*uScale);
  float t=iTime*uTS;

  mat2 wob=mat2(1.0);
  if(uWobble==1){
    wob=mat2(cos(t),cos(t+33.0),cos(t+11.0),cos(t));
  }

  float z=5.0, d=0.0;
  vec3 p;
  vec4 o=vec4(0.0);
  float cs=uH*0.25;

  // 48 steps — sweet spot: looks great, runs smooth
  for(int i=0;i<48;i++){
    p=vec3(f,z);
    p.xz=p.xz*wob;
    p=uRot*p;
    vec3 q=p; q.y+=cs;
    d=0.1+0.2*abs(sdPrism(q));
    z-=d;
    o+=(sin((p.y+z)*uCFreq+vec4(0,1,2,3))+1.0)/d;
  }

  o=tanh4(o*o*(uGlow*uBloom)/1e5);
  vec3 col=clamp(o.rgb,0.0,1.0);

  if(uNoise>0.001){
    float n=rand(gl_FragCoord.xy+vec2(iTime));
    col+=((n-0.5)*uNoise);
    col=clamp(col,0.0,1.0);
  }

  float L=dot(col,vec3(0.2126,0.7152,0.0722));
  col=clamp(mix(vec3(L),col,uSat),0.0,1.0);

  if(abs(uHue)>0.001){
    col=clamp(hueRot(uHue)*col,0.0,1.0);
  }

  gl_FragColor=vec4(col,o.a);
}`;

    // ── Compile & link ────────────────────────────────────────────
    function mkShader(type, src) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    }
    const prog = gl.createProgram();
    gl.attachShader(prog, mkShader(gl.VERTEX_SHADER, vert));
    gl.attachShader(prog, mkShader(gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    // Full-screen triangle
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
    const aP = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(aP);
    gl.vertexAttribPointer(aP, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const U = {};
    ['iRes','iTime','uH','uBH','uGlow','uBloom','uCFreq','uSat','uNoise',
     'uHue','uScale','uOffX','uOffY','uTS','uWobble','uRot'].forEach(n => {
      U[n] = gl.getUniformLocation(prog, n);
    });

    // Static uniforms
    gl.uniform1f(U.uH,     H);
    gl.uniform1f(U.uBH,    BH);
    gl.uniform1f(U.uGlow,  GLOW);
    gl.uniform1f(U.uBloom, BLOOM);
    gl.uniform1f(U.uCFreq, CFREQ);
    gl.uniform1f(U.uSat,   SAT);
    gl.uniform1f(U.uNoise, NOISE);
    gl.uniform1f(U.uHue,   HUE);
    gl.uniform1f(U.uScale, SCALE);
    gl.uniform1f(U.uTS,    TS);

    // Wobble
    const useWobble = animationType === 'rotate' ? 1 : 0;
    gl.uniform1i(U.uWobble, useWobble);

    // Rotation matrix (identity to start)
    const rotBuf = new Float32Array([1,0,0, 0,1,0, 0,0,1]);
    gl.uniformMatrix3fv(U.uRot, false, rotBuf);

    // ── Resize ────────────────────────────────────────────────────
    let W = 0, H2 = 0;
    function resize() {
      W  = Math.floor((container.clientWidth  || window.innerWidth)  * dpr);
      H2 = Math.floor((container.clientHeight || window.innerHeight) * dpr);
      canvas.width  = W;
      canvas.height = H2;
      gl.viewport(0, 0, W, H2);
      gl.uniform2f(U.iRes, W, H2);
      gl.uniform1f(U.uOffX, offX * dpr);
      gl.uniform1f(U.uOffY, offY * dpr);
    }
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    // ── Rotation helpers ──────────────────────────────────────────
    function setEuler(yaw, pitch, roll, out) {
      const cy=Math.cos(yaw),   sy=Math.sin(yaw);
      const cx=Math.cos(pitch), sx=Math.sin(pitch);
      const cz=Math.cos(roll),  sz=Math.sin(roll);
      out[0]=cy*cz+sy*sx*sz;  out[1]=cx*sz;  out[2]=-sy*cz+cy*sx*sz;
      out[3]=-cy*sz+sy*sx*cz; out[4]=cx*cz;  out[5]=sy*sz+cy*sx*cz;
      out[6]=sy*cx;           out[7]=-sx;    out[8]=cy*cx;
      return out;
    }

    // ── Pointer (hover mode) ──────────────────────────────────────
    let yaw=0, pitch=0, roll=0;
    let tYaw=0, tPitch=0;
    const ptr = { x:0, y:0, inside:false };
    const lerp = (a,b,t) => a+(b-a)*t;

    let onPM = null;
    const onLeave = () => { ptr.inside=false; };

    if (animationType === 'hover') {
      onPM = e => {
        const cx=window.innerWidth*0.5, cy=window.innerHeight*0.5;
        ptr.x = Math.max(-1, Math.min(1, (e.clientX-cx)/(window.innerWidth*0.5)));
        ptr.y = Math.max(-1, Math.min(1, (e.clientY-cy)/(window.innerHeight*0.5)));
        ptr.inside = true;
      };
      window.addEventListener('pointermove', onPM, { passive:true });
      window.addEventListener('mouseleave', onLeave);
    }

    // Random wobble params for 3drotate
    const wX=(0.3+Math.random()*0.6), wY=(0.2+Math.random()*0.7), wZ=(0.1+Math.random()*0.5);
    const phX=Math.random()*Math.PI*2, phZ=Math.random()*Math.PI*2;

    // ── Render loop ───────────────────────────────────────────────
    // Cap at 50fps — smooth but not burning GPU at 120fps
    const TARGET_MS = 1000 / 50;
    let raf = 0, lastFrame = 0, visible = true;
    const t0 = performance.now();

    function render(now) {
      raf = requestAnimationFrame(render);
      if (!visible || now - lastFrame < TARGET_MS) return;
      lastFrame = now;

      const time = (now - t0) * 0.001;
      gl.uniform1f(U.iTime, time);

      if (animationType === 'hover') {
        tYaw   = (ptr.inside ? -ptr.x : 0) * 0.6 * HOVSTR;
        tPitch = (ptr.inside ?  ptr.y : 0) * 0.6 * HOVSTR;
        yaw   = lerp(yaw,   tYaw,   INERT);
        pitch = lerp(pitch, tPitch, INERT);
        roll  = lerp(roll,  0,      0.1);
        gl.uniformMatrix3fv(U.uRot, false, setEuler(yaw, pitch, roll, rotBuf));
      } else if (animationType === '3drotate') {
        const ts = time * TS;
        yaw   = ts * wY;
        pitch = Math.sin(ts * wX + phX) * 0.6;
        roll  = Math.sin(ts * wZ + phZ) * 0.5;
        gl.uniformMatrix3fv(U.uRot, false, setEuler(yaw, pitch, roll, rotBuf));
      }
      // 'rotate' mode: wobble is done in shader, uRot stays identity

      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    // ── Suspend when offscreen ────────────────────────────────────
    let io = null;
    if (suspendWhenOffscreen) {
      io = new IntersectionObserver(entries => {
        visible = entries.some(e => e.isIntersecting);
      });
      io.observe(container);
    }

    raf = requestAnimationFrame(render);

    // ── Cleanup ───────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      if (io) io.disconnect();
      if (onPM) {
        window.removeEventListener('pointermove', onPM);
        window.removeEventListener('mouseleave', onLeave);
      }
      gl.deleteProgram(prog);
      gl.deleteBuffer(buf);
      if (canvas.parentElement === container) container.removeChild(canvas);
    };
  }, [
    height, baseWidth, animationType, glow, noise,
    offset?.x, offset?.y, scale, transparent,
    hueShift, colorFrequency, timeScale,
    hoverStrength, inertia, bloom, suspendWhenOffscreen
  ]);

  return <div className="w-full h-full relative" ref={containerRef} />;
};

export default Prism;