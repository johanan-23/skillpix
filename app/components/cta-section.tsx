"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";

const CtaSection = () => {
  return (
    <section id="cta" className="py-20 bg-primary text-primary-foreground">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Ready to Transform Your Engineering Education?
            </h2>
            <p className="text-xl text-primary-foreground/80">
              Join thousands of engineering students who are building real-world
              skills and creating impressive portfolios with Skillpix.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" variant="secondary" className="group w-full">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-background p-6 rounded-xl shadow-xl border border-border">
              <h3 className="text-xl font-bold text-primary mb-4">
                Join Our Community
              </h3>
              <p className="text-muted-foreground mb-6">
                Get updates on new features, learning resources, and upcoming
                events.
              </p>

              <form className="space-y-4">
                <div>
                  <Input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-2 text-primary"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Subscribe
                </Button>
              </form>

              <p className="text-xs text-muted-foreground mt-4">
                By subscribing, you agree to our Terms of Service and Privacy
                Policy.
              </p>
            </div>

            <div className="absolute -top-6 -right-6 bg-secondary text-secondary-foreground px-4 py-2 rounded-lg shadow-lg text-sm font-medium rotate-3">
              Join 10,000+ students!
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
