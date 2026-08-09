"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/shared/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { motion, useMotionValue, useTransform, useSpring } from "motion/react";
import { useEffect, useState, useRef } from "react";
import bgImage from "@/public/image-copy-3.png";

export default function NotFound() {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Mouse tracking state for background parallax offset
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const xOffset = (e.clientX / innerWidth - 0.5) * 30; // max 30px shift
      const yOffset = (e.clientY / innerHeight - 0.5) * 30;
      setMousePos({ x: xOffset, y: yOffset });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Motion values for card 3D tilt interaction
  const xVal = useMotionValue(0);
  const yVal = useMotionValue(0);

  // Tracks cursor offsets relative to the card center
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    xVal.set(mouseX / (width / 2));
    yVal.set(mouseY / (height / 2));
  };

  const handleCardMouseLeave = () => {
    xVal.set(0);
    yVal.set(0);
  };

  // Convert normalized coordinate to rotation angles (10 degrees max)
  const rotateXValue = useTransform(yVal, [-1, 1], [10, -10]);
  const rotateYValue = useTransform(xVal, [-1, 1], [-10, 10]);

  // Spring configurations for smooth organic lag curves
  const springConfig = { damping: 22, stiffness: 140, mass: 1 };
  const rotateX = useSpring(rotateXValue, springConfig);
  const rotateY = useSpring(rotateYValue, springConfig);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-screen bg-canvas px-6 py-12 text-center select-none overflow-hidden">
      {/* Parallax Background Image container shifting in opposition to the mouse cursor */}
      <motion.div 
        animate={{ x: -mousePos.x, y: -mousePos.y }}
        transition={{ type: "spring", damping: 30, stiffness: 80 }}
        className="absolute inset-0 z-0 w-full h-full scale-105"
      >
        <Image
          src={bgImage}
          alt="Background Signal Lost"
          width={1920}
          height={1080}
          className="w-full h-full object-cover select-none pointer-events-none"
          priority
        />
      </motion.div>

      {/* Interactive 3D tilting card container */}
      <motion.div 
        ref={cardRef}
        onMouseMove={handleCardMouseMove}
        onMouseLeave={handleCardMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", damping: 15 }}
        className="relative z-10 bg-surface/20 backdrop-blur-3xl border border-hairline-strong rounded-3xl p-8 sm:p-10 max-w-md w-full shadow-2xl flex flex-col items-center space-y-6 cursor-grab active:cursor-grabbing"
      >
        {/* Animated Big 404 Tag */}
        <motion.div 
          style={{ transform: "translateZ(50px)" }} // Pop effect in 3D space
          className="text-7xl sm:text-8xl font-sans font-black tracking-tight bg-gradient-to-b from-primary to-primary-hover bg-clip-text text-transparent"
        >
          404
        </motion.div>

        {/* Text descriptions */}
        <div style={{ transform: "translateZ(30px)" }} className="space-y-2">
          <h1 className="text-xl sm:text-2xl font-sans font-bold text-ink tracking-tight">
            Signal Offline
          </h1>
          <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
            The workstation coordinates you requested do not map to an active monitoring stream. Verify your route parameters and try again.
          </p>
        </div>

        {/* Action Button */}
        <motion.div
          style={{ transform: "translateZ(20px)" }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full pt-2"
        >
          <Link href="/dashboard" className="w-full">
            <Button className="w-full bg-primary hover:bg-primary-hover text-on-primary font-sans font-medium rounded-full py-3.5 shadow-md flex items-center justify-center gap-2 cursor-pointer transition-colors text-xs border-none">
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Dashboard</span>
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
