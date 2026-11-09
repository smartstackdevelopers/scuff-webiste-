import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
        "2xl": "3rem",
      },
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      spacing: {
        "13": "3.25rem",
      },
      fontFamily: {
        sans: [
          "var(--font-body)",
          "Manrope",
          "Segoe UI",
          "system-ui",
          "sans-serif",
        ],
        display: [
          "var(--font-display)",
          "Bebas Neue",
          "Impact",
          "Haettenschweiler",
          "sans-serif",
        ],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          hover: "hsl(var(--primary-hover))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground))",
          subtle: "hsl(var(--card-subtle) / <alpha-value>)",
        },
        charcoal: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#334155",
          700: "#1E2536",
          750: "#181D2A",
          800: "#141822",
          850: "#0F121A",
          900: "#0B0E14",
          950: "#060709",
        },
        surface: {
          primary: "hsl(var(--surface-primary) / <alpha-value>)",
          secondary: "hsl(var(--surface-secondary) / <alpha-value>)",
          tertiary: "hsl(var(--surface-tertiary) / <alpha-value>)",
          card: "hsl(var(--surface-card) / <alpha-value>)",
          "card-hover": "hsl(var(--surface-card-hover) / <alpha-value>)",
          "card-subtle": "hsl(var(--surface-card-subtle) / <alpha-value>)",
        },
        amber: {
          accent: "#F59E0B",
          hover: "#D97706",
          subtle: "rgba(245, 158, 11, 0.12)",
        },
        // Brand neon mapped to existing `electric` utility classes
        electric: {
          50: "#F0FDF1",
          100: "#DCFCE0",
          200: "#BBF7C2",
          300: "#86EF95",
          400: "#4ADE65",
          500: "#48C84D",
          DEFAULT: "#48C84D",
          600: "#36A33B",
          700: "#2A7F2E",
          800: "#226626",
          900: "#1B521F",
          cyan: "#7DFF82",
        },
        neon: {
          DEFAULT: "#48C84D",
          soft: "#7DFF82",
          deep: "#36A33B",
        },
        metallic: {
          DEFAULT: "#B8BCC2",
          light: "#E8EAED",
          dark: "#6B7280",
        },
      },
      borderRadius: {
        "2xl": "1rem",
        xl: "0.875rem",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        "glow-blue": "0 0 25px -4px rgba(72, 200, 77, 0.45)",
        "glow-sm": "0 0 12px -2px rgba(72, 200, 77, 0.35)",
        "glow-cyan": "0 0 25px -4px rgba(125, 255, 130, 0.4)",
        "glow-neon": "0 0 30px -4px rgba(72, 200, 77, 0.55)",
        "luxury-dark": "0 20px 40px -15px rgba(0, 0, 0, 0.7)",
        "luxury-light": "0 20px 40px -15px rgba(15, 23, 42, 0.08)",
        "card-hover": "0 10px 30px -10px rgba(72, 200, 77, 0.2)",
        "inner-glow": "inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)",
        metallic:
          "0 8px 24px -8px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.12)",
      },
      backgroundImage: {
        "radial-gradient": "radial-gradient(var(--tw-gradient-stops))",
        "mesh-dark":
          "radial-gradient(at 0% 0%, rgba(72, 200, 77, 0.18) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(125, 255, 130, 0.08) 0px, transparent 50%)",
        "mesh-light":
          "radial-gradient(at 0% 0%, rgba(72, 200, 77, 0.08) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(125, 255, 130, 0.05) 0px, transparent 50%)",
        "metallic-gradient":
          "linear-gradient(135deg, #E8EAED 0%, #B8BCC2 45%, #6B7280 100%)",
        "neon-gradient":
          "linear-gradient(135deg, #48C84D 0%, #7DFF82 50%, #36A33B 100%)",
      },
      keyframes: {
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px -4px rgba(72, 200, 77, 0.35)" },
          "50%": { boxShadow: "0 0 36px -2px rgba(72, 200, 77, 0.55)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "pulse-subtle": "pulse-subtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2s infinite",
        float: "float 5s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "spin-slow": "spin-slow 18s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
