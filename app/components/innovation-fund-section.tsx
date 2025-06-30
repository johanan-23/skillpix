"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BadgeCheck, Sparkles } from "lucide-react";

const InnovationFundSection = () => {
  return (
    <section className="py-20 bg-background text-foreground">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6 max-w-2xl w-full text-center"
          >
            <div className="inline-flex items-center gap-2 bg-background px-3 py-1 rounded-full text-primary text-sm font-medium border border-primary/20 mx-auto">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span>Skillpix Innovation Fund</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Great Ideas Deserve{" "}
              <span className="underline decoration-dotted underline-offset-4">
                Support
              </span>
            </h2>

            <p className="text-xl text-muted-foreground">
              We believe in removing barriers to innovation. That’s why we’ve
              created the Skillpix Innovation Fund to sponsor promising student
              projects in the future. Stay tuned for updates and opportunities
              to apply!
            </p>

            <div className="space-y-4 mt-8">
              <div className="flex flex-col items-center gap-3">
                <BadgeCheck className="h-6 w-6 text-primary-foreground flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium text-lg text-foreground">
                    Launching Soon
                  </h3>
                  <p className="text-muted-foreground">
                    The Innovation Fund is coming soon. We’re working to build a
                    transparent, merit-based sponsorship program for student
                    innovators.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button
                size="lg"
                variant="secondary"
                className="bg-background text-primary border border-primary hover:bg-primary/10"
                disabled
              >
                Applications Opening Soon
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InnovationFundSection;
