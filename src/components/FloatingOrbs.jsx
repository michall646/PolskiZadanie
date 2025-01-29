import { useEffect, useRef } from 'react';

const FloatingOrbs = () => {
  const canvasRef = useRef(null);
  const orbsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createOrb = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 150 + 100, // Larger orbs
      baseSize: Math.random() * 150 + 100,
      speedX: (Math.random() - 0.5) * 0.2, // Slower movement
      speedY: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.15, // More subtle opacity
      baseOpacity: Math.random() * 0.15,
      phase: Math.random() * Math.PI * 2
    });

    const initOrbs = () => {
      orbsRef.current = Array(10).fill().map(createOrb);
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      orbsRef.current.forEach(orb => {
        // Calculate distance to mouse
        const dx = mouseRef.current.x - orb.x;
        const dy = mouseRef.current.y - orb.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 300;

        // Interactive effects based on mouse proximity
        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          
          // Repel from mouse
          orb.x -= (dx / distance) * force * 2;
          orb.y -= (dy / distance) * force * 2;
          
          // Increase size and opacity when close to mouse
          orb.size = orb.baseSize * (1 + force * 0.5);
          orb.opacity = orb.baseOpacity * (1 + force);
        } else {
          // Return to original size and opacity
          orb.size = orb.baseSize;
          orb.opacity = orb.baseOpacity;
        }

        // Smooth pulsing effect
        orb.phase += 0.02;
        const pulseFactor = 1 + Math.sin(orb.phase) * 0.1;
        const currentSize = orb.size * pulseFactor;

        // Update position with smooth movement
        orb.x += orb.speedX;
        orb.y += orb.speedY;

        // Bounce off edges with smooth transition
        if (orb.x < -currentSize) orb.x = canvas.width + currentSize;
        if (orb.x > canvas.width + currentSize) orb.x = -currentSize;
        if (orb.y < -currentSize) orb.y = canvas.height + currentSize;
        if (orb.y > canvas.height + currentSize) orb.y = -currentSize;

        // Draw orb with enhanced gradient
        const gradient = ctx.createRadialGradient(
          orb.x, orb.y, 0,
          orb.x, orb.y, currentSize
        );
        gradient.addColorStop(0, `rgba(255, 61, 71, ${orb.opacity * 0.1})`);
        gradient.addColorStop(0.5, `rgba(255, 61, 71, ${orb.opacity * 0.05})`);
        gradient.addColorStop(1, 'rgba(255, 61, 71, 0)');

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(orb.x, orb.y, currentSize, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    resize();
    initOrbs();
    animate();

    window.addEventListener('resize', () => {
      resize();
      initOrbs();
    });

    window.addEventListener('mousemove', (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    });

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: -1,
        filter: 'blur(40px)' // Increased blur for softer look
      }}
    />
  );
};

export default FloatingOrbs;
