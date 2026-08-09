"use client";

import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export default function NotFound() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const buttonContainerRef = useRef<HTMLDivElement>(null);
  const [glitchText, setGlitchText] = useState("404");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Track window mouse position for parallax drift and spacing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const xOffset = (e.clientX / innerWidth - 0.5) * 2;
      const yOffset = (e.clientY / innerHeight - 0.5) * 2;
      setMousePos({ x: xOffset, y: yOffset });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Motion values for letter spacing expansion
  const spacingValue = useMotionValue(0);
  
  useEffect(() => {
    const distance = Math.sqrt(mousePos.x * mousePos.x + mousePos.y * mousePos.y);
    spacingValue.set(distance);
  }, [mousePos, spacingValue]);

  // Map distance to letter spacing (from 0.05em to 0.7em for editorial expansion)
  const letterSpacing = useTransform(spacingValue, [0, 1.4], ["0.05em", "0.7em"]);
  const letterSpacingSpring = useSpring(letterSpacing, { damping: 25, stiffness: 100 });

  // Rotate text block in 3D perspective
  const rotateX = useSpring(useTransform(useMotionValue(mousePos.y), [-1, 1], [6, -6]), { damping: 20, stiffness: 120 });
  const rotateY = useSpring(useTransform(useMotionValue(mousePos.x), [-1, 1], [-6, 6]), { damping: 20, stiffness: 120 });

  // High performance Canvas Spotlight Coordinate Grid Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2, radius: 240 };
    const ripples: { x: number; y: number; radius: number; maxRadius: number; speed: number; opacity: number }[] = [];
    const spacing = 50;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleClick = (e: MouseEvent) => {
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: 250,
        speed: 6,
        opacity: 1,
      });
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    const render = () => {
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      // Clear canvas with trail bleed matching bg-canvas
      ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
      ctx.fillRect(0, 0, width, height);

      // Update and draw ripples
      ripples.forEach((ripple, idx) => {
        ripple.radius += ripple.speed;
        ripple.opacity = 1 - ripple.radius / ripple.maxRadius;

        ctx.strokeStyle = `rgba(0, 125, 90, ${ripple.opacity * 0.35})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.stroke();

        if (ripple.radius >= ripple.maxRadius) {
          ripples.splice(idx, 1);
        }
      });

      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const xNode = c * spacing;
          const yNode = r * spacing;

          const dx = mouse.x - xNode;
          const dy = mouse.y - yNode;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let angle = Math.atan2(dy, dx);
          let scale = 1;
          let offset = 0;

          // Scale and rotate crosshairs near the cursor
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            scale = 1 + force * 0.6;
            offset = force * 10;
          } else {
            angle = 0;
          }

          // Warp based on ripples
          ripples.forEach((ripple) => {
            const rdx = ripple.x - xNode;
            const rdy = ripple.y - yNode;
            const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
            const diff = Math.abs(rdist - ripple.radius);

            if (diff < 40) {
              const rippleForce = (40 - diff) / 40 * ripple.opacity;
              scale += rippleForce * 0.8;
              offset += rippleForce * 15;
              angle = Math.atan2(rdy, rdx) + Math.PI; // push away
            }
          });

          const xTarget = xNode - Math.cos(angle) * offset;
          const yTarget = yNode - Math.sin(angle) * offset;

          ctx.save();
          ctx.translate(xTarget, yTarget);
          ctx.rotate(angle);
          ctx.scale(scale, scale);

          // Draw minimalist coordinate crosshair (+), with dynamic spotlight opacity
          // Only show coordinate ticks clearly inside the cursor flashlight spotlight circle
          const opacity = dist < mouse.radius ? (1 - dist / mouse.radius) * 0.45 : 0.02;
          ctx.strokeStyle = `rgba(0, 125, 90, ${opacity})`;
          ctx.lineWidth = 1;

          ctx.beginPath();
          ctx.moveTo(-4, 0);
          ctx.lineTo(4, 0);
          ctx.moveTo(0, -4);
          ctx.lineTo(0, 4);
          ctx.stroke();

          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Text scramble glitch interaction on clicking the 404 text
  const triggerScramble = () => {
    const chars = "0123456789%@#&*?$/";
    let iterations = 0;
    const interval = setInterval(() => {
      setGlitchText(() =>
        "404"
          .split("")
          .map((_, index) => {
            if (index < iterations) return "404"[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      iterations += 1/3;
      if (iterations >= 3) {
        clearInterval(interval);
        setGlitchText("404");
      }
    }, 45);
  };

  // Magnetic Button Hover Physics using GSAP
  useEffect(() => {
    const btnContainer = buttonContainerRef.current;
    if (!btnContainer) return;

    const handleBtnMouseMove = (e: MouseEvent) => {
      const rect = btnContainer.getBoundingClientRect();
      const btnX = e.clientX - rect.left - rect.width / 2;
      const btnY = e.clientY - rect.top - rect.height / 2;

      // Attract the button towards the cursor coordinates smoothly
      gsap.to(".magnetic-button", {
        x: btnX * 0.35,
        y: btnY * 0.35,
        duration: 0.3,
        ease: "power2.out",
      });

      // Shift the internal arrow icon in direction of motion
      gsap.to(".magnetic-icon", {
        x: btnX * 0.15,
        y: btnY * 0.15,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleBtnMouseLeave = () => {
      // Elastic spring back to center coordinates
      gsap.to(".magnetic-button", {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.3)",
      });
      gsap.to(".magnetic-icon", {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    btnContainer.addEventListener("mousemove", handleBtnMouseMove);
    btnContainer.addEventListener("mouseleave", handleBtnMouseLeave);

    return () => {
      btnContainer.removeEventListener("mousemove", handleBtnMouseMove);
      btnContainer.removeEventListener("mouseleave", handleBtnMouseLeave);
    };
  }, []);

  // Mount stagger animation
  useEffect(() => {
    gsap.fromTo(".editorial-reveal",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out" }
    );
  }, []);

  return (
    <div className="relative flex flex-col justify-between min-h-screen w-screen bg-canvas p-8 sm:p-12 select-none overflow-hidden font-sans">
      {/* High Performance Vector Field Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Editorial Watermark Grid lines (very faint) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:8rem_8rem] opacity-30 -z-10" />

      {/* Top Header - Station identification */}
      <div className="editorial-reveal w-full flex justify-between items-start text-[10px] font-mono tracking-widest text-ink-faint uppercase z-10">
        <span>Noiseless / Workspace</span>
        <span>Status: 404 Signal Offline</span>
      </div>

      {/* Center Hero - Interactive kinetic editorial typography */}
      <div className="flex-1 flex flex-col justify-center items-center py-12 z-10">
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
          className="flex flex-col items-center max-w-2xl w-full"
        >
          {/* Big Editorial 404 Title with cursor-expanding spacing and click-scramble */}
          <motion.h1 
            onClick={triggerScramble}
            style={{ letterSpacing: letterSpacingSpring }}
            className="text-[120px] sm:text-[180px] font-sans font-black text-ink tracking-normal leading-none select-none text-center cursor-pointer transform-gpu hover:text-primary transition-colors duration-200"
          >
            {glitchText}
          </motion.h1>

          {/* Editorial Asymmetric Copy Layout */}
          <div className="editorial-reveal grid grid-cols-1 md:grid-cols-12 gap-6 mt-8 text-left w-full border-t border-hairline pt-6">
            <div className="md:col-span-4 text-[10px] font-mono tracking-widest text-primary uppercase font-bold">
              Coordinates Unresolved
            </div>
            <div className="md:col-span-8 space-y-4">
              <h2 className="text-xl sm:text-2xl font-sans font-semibold text-ink tracking-tight">
                This destination does not exist.
              </h2>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-sans">
                The intelligence stream requested cannot be mapped. Tap the digits above to resynchronize, or return to the monitoring cockpit.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Footer - Minimal action buttons and coordinates */}
      <div className="editorial-reveal w-full flex flex-col sm:flex-row justify-between items-center gap-6 border-t border-hairline pt-8 z-10">
        <div className="text-[10px] font-mono text-ink-faint uppercase text-center sm:text-left">
          [System Code: Stream_Fragment_Fault]
        </div>

        {/* Magnetic Button Container Wrapper */}
        <div 
          ref={buttonContainerRef}
          className="relative p-6 -m-6 flex items-center justify-center shrink-0"
        >
          <Link href="/dashboard">
            <Button className="magnetic-button bg-primary hover:bg-primary-hover text-on-primary font-sans font-medium rounded-full px-6 py-4 shadow-sm flex items-center gap-2 cursor-pointer transition-transform duration-75 text-xs border-none h-11">
              <ArrowLeft className="magnetic-icon w-4 h-4 transition-transform duration-75" />
              <span>Return to Dashboard</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
