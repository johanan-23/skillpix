"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen py-20 md:py-28 lg:py-36 overflow-hidden flex items-center justify-center ">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 max-w-3xl flex flex-col items-center"
          >
            <Badge
              className="mb-2 text-base pl-2 pr-1 py-1 rounded-full flex items-center gap-2 justify-between mx-auto transition-all duration-300 w-[430px] hover:w-[440px]"
              variant="secondary"
            >
              <Link
                href={"/#complement"}
                className="flex items-center justify-between w-full"
              >
                <span className="truncate text-left">
                  All-in-one smart platform built for today’s students.
                </span>
                <Button
                  size="icon"
                  variant="default"
                  className="h-6 w-6 rounded-full ml-2 flex-shrink-0"
                  tabIndex={-1}
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
              From Learning to Earning.
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Learn real skills, build real projects, and crack placements
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/login">
              <Button size="lg" className="px-8">
                Start Learning for Free
              </Button>
            </Link>
            <Link href="/#why-skillpix">
              <Button size="lg" variant="outline" className="group">
                Why Skillpix?
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
