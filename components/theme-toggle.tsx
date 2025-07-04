"use client";

import * as React from "react";
import { Moon, Sun, Loader } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";


const useThemeCycle = () => {
  const { theme, setTheme } = useTheme();

  const cycleTheme = React.useCallback(() => {
    const themes = ["light", "dark"];
    const currentIndex = themes.indexOf(theme || "light");
    const nextIndex = (currentIndex + 1) % themes.length;
    return themes[nextIndex];
  }, [theme]);

  return { theme, setTheme, cycleTheme };
};

const useViewTransition = (
  buttonRef: React.RefObject<HTMLButtonElement | null>
) => {
  React.useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes circle-grow {
        from {
          clip-path: circle(0% at var(--x-position, 50%) var(--y-position, 50%));
        }
        to {
          clip-path: circle(150% at var(--x-position, 50%) var(--y-position, 50%));
        }
      }

      ::view-transition-new(root) {
        animation: 0.6s circle-grow ease-out;
      }

      ::view-transition-old(root) {
        animation: none;
        mix-blend-mode: normal;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const startTransition = React.useCallback(
    (callback: () => void) => {
      if ("startViewTransition" in document) {
        const button = buttonRef.current;
        if (button) {
          const rect = button.getBoundingClientRect();
          const x = rect.left + rect.width / 2;
          const y = rect.top + rect.height / 2;

          document.documentElement.style.setProperty("--x-position", `${x}px`);
          document.documentElement.style.setProperty("--y-position", `${y}px`);
        }

        document.startViewTransition(callback);
      } else {
        callback();
      }
    },
    [buttonRef]
  );

  return startTransition;
};

export function ThemeToggle({ className }: { className?: string }) {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme, cycleTheme } = useThemeCycle();
  const startTransition = useViewTransition(buttonRef);

  const handleThemeChange = React.useCallback(() => {
    const newTheme = cycleTheme();
    startTransition(() => setTheme(newTheme));
  }, [cycleTheme, setTheme, startTransition]);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const getThemeIcon = () => {
    if (!mounted)
      return (
        <Loader className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
      );

    switch (theme) {
      case "light":
        return (
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
        );
      case "dark":
        return (
          <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
        );
      default:
        return null;
    }
  };

  return (
    <Button
      ref={buttonRef}
      variant="outline"
      size="icon"
      onClick={handleThemeChange}
      className={`flex items-center justify-center ${
        className || ""
      }`}
    >
      {getThemeIcon()}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
