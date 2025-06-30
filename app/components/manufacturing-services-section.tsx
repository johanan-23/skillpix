"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PrinterIcon as Printer3d, Cpu, Scissors, Wrench, Zap, ArrowRight } from "lucide-react"

// Mock data for manufacturing services
const manufacturingServices = [
  {
    id: 1,
    title: "3D Printing",
    description: "Turn your 3D models into physical objects with various materials including PLA, ABS, PETG, and more.",
    icon: Printer3d,
    color: "bg-blue-100 dark:bg-blue-950",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    id: 2,
    title: "PCB Fabrication",
    description:
      "Get your circuit board designs manufactured with precision. Single and multi-layer options available.",
    icon: Cpu,
    color: "bg-green-100 dark:bg-green-950",
    iconColor: "text-green-600 dark:text-green-400",
  },
  {
    id: 3,
    title: "Laser Cutting",
    description: "Precision cutting for your designs on acrylic, wood, and other materials with our industrial lasers.",
    icon: Scissors,
    color: "bg-red-100 dark:bg-red-950",
    iconColor: "text-red-600 dark:text-red-400",
  },
  {
    id: 4,
    title: "CNC Machining",
    description: "Complex parts machined from aluminum, steel, and other metals with professional-grade CNC equipment.",
    icon: Wrench,
    color: "bg-orange-100 dark:bg-orange-950",
    iconColor: "text-orange-600 dark:text-orange-400",
  },
]

const ManufacturingServicesSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container px-4 md:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="inline-block bg-primary/10 px-3 py-1 rounded-full text-primary text-sm font-medium mb-4">
            NEW SERVICE
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            From <span className="text-primary">Digital to Physical</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Turn your designs into reality with our on-demand manufacturing services. No more barriers between your
            ideas and working prototypes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {manufacturingServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border shadow-md hover:shadow-lg transition-all duration-300 hover:border-primary/20">
                <CardContent className="pt-6">
                  <div className={`w-12 h-12 rounded-lg ${service.color} flex items-center justify-center mb-4`}>
                    <service.icon className={`h-6 w-6 ${service.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="bg-muted/50 p-6 rounded-xl max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Zap className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-2">Bridging the Gap</h3>
            <p className="text-muted-foreground mb-6">
              We know that access to manufacturing equipment is one of the biggest barriers for engineering students.
              That’s why we’ve built a network of manufacturing partners to help you bring your projects to life.
            </p>
            <Button size="lg" className="group">
              Explore Manufacturing Services
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ManufacturingServicesSection
