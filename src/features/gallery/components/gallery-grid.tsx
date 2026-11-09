"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ImageOff } from "lucide-react";
import { GalleryCategory, GalleryItem } from "../types/gallery";
import { GALLERY_ITEMS } from "../data/gallery-data";
import { Container } from "@/components/ui/container";
import { GalleryFilters } from "./gallery-filters";
import { GalleryCard } from "./gallery-card";
import { GalleryLightbox } from "./gallery-lightbox";
import { Button } from "@/components/ui/button";

export function GalleryGrid() {
  const [activeCategory, setActiveCategory] = React.useState<GalleryCategory>("all");
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);

  // Filter items
  const filteredItems = React.useMemo(() => {
    if (activeCategory === "all") return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const handleOpenLightbox = (item: GalleryItem) => {
    const idx = filteredItems.findIndex((i) => i.id === item.id);
    if (idx !== -1) {
      setLightboxIndex(idx);
    }
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handleNavigateLightbox = (newIndex: number) => {
    setLightboxIndex(newIndex);
  };

  return (
    <section id="portfolio" className="py-16 md:py-24 bg-surface-secondary border-t border-border relative transition-colors duration-200">
      <Container>
        {/* Filters Header */}
        <div className="mb-12">
          <GalleryFilters
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            filteredCount={filteredItems.length}
          />
        </div>

        {/* Gallery Grid */}
        {filteredItems.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            <AnimatePresence>
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  className="flex"
                >
                  <GalleryCard
                    item={item}
                    onOpenLightbox={handleOpenLightbox}
                    priority={index < 4}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Empty State */
          <div className="py-20 text-center space-y-4 max-w-md mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mx-auto text-muted-foreground">
              <ImageOff className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold uppercase tracking-tight text-foreground">
              No Portfolio Images Found
            </h3>
            <p className="text-sm text-muted-foreground">
              There are currently no items in this category. Select another filter to view our work.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveCategory("all")}
              className="mt-2"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              Reset Filters
            </Button>
          </div>
        )}

        {/* Lightbox Modal Component */}
        <GalleryLightbox
          items={filteredItems}
          currentIndex={lightboxIndex}
          onClose={handleCloseLightbox}
          onNavigate={handleNavigateLightbox}
        />
      </Container>
    </section>
  );
}
