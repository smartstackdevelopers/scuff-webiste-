"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowRight, Clock, Car, Sparkles, Check } from "lucide-react";
import { TransformationCase } from "../types/gallery";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TransformationCardProps {
  item: TransformationCase;
  isSelected?: boolean;
  onSelect: (item: TransformationCase) => void;
}

export function TransformationCard({
  item,
  isSelected = false,
  onSelect,
}: TransformationCardProps) {
  return (
    <Card
      onClick={() => onSelect(item)}
      className={`cursor-pointer transition-all duration-300 p-5 flex flex-col justify-between h-full bg-card/90 border shadow-md group ${
        isSelected
          ? "border-2 border-electric shadow-glow-blue"
          : "border-border/80 hover:border-electric/50"
      }`}
    >
      <CardHeader className="p-0 space-y-3 pb-4">
        {/* Before / After Preview Strip */}
        <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-black grid grid-cols-2 gap-0.5">
          <div className="relative h-full w-full">
            <Image
              src={item.beforeImage}
              alt={item.beforeAlt}
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              className="object-cover"
            />
            <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-black/80 text-white">
              Before
            </span>
          </div>

          <div className="relative h-full w-full">
            <Image
              src={item.afterImage}
              alt={item.afterAlt}
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              className="object-cover"
            />
            <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-electric text-black">
              After
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 pt-1">
          <Badge variant="outline" className="text-[10px] text-electric border-electric/30">
            <Car className="w-3 h-3 mr-1" />
            {item.vehicleCategory}
          </Badge>
          <span className="text-[11px] font-medium text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3 text-electric" />
            {item.turnaround}
          </span>
        </div>

        <div>
          <CardTitle className="text-base sm:text-lg font-bold uppercase tracking-tight text-foreground group-hover:text-electric transition-colors">
            {item.vehicle}
          </CardTitle>
          <p className="text-xs font-semibold text-muted-foreground mt-0.5">
            {item.service}
          </p>
        </div>
      </CardHeader>

      <CardContent className="p-0 pb-4">
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {item.summary}
        </p>
      </CardContent>

      <CardFooter className="p-0 pt-3 border-t border-border/40">
        <Button
          type="button"
          size="sm"
          variant={isSelected ? "default" : "outline"}
          className={`w-full text-xs font-bold uppercase tracking-wider ${
            isSelected
              ? "bg-electric text-black"
              : "hover:border-electric hover:text-electric"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(item);
          }}
        >
          {isSelected ? (
            <>
              <Check className="w-3.5 h-3.5 mr-1" />
              Viewing in Slider
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              View Transformation
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
