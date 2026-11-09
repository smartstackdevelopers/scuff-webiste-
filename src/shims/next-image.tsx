import * as React from "react";
import { cn } from "@/lib/utils";

type ImgProps = Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  "src" | "width" | "height"
> & {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  unoptimized?: boolean;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
};

const Image = React.forwardRef<HTMLImageElement, ImgProps>(
  (
    {
      src,
      alt,
      width,
      height,
      fill,
      className,
      priority,
      sizes,
      style,
      ...rest
    },
    ref
  ) => {
    if (fill) {
      return (
        <img
          ref={ref}
          src={src}
          alt={alt}
          sizes={sizes}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className={cn("absolute inset-0 h-full w-full", className)}
          style={style}
          {...rest}
        />
      );
    }

    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={className}
        style={style}
        {...rest}
      />
    );
  }
);

Image.displayName = "Image";

export default Image;
