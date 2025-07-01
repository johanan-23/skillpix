import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen py-20 md:py-28 lg:py-36 overflow-hidden flex items-center justify-center ">
      <div className="container px-2 sm:px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8 sm:space-y-12">
          <div className="space-y-4 max-w-full sm:max-w-3xl flex flex-col items-center">
            <Badge
              className="mb-2 text-base px-3 py-2 rounded-full flex items-start sm:items-center gap-2 justify-between mx-auto transition-all duration-300 w-full sm:w-[450px] hover:w-full sm:hover:w-[455px] whitespace-pre-line text-wrap min-h-[48px]"
              variant="secondary"
            >
              <Link
                href={"/#complement"}
                className="flex w-full justify-between items-start sm:items-center"
              >
                <span className="text-left break-words text-sm sm:text-base flex-1 pr-2">
                  All-in-one smart platform built for today’s students.
                </span>
                <Button
                  size="icon"
                  variant="default"
                  className="md:h-6 md:w-6 sm:h-12 sm:w-12 rounded-full ml-2 flex-shrink-0 inline-flex"
                  tabIndex={-1}
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </Badge>
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-normal break-words leading-tight">
              <span className="block sm:inline text-5xl">From Learning</span>
              <span className="block sm:inline text-5xl"> to Earning.</span>
            </h1>
            <p className="text-base xs:text-lg sm:text-xl text-muted-foreground max-w-full sm:max-w-2xl mx-auto break-words">
              Learn real skills, build real projects, and crack placements
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/login">
              <Button size="lg" className="px-8 w-full sm:w-auto">
                Start Learning for Free
              </Button>
            </Link>
            <Link href="/#why-skillpix">
              <Button
                size="lg"
                variant="outline"
                className="group w-full sm:w-auto"
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
