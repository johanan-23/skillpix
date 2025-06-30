"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

// Mock data for benefits to colleges
const collegeBenefits = [
  {
    id: 1,
    title: "Enhanced Student Outcomes",
    description:
      "Improve graduation rates and job placement success by supplementing your curriculum with practical skills development.",
  },
  {
    id: 2,
    title: "No Curriculum Overhaul Required",
    description:
      "Skillpix works alongside your existing courses, enhancing rather than replacing your established curriculum.",
  },
  {
    id: 3,
    title: "Industry Connections",
    description:
      "Give your students access to real-world projects from companies looking for fresh talent and innovative solutions.",
  },
  {
    id: 4,
    title: "Detailed Analytics",
    description:
      "Track student progress, identify skill gaps, and measure the impact on learning outcomes with our institution dashboard.",
  },
];

const ComplementSection = () => {
  return (
    <section id="complement" className="py-20 bg-primary/5">
      <div className="container px-4 md:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Not a Replacement, But a{" "}
            <span className="text-primary">Perfect Complement</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Skillpix works alongside traditional engineering education,
            enhancing your degree with the practical skills employers demand.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold">For Students</h3>
            <p className="text-muted-foreground">
              Your degree provides essential theoretical foundations. Skillpix
              helps you apply that knowledge through:
            </p>

            <ul className="space-y-4 mt-6">
              <li className="flex gap-3">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium">
                    Practical skill development that complements your coursework
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium">
                    Real-world projects that build your portfolio while you
                    study
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium">
                    Industry connections that can lead to internships and job
                    offers
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium">
                    A head start on your career while completing your degree
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium">
                    Opportunities to collaborate on team projects, simulating
                    real-world work environments
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium">
                    Access to mentorship from industry professionals to guide
                    your learning journey
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium">
                    Hands-on experience with tools and technologies used in the
                    industry
                  </p>
                </div>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold">For Institutions</h3>
            <p className="text-muted-foreground">
              Partner with Skillpix to enhance your engineering programs without
              overhauling your curriculum:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {collegeBenefits.map((benefit, index) => (
                <motion.div
                  key={benefit.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full border shadow-sm hover:shadow-md transition-all duration-300">
                    <CardContent>
                      <h4 className="font-medium text-lg mb-2">
                        {benefit.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ComplementSection;
