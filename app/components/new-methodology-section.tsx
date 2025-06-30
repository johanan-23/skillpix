"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

const NewMethodologySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Introducing the <span className="text-primary">20/80 Principle</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Engineering education needs a fundamental shift. Our research shows that successful engineers spend:
            </p>

            <div className="space-y-6 mt-8">
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Theory & Fundamentals</span>
                  <span className="font-medium">20%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-4">
                  <div className="bg-primary h-4 rounded-full" style={{ width: "20%" }}></div>
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Practical Application & Projects</span>
                  <span className="font-medium">80%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-4">
                  <div className="bg-primary h-4 rounded-full" style={{ width: "80%" }}></div>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground">
              Yet traditional education inverts this ratio, focusing 80% on theory and only 20% on practical
              application. This disconnect is why so many graduates struggle in their first engineering roles.
            </p>

            <div className="pt-4">
              <Button size="lg" className="group">
                Learn More About Our Approach
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            style={{ y }}
            className="relative"
          >
            <div className="relative rounded-xl overflow-hidden shadow-xl">
              <Image src={"/team-collab.svg"} alt="Students collaborating in a Project" width={700} height={600}/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Real Skills, Real Projects</h3>
                <p className="text-white/90">
                  Our methodology emphasizes hands-on learning through real-world engineering challenges.
                </p>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg text-sm font-medium">
              Industry-validated approach
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default NewMethodologySection
