import React, { useEffect, useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';

// A utility function for class names
const cn = (...classes: (string | boolean | undefined | null)[]) => classes.filter(Boolean).join(' ');

interface ParticleInstance {
  x: number;
  y: number;
  directionX: number;
  directionY: number;
  size: number;
  color: string;
  draw: () => void;
  update: () => void;
}

interface AetherFlowHeroProps {
  title?: string;
  subtitle?: string;
  badgeText?: string;
  primaryCtaText?: string;
  onPrimaryCtaClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}

export const AetherFlowHero: React.FC<AetherFlowHeroProps> = ({
  title = "Aether Flow",
  subtitle = "An intelligent, adaptive framework for creating fluid digital experiences that feel alive and respond to user interaction in real-time.",
  badgeText = "Dynamic Rendering Engine",
  primaryCtaText,
  onPrimaryCtaClick,
  children,
  className
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: ParticleInstance[] = [];
    const mouse: { x: number | null; y: number | null; radius: number } = {
      x: null,
      y: null,
      radius: 180,
    };

    class Particle implements ParticleInstance {
      x: number;
      y: number;
      directionX: number;
      directionY: number;
      size: number;
      color: string;

      constructor(
        x: number,
        y: number,
        directionX: number,
        directionY: number,
        size: number,
        color: string
      ) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        if (!canvas) return;
        if (this.x > canvas.width || this.x < 0) {
          this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.directionY = -this.directionY;
        }

        // Mouse collision detection
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius + this.size) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;
            this.x -= forceDirectionX * force * 5;
            this.y -= forceDirectionY * force * 5;
          }
        }

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }

    function init() {
      if (!canvas) return;
      particles = [];
      const numberOfParticles = Math.max(30, (canvas.height * canvas.width) / 9000);
      for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 2 + 1;
        const x = Math.random() * (canvas.width - size * 4) + size * 2;
        const y = Math.random() * (canvas.height - size * 4) + size * 2;
        const directionX = Math.random() * 0.4 - 0.2;
        const directionY = Math.random() * 0.4 - 0.2;
        const color = 'rgba(191, 128, 255, 0.85)'; // Brighter purple
        particles.push(new Particle(x, y, directionX, directionY, size, color));
      }
    }

    const resizeCanvas = () => {
      if (!canvas || !canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
      init();
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const connect = () => {
      if (!ctx || !canvas) return;
      let opacityValue = 1;
      const maxDistance = (canvas.width / 7) * (canvas.height / 7);

      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = dx * dx + dy * dy;

          if (distance < maxDistance) {
            opacityValue = 1 - distance / 20000;
            if (opacityValue < 0) opacityValue = 0;

            let isNearMouse = false;
            if (mouse.x !== null && mouse.y !== null) {
              const dx_mouse_a = particles[a].x - mouse.x;
              const dy_mouse_a = particles[a].y - mouse.y;
              const distance_mouse_a = Math.sqrt(
                dx_mouse_a * dx_mouse_a + dy_mouse_a * dy_mouse_a
              );
              if (distance_mouse_a < mouse.radius) {
                isNearMouse = true;
              }
            }

            if (isNearMouse) {
              ctx.strokeStyle = `rgba(255, 255, 255, ${opacityValue})`;
            } else {
              ctx.strokeStyle = `rgba(200, 150, 255, ${opacityValue * 0.6})`;
            }

            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!ctx || !canvas) return;

      // Set canvas background matching theme
      ctx.fillStyle = '#0b0716';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
      }
      connect();
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const targetEl = canvas.parentElement || window;
    targetEl.addEventListener('mousemove', handleMouseMove as EventListener);
    targetEl.addEventListener('mouseleave', handleMouseLeave as EventListener);

    init();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      targetEl.removeEventListener('mousemove', handleMouseMove as EventListener);
      targetEl.removeEventListener('mouseleave', handleMouseLeave as EventListener);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15 + 0.3,
        duration: 0.7,
        ease: 'easeInOut',
      },
    }),
  };

  return (
    <div
      className={cn(
        'relative w-full min-h-[580px] lg:min-h-[640px] flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-purple-900/30 shadow-2xl my-4',
        className
      )}
    >
      {/* The canvas is the primary interactive background */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-auto" />

      {/* Decorative gradient glowing spots */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Overlay HTML Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto text-center p-6 md:p-10 flex flex-col items-center pointer-events-auto">
        {badgeText && (
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 mb-6 backdrop-blur-md shadow-lg"
          >
            <Zap className="h-4 w-4 text-purple-400 animate-pulse" />
            <span className="text-xs md:text-sm font-semibold tracking-wide text-purple-200">
              {badgeText}
            </span>
          </motion.div>
        )}

        <motion.h1
          custom={1}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-purple-100 to-slate-400 leading-tight"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="max-w-3xl mx-auto text-sm md:text-lg text-slate-300 mb-8 leading-relaxed font-normal"
          >
            {subtitle}
          </motion.p>
        )}

        {children}

        {primaryCtaText && onPrimaryCtaClick && (
          <motion.div custom={3} variants={fadeUpVariants} initial="hidden" animate="visible" className="mt-6">
            <button
              onClick={onPrimaryCtaClick}
              className="px-8 py-3.5 bg-gradient-to-r from-purple-500 to-blue-600 text-white font-semibold rounded-xl shadow-xl hover:from-purple-600 hover:to-blue-700 transition-all duration-300 flex items-center gap-2 mx-auto transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              {primaryCtaText}
              <ArrowRight className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AetherFlowHero;
