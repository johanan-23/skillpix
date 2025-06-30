"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { FileUp, Factory, Truck, CheckCircle } from "lucide-react"
import Image from "next/image"

// Mock data for manufacturing process steps
const processSteps = [
  {
    id: 1,
    title: "Upload Your Design",
    description:
      "Submit your design files (STL, Gerber, DXF, etc.) through our platform and specify your requirements.",
    icon: FileUp,
  },
  {
    id: 2,
    title: "Manufacturing",
    description:
      "Our team reviews your design, provides a quote, and upon approval, manufactures your prototype with precision.",
    icon: Factory,
  },
  {
    id: 3,
    title: "Delivery",
    description:
      "Your finished prototype is carefully packaged and shipped directly to your doorstep, anywhere in India.",
    icon: Truck,
  },
  {
    id: 4,
    title: "Project Success",
    description:
      "Use your prototype for testing, presentations, competitions, or as a component in your larger project.",
    icon: CheckCircle,
  },
]

const ManufacturingProcessSection = () => {
  return (
    <section className="py-20">
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
              How Our <span className="text-primary">Manufacturing Service</span> Works
            </h2>
            <p className="text-xl text-muted-foreground">
              We’ve simplified the prototyping process so you can focus on what matters most—your design and innovation.
            </p>

            <div className="space-y-8 mt-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-xl overflow-hidden shadow-xl">
              <Image
                src="/manufacturing-service.jpeg"
                alt="Manufacturing process visualization"
                width={600}
                height={600}
                className="w-full h-auto"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Fast Turnaround Times</h3>
                <p className="text-white/90">
                  Most prototypes are manufactured and shipped within 3-7 business days, depending on complexity.
                </p>
              </div>
            </div>

            <Card className="absolute -top-6 -right-6 max-w-xs shadow-lg border-none bg-primary text-primary-foreground">
              <CardContent className="p-4">
                <p className="font-medium">
                  “The 3D printing service saved our project. We got our prototype in just 4 days and it worked
                  perfectly!”
                </p>
                <p className="text-sm mt-2">— Mechanical Engineering Team, VIT Vellore</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ManufacturingProcessSection
