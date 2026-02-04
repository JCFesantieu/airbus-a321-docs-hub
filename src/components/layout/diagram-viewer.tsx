"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  RotateCcw, 
  RefreshCcw, 
  Maximize2,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface DiagramViewerProps {
  src: string;
  alt: string;
  className?: string;
}

export function DiagramViewer({ src, alt, className }: DiagramViewerProps) {
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.5, 5));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.5, 1));
  const handleRotate = () => setRotate(prev => prev + 90);
  const handleReset = () => {
    setScale(1);
    setRotate(0);
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      setIsFullscreen(true);
    } else {
      setIsFullscreen(false);
      handleReset();
    }
  };

  const Controls = ({ floating = false }: { floating?: boolean }) => (
    <div className={cn(
      "flex items-center gap-2 p-2 rounded-lg border bg-white/90 backdrop-blur shadow-sm",
      floating && "absolute bottom-4 left-1/2 -translate-x-1/2 z-10"
    )}>
      <Button variant="ghost" size="icon" onClick={handleZoomOut} disabled={scale <= 1}>
        <ZoomOut className="h-4 w-4" />
      </Button>
      <span className="text-[10px] font-bold min-w-[40px] text-center text-slate-500">
        {Math.round(scale * 100)}%
      </span>
      <Button variant="ghost" size="icon" onClick={handleZoomIn}>
        <ZoomIn className="h-4 w-4" />
      </Button>
      <div className="w-[1px] h-4 bg-slate-200 mx-1" />
      <Button variant="ghost" size="icon" onClick={handleRotate}>
        <RotateCw className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={handleReset}>
        <RefreshCcw className="h-4 w-4" />
      </Button>
      <div className="w-[1px] h-4 bg-slate-200 mx-1" />
      <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
        {isFullscreen ? <X className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
      </Button>
    </div>
  );

  return (
    <>
      <div className={cn("group relative w-full overflow-hidden rounded-lg bg-slate-100 border", className)}>
        {/* Main Viewer Area */}
        <div className="relative aspect-[16/9] w-full cursor-grab active:cursor-grabbing overflow-hidden">
          <motion.div
            animate={{ scale, rotate }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag={scale > 1}
            dragConstraints={{ left: -500, right: 500, top: -500, bottom: 500 }}
            className="relative h-full w-full"
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain p-4"
              draggable={false}
            />
          </motion.div>
        </div>

        {/* Overlay Controls */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <Controls />
        </div>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-12"
          >
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-6 right-6 text-white hover:bg-white/10"
              onClick={toggleFullscreen}
            >
              <X className="h-8 w-8" />
            </Button>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="relative h-full w-full cursor-grab active:cursor-grabbing"
            >
              <motion.div
                animate={{ scale, rotate }}
                drag
                dragConstraints={{ left: -1000, right: 1000, top: -1000, bottom: 1000 }}
                className="relative h-full w-full"
              >
                <Image
                  src={src}
                  alt={alt}
                  fill
                  className="object-contain"
                  draggable={false}
                />
              </motion.div>
            </motion.div>

            <Controls floating />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
