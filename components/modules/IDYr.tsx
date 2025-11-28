import React, { useRef, useEffect, useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export const IDYr: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [idea, setIdea] = useState('');
  const [isManifesting, setIsManifesting] = useState(false);

  // Simple Particle System for "Manifestation"
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: { x: number; y: number; vx: number; vy: number; size: number; color: string }[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 600;
      canvas.height = canvas.parentElement?.clientHeight || 400;
    };
    window.addEventListener('resize', resize);
    resize();

    const createParticles = (count: number, x: number, y: number, colorBase: string) => {
      for (let i = 0; i < count; i++) {
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          size: Math.random() * 3,
          color: colorBase
        });
      }
    };

    const render = () => {
      // Trail effect
      ctx.fillStyle = 'rgba(5, 10, 20, 0.2)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.size *= 0.96; // Shrink

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        if (p.size < 0.1) {
          particles.splice(i, 1);
          i--;
        }
      }

      // Idle ambient particles
      if (Math.random() < 0.1) {
        createParticles(1, Math.random() * canvas.width, Math.random() * canvas.height, 'rgba(0, 200, 255, 0.5)');
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Expose manifest function to React component
    (canvas as any).manifestBurst = () => {
      createParticles(100, canvas.width / 2, canvas.height / 2, '#7c3aed'); // Purple burst
      createParticles(100, canvas.width / 2, canvas.height / 2, '#00C8FF'); // Cyan burst
    };

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleManifest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea) return;
    setIsManifesting(true);
    
    // Trigger visual
    const canvas = canvasRef.current;
    if (canvas && (canvas as any).manifestBurst) {
      (canvas as any).manifestBurst();
    }

    setTimeout(() => {
      setIsManifesting(false);
      setIdea('');
    }, 2000);
  };

  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      {/* Visualizer Background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />
      
      <div className="relative z-10 p-8 flex flex-col items-center justify-center h-full text-center space-y-8">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tighter">
          Turn Thought <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-guild-accent to-guild-purple">Into Matter</span>
        </h2>
        
        <form onSubmit={handleManifest} className="w-full max-w-md relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-guild-accent to-guild-purple rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
          <div className="relative flex glass-panel rounded-xl p-2">
            <input 
              type="text" 
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="Describe your concept..." 
              className="flex-1 bg-transparent border-none outline-none text-white px-4 placeholder-slate-500 font-mono"
            />
            <button type="submit" className="bg-white text-black font-bold px-6 py-2 rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-2">
              {isManifesting ? 'Processing...' : <><Sparkles size={16}/> Manifest</>}
            </button>
          </div>
        </form>

        {isManifesting && (
          <div className="glass-panel px-6 py-4 rounded-xl border border-guild-success/50 text-guild-success font-mono text-sm animate-pulse">
            > Analyzing semantics... <br/>
            > Constructing vector space... <br/>
            > IDEA LOGGED.
          </div>
        )}
      </div>
    </div>
  );
};