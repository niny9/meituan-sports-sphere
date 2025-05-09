
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface AI3DCharacterProps {
  isOpen: boolean;
}

const AI3DCharacter: React.FC<AI3DCharacterProps> = ({ isOpen }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const characterRef = useRef<THREE.Mesh | null>(null);
  const frameIdRef = useRef<number>(0);
  
  // Initialize 3D scene
  useEffect(() => {
    if (!mountRef.current) return;
    
    // Create scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Set up camera
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true // Transparent background
    });
    renderer.setSize(80, 80); // Small character size
    renderer.setClearColor(0x000000, 0); // Transparent background
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 10, 10);
    scene.add(directionalLight);
    
    // Create character (simplified for now - a stylized Meituan mascot)
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshPhongMaterial({ color: 0xFF6000 }); // Meituan orange
    const character = new THREE.Mesh(geometry, material);
    scene.add(character);
    characterRef.current = character;
    
    // Create ears (kangaroo-inspired)
    const earGeometry = new THREE.ConeGeometry(0.3, 0.7, 32);
    const earMaterial = new THREE.MeshPhongMaterial({ color: 0xFF6000 });
    
    const leftEar = new THREE.Mesh(earGeometry, earMaterial);
    leftEar.position.set(-0.7, 1, 0);
    leftEar.rotation.z = -Math.PI / 10;
    character.add(leftEar);
    
    const rightEar = new THREE.Mesh(earGeometry, earMaterial);
    rightEar.position.set(0.7, 1, 0);
    rightEar.rotation.z = Math.PI / 10;
    character.add(rightEar);
    
    // Animation function
    const animate = () => {
      if (!characterRef.current || !rendererRef.current || !sceneRef.current || !cameraRef.current) return;
      
      // "Breathing" animation
      const time = Date.now() * 0.001;
      characterRef.current.position.y = Math.sin(time * 1.5) * 0.1;
      characterRef.current.rotation.y = Math.sin(time) * 0.2;
      
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      frameIdRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Cleanup function
    return () => {
      if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current);
      if (rendererRef.current && mountRef.current && rendererRef.current.domElement) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);
  
  // Update character animation when the assistant state changes
  useEffect(() => {
    if (!characterRef.current) return;
    
    if (isOpen) {
      // Wave animation when opened
      characterRef.current.rotation.z = Math.PI / 12; // Slight tilt
      
      const waveAnimation = () => {
        if (!characterRef.current) return;
        characterRef.current.rotation.z = Math.PI / 12 * Math.sin(Date.now() * 0.005) + Math.PI / 12;
      };
      
      const animationInterval = setInterval(waveAnimation, 16);
      return () => clearInterval(animationInterval);
    } else {
      // Reset rotation when closed
      characterRef.current.rotation.z = 0;
    }
  }, [isOpen]);
  
  return (
    <div 
      ref={mountRef} 
      className={`ai-character-container ${isOpen ? 'active' : ''}`}
      style={{ 
        width: '80px',
        height: '80px',
        position: 'absolute',
        top: '-40px',
        left: '50%',
        transform: 'translateX(-50%)',
        pointerEvents: 'none'
      }}
    />
  );
};

export default AI3DCharacter;
