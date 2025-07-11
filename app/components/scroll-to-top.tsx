"use client";

import { useState, useEffect } from "react";
import SwipeUpIcon from "@mui/icons-material/SwipeUp";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TooltipOnHover } from "@/components/misc/tooltipper";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled up to given distance
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Add the event listener
    window.addEventListener("scroll", toggleVisibility);

    // Clean up the event listener
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={cn(
        // Move up to avoid overlap with chatbot button
        "fixed bottom-16 right-4 z-50 transition-all duration-300 ease-in-out",
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-2 pointer-events-none"
      )}
    >
      <TooltipOnHover text="Scroll to top">
        <Button
          onClick={scrollToTop}
          size="icon"
          className="h-10 w-10 shadow-xl hover:shadow-2xl bg-primary hover:bg-primary/90 text-primary-foreground"
          aria-label="Scroll to top"
        >
          <SwipeUpIcon fontSize="small" />
        </Button>
      </TooltipOnHover>
    </div>
  );
};

export default ScrollToTop;
