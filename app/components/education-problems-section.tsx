"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { BookX, Clock, Briefcase, GraduationCap } from "lucide-react"

// Mock data for education problems
const educationProblems = [
  {
    id: 1,
    title: "Theory-Heavy Curriculum",
    description:
      "Traditional engineering education focuses too much on theoretical concepts with minimal practical application.",
    icon: BookX,
    color: "bg-red-100 dark:bg-red-950",
    iconColor: "text-red-600 dark:text-red-400",
  },
  {
    id: 2,
    title: "Outdated Content",
    description:
      "By the time students graduate, much of what they've learned is already outdated in the fast-moving tech industry.",
    icon: Clock,
    color: "bg-orange-100 dark:bg-orange-950",
    iconColor: "text-orange-600 dark:text-orange-400",
  },
  {
    id: 3,
    title: "Skills Gap",
    description:
      "Employers consistently report that fresh graduates lack the practical skills needed for real-world engineering roles.",
    icon: Briefcase,
    color: "bg-amber-100 dark:bg-amber-950",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  {
    id: 4,
    title: "Limited Project Experience",
    description:
      "Most students graduate with only a handful of projects, often theoretical and disconnected from industry needs.",
    icon: GraduationCap,
    color: "bg-yellow-100 dark:bg-yellow-950",
    iconColor: "text-yellow-600 dark:text-yellow-400",
  },
]

const EducationProblemsSection = () => {
  return (
    <section id="why-skillpix" className="py-20 bg-muted/30">
      <div className="container px-4 md:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            The Engineering Education <span className="text-red-500">Crisis</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Today’s engineering education isn’t preparing students for tomorrow’s challenges. Here’s why:
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {educationProblems.map((problem, index) => (
            <motion.div
              key={problem.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-none shadow-md">
                <CardContent className="pt-6">
                  <div className={`w-12 h-12 rounded-lg ${problem.color} flex items-center justify-center mb-4`}>
                    <problem.icon className={`h-6 w-6 ${problem.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{problem.title}</h3>
                  <p className="text-muted-foreground">{problem.description}</p>
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
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            <span className="font-semibold">The result?</span> Graduates who struggle to find jobs, employers who can’t
            find qualified candidates, and a widening skills gap in the engineering industry.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default EducationProblemsSection
