"use client";

import * as React from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip } from "@/components/ui/tooltip";

export function BackToTop() {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-24 right-7 z-40">
          <Tooltip content="Scroll to top" side="left">
            <motion.button
              type="button"
              onClick={scrollToTop}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Back to top of page"
              className="flex items-center justify-center w-11 h-11 rounded-full bg-card/90 backdrop-blur-md border border-border/80 text-foreground shadow-lg hover:border-electric hover:text-electric transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          </Tooltip>
        </div>
      )}
    </AnimatePresence>
  );
}
