import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen py-20 md:py-28 lg:py-36 overflow-hidden flex items-center justify-center">
      <div className="container px-2 sm:px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8 sm:space-y-12">
          <div className="space-y-4 max-w-full sm:max-w-3xl flex flex-col items-center">
            <Badge
              className="mt-2 text-[10px] xs:text-xs sm:text-sm md:text-base px-2 xs:px-2.5 sm:px-3 py-1 xs:py-1.5 sm:py-2 rounded-full group"
              variant={"secondary"}
            >
              <Link
                href={"/#complement"}
                className="flex w-full items-center justify-center gap-1 xs:gap-1.5 sm:gap-2"
              >
                <span className="text-[10px] xs:text-xs sm:text-sm md:text-base text-center w-full">
                  All-in-one smart platform built for today’s students.
                </span>
                <Button
                  variant="default"
                  className="rounded-full ml-1 xs:ml-1.5 sm:ml-2 p-0 h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 min-w-0 min-h-0 flex items-center justify-center"
                  tabIndex={-1}
                >
                  <ArrowRight className="h-2 w-2 xs:h-3 xs:w-3 sm:h-4 sm:w-4 transition-transform group-hover:rotate-45" />
                </Button>
              </Link>
            </Badge>
            {/* Animated Heading */}
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-normal break-words leading-tight animate-fade-in-up animate-duration-700 animate-delay-150 animate-ease-out animate-once">
              <span className="block sm:inline text-5xl animate-fade-in animate-delay-200 animate-once">
                From{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text dark:bg-gradient-to-r dark:from-primary dark:to-secondary dark:bg-clip-text dark:text-transparent text-primary">
                  Learning{" "}
                </span>
              </span>
              <span className="block sm:inline text-5xl animate-fade-in animate-delay-300 animate-once relative">
                <span className="mx-1 text-foreground">to </span>
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-700 bg-clip-text dark:from-yellow-400 dark:via-yellow-200 dark:to-yellow-500 dark:bg-clip-text dark:text-transparent text-yellow-700 drop-shadow-[0_0_16px_rgba(251,191,36,0.7)] dark:drop-shadow-[0_0_24px_rgba(253,224,71,0.8)]">
                    Earning.
                  </span>
                </span>
              </span>
            </h1>
            {/* Animated Paragraph */}
            <p className="text-base xs:text-lg sm:text-xl text-muted-foreground max-w-full sm:max-w-2xl mx-auto break-words animate-fade-in-up animate-duration-700 animate-delay-300 animate-ease-out animate-once">
              Build real skills, prove them with real projects, and train smart
              for real placements — all in one platform.
            </p>
          </div>

          {/* Animated Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animate-duration-700 animate-delay-500 animate-ease-out animate-once">
            <Link href="/login">
              <Button
                size="lg"
                className="px-8 w-full sm:w-auto animate-fade-in animate-duration-700 animate-delay-600 animate-once shadow-lg shadow-primary/20"
              >
                Start Learning for Free
              </Button>
            </Link>
            <Link href="/#why-skillpix">
              <Button
                size="lg"
                variant="outline"
                className="group w-full sm:w-auto animate-fade-in animate-duration-700 animate-delay-700 animate-once border-primary/60"
              >
                Why Skillpix?
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
