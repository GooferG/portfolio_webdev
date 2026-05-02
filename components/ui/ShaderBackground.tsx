'use client'

import { useEffect, useRef } from 'react'

const VERT = `
  attribute vec2 a_pos;
  void main() {
    gl_Position = vec4(a_pos, 0.0, 1.0);
  }
`

const FRAG = `
  precision mediump float;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_mouse;

  // Smooth gradient noise — softer than simplex, better for chrome flow
  vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(dot(hash(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
          dot(hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
      mix(dot(hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
          dot(hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 p = uv * 2.0 - 1.0;
    p.x *= u_resolution.x / u_resolution.y;

    // Mouse offset
    vec2 m = u_mouse / u_resolution.xy;
    m = m * 2.0 - 1.0;
    m.x *= u_resolution.x / u_resolution.y;

    float t = u_time * 0.15;

    // Domain warping — slow, large-scale flow for liquid feel
    vec2 q = p * 0.8;
    q += 0.6 * vec2(
      noise(q + t + m * 0.3),
      noise(q - t * 0.7 - m * 0.3)
    );

    // Single smooth noise sample, no fbm — keeps it clean and metallic
    float n = noise(q * 1.2 + t * 0.5);

    // Sharp banding for chrome highlights
    float bands = sin(n * 3.5 + p.x * 0.5 + t) * 0.5 + 0.5;
    bands = pow(bands, 2.5);

    // Chrome palette — mostly desaturated, subtle teal in shadows, white highlights
    vec3 bg        = vec3(0.039, 0.059, 0.118); // #0A0F1E
    vec3 shadow    = vec3(0.05, 0.12, 0.16);    // dark teal-gray
    vec3 midtone   = vec3(0.18, 0.32, 0.36);    // muted teal-gray
    vec3 highlight = vec3(0.85, 0.95, 0.95);    // near-white sheen

    vec3 col = mix(shadow, midtone, smoothstep(0.0, 0.5, n + 0.3));
    col = mix(col, highlight, bands * smoothstep(0.3, 0.9, n + 0.3));

    // Vignette — strong fade so center is brightest, edges blend to bg
    float vig = smoothstep(1.6, 0.2, length(p));
    col = mix(bg, col, vig * 0.5);

    gl_FragColor = vec4(col, 1.0);
  }
`

export function ShaderBackground({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl', { antialias: false, alpha: false })
    if (!gl) return

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!
      gl.shaderSource(sh, src)
      gl.compileShader(sh)
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(sh))
      }
      return sh
    }

    const program = gl.createProgram()!
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(program)
    gl.useProgram(program)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    )
    const a_pos = gl.getAttribLocation(program, 'a_pos')
    gl.enableVertexAttribArray(a_pos)
    gl.vertexAttribPointer(a_pos, 2, gl.FLOAT, false, 0, 0)

    const u_res = gl.getUniformLocation(program, 'u_resolution')
    const u_time = gl.getUniformLocation(program, 'u_time')
    const u_mouse = gl.getUniformLocation(program, 'u_mouse')

    let mouseX = 0
    let mouseY = 0
    let rafId = 0
    const start = performance.now()

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const w = canvas.clientWidth * dpr
      const h = canvas.clientHeight * dpr
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        gl.viewport(0, 0, w, h)
      }
    }

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      mouseX = (e.clientX - rect.left) * dpr
      mouseY = (rect.height - (e.clientY - rect.top)) * dpr
    }

    const render = () => {
      resize()
      gl.uniform2f(u_res, canvas.width, canvas.height)
      gl.uniform1f(u_time, (performance.now() - start) / 1000)
      gl.uniform2f(u_mouse, mouseX, mouseY)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
      rafId = requestAnimationFrame(render)
    }

    window.addEventListener('pointermove', onPointer)
    window.addEventListener('resize', resize)
    render()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      aria-hidden="true"
    />
  )
}
