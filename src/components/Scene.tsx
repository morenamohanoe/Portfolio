import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, MeshDistortMaterial, Float, Lightformer, Stars, ContactShadows, MeshReflectorMaterial } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Register GSAP plugins (handled in App, but good to ensure scoping)
gsap.registerPlugin(useGSAP);

function ShootingStar() {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);
  const refVelocity = useRef(new THREE.Vector3());
  const refOpacity = useRef(0);

  useFrame((state, delta) => {
    if (!meshRef.current || !matRef.current) return;
    
    if (refOpacity.current <= 0) {
      if (Math.random() < 0.003) { // Small chance to spawn each frame
        const startX = (Math.random() - 0.5) * 120;
        const startY = 10 + Math.random() * 40; 
        const startZ = -40 - Math.random() * 20; // Very far away
        
        meshRef.current.position.set(startX, startY, startZ);
        
        const vx = (Math.random() - 0.5) * 100;
        const vy = -20 - Math.random() * 60; 
        refVelocity.current.set(vx, vy, 0);
        
        const angle = Math.atan2(vy, vx);
        meshRef.current.rotation.z = angle;
        
        refOpacity.current = 0.5 + Math.random() * 0.5; // lifespan/initial opacity
      }
    } else {
      meshRef.current.position.addScaledVector(refVelocity.current, delta);
      refOpacity.current -= delta * 1.0;
      matRef.current.opacity = Math.max(0, refOpacity.current);
    }
  });

  return (
    <mesh ref={meshRef} position={[1000, 1000, 1000]}>
      <planeGeometry args={[12, 0.05]} />
      <meshBasicMaterial ref={matRef} color="#ffffff" transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} />
    </mesh>
  );
}

function ShootingStars() {
  return (
    <>
      <ShootingStar />
      <ShootingStar />
      <ShootingStar />
      <ShootingStar />
    </>
  );
}

function MilkyWay() {
  const pointsRef = useRef<THREE.Points>(null);
  const isMobile = useMemo(() => typeof window !== 'undefined' && window.innerWidth < 768, []);
  const count = isMobile ? 4000 : 15000;
  
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    
    const colorA = new THREE.Color('#0a0514'); // Very dark purple
    const colorB = new THREE.Color('#1f0a3d'); // Deep purple
    const colorC = new THREE.Color('#00ffcc'); // Cyan highlights
    const colorD = new THREE.Color('#ffffff'); // White spark 

    for (let i = 0; i < count; i++) {
        // Diagonal band
        const t = (Math.random() - 0.5) * 200; 
        const spreadX = (Math.random() - 0.5) * (Math.random() * 40); 
        const spreadY = (Math.random() - 0.5) * (Math.random() * 40); 
        
        const x = t + spreadX;
        const y = t * 0.4 + spreadY; 
        const z = -60 - Math.random() * 40; 
        
        pos[i * 3] = x;
        pos[i * 3 + 1] = y;
        pos[i * 3 + 2] = z;

        const randColor = Math.random();
        let mixColor = colorA;
        if (randColor > 0.98) mixColor = colorD;
        else if (randColor > 0.9) mixColor = colorC;
        else if (randColor > 0.4) mixColor = colorB;

        col[i * 3] = mixColor.r;
        col[i * 3 + 1] = mixColor.g;
        col[i * 3 + 2] = mixColor.b;
    }
    return { positions: pos, colors: col };
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
        pointsRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.02) * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.3}
        vertexColors
        transparent
        opacity={0.4}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

function BurstEffect({ position, onComplete }: { position: THREE.Vector3, onComplete: () => void }) {
  const pointsRef = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.PointsMaterial>(null);
  
  const { positions, velocities } = useMemo(() => {
    const count = 40;
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
        pos[i*3] = 0; pos[i*3+1] = 0; pos[i*3+2] = 0;
        
        // Random spherical distribution
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
        
        const speed = 2 + Math.random() * 3;
        vel[i*3] = Math.sin(phi) * Math.cos(theta) * speed;
        vel[i*3+1] = Math.sin(phi) * Math.sin(theta) * speed;
        vel[i*3+2] = Math.cos(phi) * speed;
    }
    return { positions: pos, velocities: vel };
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current || !matRef.current) return;
    
    if (matRef.current.opacity > 0) {
       const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
       for (let i = 0; i < 40; i++) {
           posAttr.array[i*3] += velocities[i*3] * delta;
           posAttr.array[i*3+1] += velocities[i*3+1] * delta;
           posAttr.array[i*3+2] += velocities[i*3+2] * delta;
       }
       posAttr.needsUpdate = true;
       matRef.current.opacity -= delta * 1.5;
    } else {
       onComplete();
    }
  });

  return (
    <points ref={pointsRef} position={position}>
       <bufferGeometry>
         <bufferAttribute attach="attributes-position" count={40} array={positions} itemSize={3} />
       </bufferGeometry>
       <pointsMaterial ref={matRef} size={0.06} color="#00ffcc" transparent opacity={1} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

function TheMorphingCore({ scrollY }: { scrollY: React.MutableRefObject<number> }) {
  const coreRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  
  const coreMatRef = useRef<any>(null);
  const wireMatRef = useRef<any>(null);
  const ringMatRef = useRef<any>(null);

  const [bursts, setBursts] = useState<{id: number, pos: THREE.Vector3}[]>([]);
  const [hovered, setHovered] = useState(false);
  const clickIntensity = useRef(0);

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    clickIntensity.current = 1.0;
    setBursts(prev => [...prev, { id: Date.now(), pos: e.point.clone() }]);
  };

  const removeBurst = (id: number) => {
    setBursts(prev => prev.filter(b => b.id !== id));
  };

  const isMobile = useMemo(() => typeof window !== 'undefined' && window.innerWidth < 768, []);
  const detail = isMobile ? 32 : 64;
  const wireSphereArgs = useMemo<[number, number, number]>(() => isMobile ? [1, 16, 8] : [1, 32, 16], [isMobile]);
  const ringArgs = useMemo<[number, number, number, number]>(() => isMobile ? [1.4, 2.0, 32, 2] : [1.4, 2.0, 64, 4], [isMobile]);
  const glowArgs = useMemo<[number, number]>(() => isMobile ? [1, 8] : [1, 16], [isMobile]);

  useFrame((state) => {
    if (!coreRef.current || !coreMatRef.current || !wireMatRef.current || !wireRef.current || !glowRef.current || !ringRef.current || !ringMatRef.current) return;
    
    // React to scroll velocity / position
    const scrollProgress = scrollY.current / (document.documentElement.scrollHeight - window.innerHeight || 1);
    
    // Rotate layers with varying speeds and directions for parallax depth
    const baseRotY = state.clock.elapsedTime * 0.2 + scrollProgress * Math.PI * 2;
    coreRef.current.rotation.y = baseRotY;
    coreRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    
    wireRef.current.rotation.y = baseRotY * 1.1;
    wireRef.current.rotation.x = state.clock.elapsedTime * 0.15;
    
    // Scale and Distort based on scroll beats
    let targetScale = hovered ? 1.1 : 1;
    let targetDistort = hovered ? 0.6 : 0.4;
    let targetSpeed = hovered ? 4 : 2;
    let coreOp = 0.8;
    let wireOp = 0.0;
    let ringOp = 0.0;

    // Decaying click intensity
    clickIntensity.current = THREE.MathUtils.lerp(clickIntensity.current, 0, 0.1);
    const clickBoost = clickIntensity.current * 0.5;
    targetScale += clickBoost;
    targetDistort += clickBoost;
    
    if (scrollProgress < 0.2) {
      // Beat 1: Inner Core
      const localP = scrollProgress / 0.2;
      targetScale = 1.2 + localP * 0.4;
      targetDistort = 0.4 + localP * 0.1;
      targetSpeed = 2 - localP * 1;
      coreOp = 0.9 - localP * 0.75; // Gets much dimmer
      wireOp = 0.0 + localP * 0.02;
      ringOp = 0;
    } else if (scrollProgress < 0.4) {
      // Beat 2: Expanded
      const localP = (scrollProgress - 0.2) / 0.2;
      targetScale = 1.6 + localP * 1.4;
      targetDistort = 0.5 - localP * 0.1; // Smooth out to become more stable
      targetSpeed = 1;
      coreOp = 0.15 - localP * 0.05; // Stay very dim for readability
      wireOp = 0.02 + localP * 0.05;
      ringOp = 0 + localP * 0.1; // Ring starts to form
    } else if (scrollProgress < 0.6) {
      // Beat 3: Intelligence (Planetary Hologram Transition)
      const localP = (scrollProgress - 0.4) / 0.2;
      targetScale = 3.0 - localP * 1.0;
      targetDistort = 0.4 - localP * 0.3; // Solidify into a planet
      targetSpeed = 1 + localP * 1;
      coreOp = 0.1 - localP * 0.05; // Reveal internal wireframe
      wireOp = 0.07 + localP * 0.15;
      ringOp = 0.1 + localP * 0.2;
    } else if (scrollProgress < 0.8) {
      // Beat 4: Ecosystem (Stable Cyber Planet)
      const localP = (scrollProgress - 0.6) / 0.2;
      targetScale = 2.0 - localP * 0.6; // 2.0 down to 1.4 to give cards more breathing room
      targetDistort = 0.1; // Very smooth, almost no glitch
      targetSpeed = 2.0 - localP * 1.7; // Smoothly decelerate from Beat 3
      coreOp = 0.05;
      wireOp = 0.22 - localP * 0.15; // Smoothly fade down
      ringOp = 0.3 - localP * 0.2; // Smoothly fade down
    } else {
      // Beat 5: Singular Light point (Hyper-warp)
      const localP = Math.min((scrollProgress - 0.8) / 0.15, 1);
      targetScale = 1.4 - localP * 1.35; 
      targetDistort = 0.1 + localP * 0.9; // Extreme distortion
      targetSpeed = 0.3 + localP * 9.7;
      coreOp = 0.05 + localP * 0.85;
      wireOp = 0.07 + localP * 0.73;
      ringOp = 0.1 - localP * 0.1;
    }

    // Smooth interpolations for transforms
    const scaleVec = new THREE.Vector3(targetScale, targetScale, targetScale);
    coreRef.current.scale.lerp(scaleVec, 0.05);
    
    // Wireframe sits almost exactly on top
    const wireScale = targetScale * 1.01;
    wireRef.current.scale.lerp(new THREE.Vector3(wireScale, wireScale, wireScale), 0.05);

    // Glow core scales proportionally
    glowRef.current.scale.lerp(new THREE.Vector3(targetScale * 0.4, targetScale * 0.4, targetScale * 0.4), 0.05);

    // Ring positioning and scaling
    const ringPulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.03;
    ringRef.current.scale.lerp(new THREE.Vector3(scaleVec.x * ringPulse, scaleVec.y * ringPulse, scaleVec.z * ringPulse), 0.05);

    // Subtle pointer interactivity (parallax)
    const targetPosX = state.pointer.x * 0.5;
    const targetPosY = state.pointer.y * 0.5;
    
    coreRef.current.position.lerp(new THREE.Vector3(targetPosX, targetPosY, 0), 0.05);
    wireRef.current.position.lerp(new THREE.Vector3(targetPosX * 1.2, targetPosY * 1.2, 0), 0.05);
    glowRef.current.position.lerp(new THREE.Vector3(targetPosX * 0.8, targetPosY * 0.8, 0), 0.05);
    ringRef.current.position.lerp(new THREE.Vector3(targetPosX * 1.4, targetPosY * 1.4, 0), 0.05);

    // Add pointer influence to rotation
    coreRef.current.rotation.x += state.pointer.y * 0.1;
    coreRef.current.rotation.y += state.pointer.x * 0.1;
    wireRef.current.rotation.x += state.pointer.y * 0.15;
    wireRef.current.rotation.y += state.pointer.x * 0.15;

    // Dynamic pulsing emissive effect for the wireframe (especially in Beat 3)
    const pulseIntensity = Math.sin(state.clock.elapsedTime * 4) * 0.5 + 0.5; // oscillating from 0 to 1
    
    let peakEmissive = 0.8;
    if (scrollProgress >= 0.2 && scrollProgress < 0.4) {
      const localP = (scrollProgress - 0.2) / 0.2;
      peakEmissive = 0.8 + localP * 1.2; 
    } else if (scrollProgress >= 0.4 && scrollProgress < 0.6) {
      peakEmissive = 2.0; 
    } else if (scrollProgress >= 0.6 && scrollProgress < 0.8) {
      const localP = (scrollProgress - 0.6) / 0.2;
      peakEmissive = 2.0 - localP * 1.2; 
    }

    const baseEmissive = hovered ? 0.8 : 0.4;
    wireMatRef.current.emissiveIntensity = THREE.MathUtils.lerp(
      wireMatRef.current.emissiveIntensity,
      baseEmissive + pulseIntensity * peakEmissive + clickIntensity.current * 3.0,
      0.1
    );

    // Update color based on hover
    const targetColor = hovered ? new THREE.Color("#ffffff") : new THREE.Color("#00ffcc");
    wireMatRef.current.color.lerp(targetColor, 0.1);
    wireMatRef.current.emissive.lerp(targetColor, 0.1);

    // Smooth material interpolations
    coreMatRef.current.distort = THREE.MathUtils.lerp(coreMatRef.current.distort, targetDistort, 0.05);
    coreMatRef.current.speed = THREE.MathUtils.lerp(coreMatRef.current.speed, targetSpeed, 0.05);
    coreMatRef.current.opacity = THREE.MathUtils.lerp(coreMatRef.current.opacity, coreOp, 0.05);
    
    // Notice we stopped using targetDistort * 1.5, which was causing severe spike glitches!
    wireMatRef.current.distort = THREE.MathUtils.lerp(wireMatRef.current.distort, targetDistort, 0.05);
    wireMatRef.current.speed = THREE.MathUtils.lerp(wireMatRef.current.speed, targetSpeed, 0.05);
    wireMatRef.current.opacity = THREE.MathUtils.lerp(wireMatRef.current.opacity, wireOp, 0.05);

    // Fade the ring in
    ringMatRef.current.opacity = THREE.MathUtils.lerp(ringMatRef.current.opacity, ringOp, 0.05);
    // Add dynamic wobble to ring
    const time = state.clock.elapsedTime;
    ringRef.current.rotation.x = -Math.PI * 0.45 + Math.sin(time * 0.5) * 0.15;
    ringRef.current.rotation.y = Math.cos(time * 0.3) * 0.15;
    ringRef.current.rotation.z += 0.005; // Gentle spinning
  });

  return (
    <>
      {bursts.map(b => (
        <BurstEffect key={b.id} position={b.pos} onComplete={() => removeBurst(b.id)} />
      ))}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* 1. Inner glowing core */}
        <mesh ref={glowRef}>
        <icosahedronGeometry args={glowArgs} />
        <meshBasicMaterial color="#00ffcc" transparent opacity={0.03} blending={THREE.AdditiveBlending} />
      </mesh>
      
      {/* 2. Main solid obsidian liquid */}
      <mesh 
        ref={coreRef} 
        onPointerDown={handlePointerDown} 
        onPointerOver={() => { 
          setHovered(true);
          document.body.style.cursor = 'pointer'; 
        }}
        onPointerOut={() => { 
          setHovered(false);
          document.body.style.cursor = 'auto'; 
        }}
      >
        <icosahedronGeometry args={[1, detail]} />
        <MeshDistortMaterial
          ref={coreMatRef}
          color="#010101"
          envMapIntensity={0.3}
          clearcoat={0.3}
          clearcoatRoughness={0.3}
          metalness={0.7}
          roughness={0.4}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* 3. Outer cyber planet wireframe - Sphere gives a lat/long sci-fi globe effect */}
      <mesh ref={wireRef}>
        <sphereGeometry args={wireSphereArgs} />
        <MeshDistortMaterial
          ref={wireMatRef}
          color="#00ffcc"
          emissive="#00ffcc"
          emissiveIntensity={0.8}
          wireframe
          transparent
          opacity={0}
        />
      </mesh>

      {/* 4. Sci-Fi Planetary Ring */}
      <mesh ref={ringRef}>
        <ringGeometry args={ringArgs} />
        <meshBasicMaterial
          ref={ringMatRef}
          color="#a1fced"
          transparent
          opacity={0}
          wireframe
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </Float>
    </>
  );
}

function ParticleLayer({ 
  count, 
  size, 
  color, 
  parallaxSpeed, 
  scrollY, 
  zRange,
  isMobile 
}: { 
  count: number, 
  size: number, 
  color: string, 
  parallaxSpeed: number, 
  scrollY: React.MutableRefObject<number>,
  zRange: [number, number],
  isMobile: boolean
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.PointsMaterial>(null);
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = Math.random() * (zRange[1] - zRange[0]) + zRange[0];
    }
    return pos;
  }, [count, zRange]);

  const lastScrollY = useRef(scrollY.current);
  const velocityRef = useRef(0);

  useFrame((state, delta) => {
    if (!pointsRef.current || !matRef.current) return;
    
    const currentScroll = scrollY.current;
    const scrollDelta = currentScroll - lastScrollY.current;
    lastScrollY.current = currentScroll;
    
    velocityRef.current = THREE.MathUtils.lerp(velocityRef.current, scrollDelta, 0.1);
    const speed = Math.abs(velocityRef.current);

    // 1. Dedicated Parallax for this layer depth
    const targetY = currentScroll * 0.001 * parallaxSpeed;
    pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, targetY, 0.08);

    // 2. Individual Rotation (layers orbit at different speeds)
    pointsRef.current.rotation.y += delta * (0.02 * parallaxSpeed) + velocityRef.current * 0.0002;
    pointsRef.current.rotation.z += delta * (0.01 * parallaxSpeed);

    // 3. Dynamic Warp / Stretch (Trails)
    const targetScaleY = 1 + speed * (0.005 * parallaxSpeed);
    pointsRef.current.scale.y = THREE.MathUtils.lerp(pointsRef.current.scale.y, targetScaleY, 0.1);

    // 4. Hover Parallax
    const targetPX = state.pointer.x * (0.5 * parallaxSpeed);
    pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, targetPX, 0.05);

    // 5. Reactive Material Properties
    const targetOpacity = Math.min(0.8, 0.2 + (speed * 0.01 * parallaxSpeed));
    matRef.current.opacity = THREE.MathUtils.lerp(matRef.current.opacity, targetOpacity, 0.1);
    
    const targetSize = isMobile ? (size * 1.2 + speed * 0.001) : (size + speed * 0.002);
    matRef.current.size = THREE.MathUtils.lerp(matRef.current.size, targetSize, 0.1);

    // Color reaction
    const colorTransition = Math.min(1, speed * 0.03);
    const baseColor = new THREE.Color(color);
    const fastColor = new THREE.Color("#ffffff");
    matRef.current.color.lerpColors(baseColor, fastColor, colorTransition);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        ref={matRef}
        size={size}
        color={color}
        transparent
        opacity={0.3}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

function ParticleSystem({ scrollY }: { scrollY: React.MutableRefObject<number> }) {
  const isMobile = useMemo(() => typeof window !== 'undefined' && window.innerWidth < 768, []);
  
  // Shared Camera Shake Logic for the system
  const lastScrollY = useRef(scrollY.current);
  const lastVelocity = useRef(0);
  const shakeAmount = useRef(0);

  useFrame((state) => {
    const currentScroll = scrollY.current;
    const scrollDelta = currentScroll - lastScrollY.current;
    lastScrollY.current = currentScroll;
    
    const acceleration = Math.abs(scrollDelta - lastVelocity.current);
    lastVelocity.current = scrollDelta;
    
    if (acceleration > 6) {
      shakeAmount.current = Math.min(shakeAmount.current + acceleration * 0.006, 0.06);
    }
    shakeAmount.current *= 0.92;
    
    if (shakeAmount.current > 0.001) {
      state.camera.position.x += (Math.random() - 0.5) * shakeAmount.current;
      state.camera.position.y += (Math.random() - 0.5) * shakeAmount.current;
    } else {
      state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, 0, 0.1);
      state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 0, 0.1);
    }
  });

  return (
    <group>
      {/* Background Layer: Slowest, small, faint */}
      <ParticleLayer 
        count={isMobile ? 500 : 1500} 
        size={0.015} 
        color="#2a3f4d" 
        parallaxSpeed={0.5} 
        scrollY={scrollY} 
        zRange={[-15, -10]}
        isMobile={isMobile}
      />
      
      {/* Midground Layer: Medium speed */}
      <ParticleLayer 
        count={isMobile ? 800 : 2000} 
        size={0.025} 
        color="#a1fced" 
        parallaxSpeed={1.2} 
        scrollY={scrollY} 
        zRange={[-8, -2]}
        isMobile={isMobile}
      />
      
      {/* Foreground Layer: Fastest, largest, reactive */}
      <ParticleLayer 
        count={isMobile ? 150 : 400} 
        size={0.05} 
        color="#00ffcc" 
        parallaxSpeed={3.0} 
        scrollY={scrollY} 
        zRange={[0, 4]}
        isMobile={isMobile}
      />
    </group>
  );
}

function PlanetarySurface({ scrollY }: { scrollY: React.MutableRefObject<number> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const shaderRef = useRef<any>(null);

  useFrame((state) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      shaderRef.current.uniforms.uScroll.value = scrollY.current * 0.0005;
    }
  });

  const shaderData = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uColorOcean: { value: new THREE.Color("#010a0f") },
      uColorLand: { value: new THREE.Color("#00ffcc") },
      uColorSecondary: { value: new THREE.Color("#ff00cc") }
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vPosition;
      void main() {
        vUv = uv;
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform float uScroll;
      uniform vec3 uColorOcean;
      uniform vec3 uColorLand;
      uniform vec3 uColorSecondary;
      varying vec2 vUv;
      varying vec3 vPosition;

      // 2D Simplex Noise
      vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
      float snoise(vec2 v){
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                 -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod(i, 289.0);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
          dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
        vec2 uv = vUv * 4.0;
        uv.y += uScroll;
        
        // Continent generation
        float n = 0.0;
        n += 1.0 * snoise(uv * 0.5);
        n += 0.5 * snoise(uv * 1.1);
        n += 0.25 * snoise(uv * 2.2);
        
        float landMask = smoothstep(-0.1, 0.2, n);
        
        // Deep turquoise oceans with pulse
        vec3 oceanColor = mix(uColorOcean, vec3(0.0, 0.2, 0.3), (snoise(uv * 0.3 + uTime * 0.05) + 1.0) * 0.5);
        
        // Land coloring: emerald green with magenta highlights
        float landType = snoise(uv * 1.5 + vec2(uTime * 0.02));
        vec3 landColor = mix(uColorLand, uColorSecondary, smoothstep(0.4, 0.7, landType));
        
        vec3 finalColor = mix(oceanColor, landColor, landMask);
        
        // Cyber cities (glowing yellow/orange dots in valleys/islands)
        float cityGlow = snoise(uv * 6.0);
        cityGlow = smoothstep(0.7, 0.9, cityGlow) * landMask;
        finalColor += vec3(1.0, 0.9, 0.3) * cityGlow * 1.5;
        
        // Atmospheric haze / horizon fade
        float dist = length(vPosition.xy);
        float fade = smoothstep(25.0, 0.0, dist);
        
        // Near-field bioluminescence pulse
        float bio = snoise(uv * 10.0 + uTime * 0.1);
        finalColor += uColorLand * smoothstep(0.8, 0.95, bio) * landMask * 0.5;

        gl_FragColor = vec4(finalColor, fade * 0.9);
      }
    `,
  }), []);

  return (
    <group position={[0, -4.6, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} ref={meshRef}>
        <planeGeometry args={[100, 100]} />
        <shaderMaterial
          ref={shaderRef}
          transparent
          vertexShader={shaderData.vertexShader}
          fragmentShader={shaderData.fragmentShader}
          uniforms={shaderData.uniforms}
          depthWrite={false}
        />
      </mesh>
      
      {/* Reflector layer on top for the Core's interaction */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[100, 100]} />
        <MeshReflectorMaterial
          blur={[400, 100]}
          resolution={512}
          mixBlur={1}
          mixStrength={40}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#111111"
          metalness={0.5}
          mirror={1}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}

export default function Scene({ scrollY }: { scrollY: React.MutableRefObject<number> }) {
  const isMobile = useMemo(() => typeof window !== 'undefined' && window.innerWidth < 768, []);
  const starsCount = isMobile ? 1500 : 5000;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, isMobile ? 1.5 : 2]}>
        <color attach="background" args={['#010103']} />
        <Stars radius={100} depth={50} count={starsCount} factor={4} saturation={0} fade speed={2} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#00ffcc" />
        <Environment resolution={256}>
          <Lightformer
            form="rect"
            intensity={10}
            position={[0, 5, -5]}
            scale={[10, 5, 1]}
            target={[0, 0, 0]}
          />
        </Environment>
        
        <ParticleSystem scrollY={scrollY} />
        <MilkyWay />
        <ShootingStars />
        <TheMorphingCore scrollY={scrollY} />

        {/* Improved Planetary Surface & Background depth */}
        {!isMobile && (
          <>
            <ContactShadows
              position={[0, -4.5, 0]}
              opacity={0.6}
              scale={20}
              blur={2.8}
              far={4.5}
              color="#00151a"
            />
            <PlanetarySurface scrollY={scrollY} />
          </>
        )}
      </Canvas>
    </div>
  );
}

