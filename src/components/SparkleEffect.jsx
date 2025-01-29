import { useEffect, useRef } from 'react';

const SparkleEffect = () => {
  const canvasRef = useRef(null);
  const sparklesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createSparkle = (x, y) => ({
      x: x + (Math.random() - 0.5) * 50,
      y: y + (Math.random() - 0.5) * 50,
      size: Math.random() * 1.5 + 0.5,
      life: 1,
      decay: Math.random() * 0.015 + 0.015
    });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Randomly add new sparkles near mouse position
      if (Math.random() < 0.2) {
        sparklesRef.current.push(createSparkle(mouseRef.current.x, mouseRef.current.y));
      }

      sparklesRef.current.forEach((sparkle, i) => {
        sparkle.life -= sparkle.decay;
        if (sparkle.life <= 0) {
          sparklesRef.current.splice(i, 1);
          return;
        }

        ctx.beginPath();
        ctx.arc(sparkle.x, sparkle.y, sparkle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${sparkle.life * 0.3})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener('resize', resize);
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
        zIndex: 1,
        filter: 'blur(1px)'
      }}
    />
  );
};

export default SparkleEffect;
