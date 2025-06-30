"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle } from "lucide-react"

// Mock data for pricing plans
const pricingPlans = [
  {
    id: 1,
    name: "Free",
    description: "Perfect for getting started with basic skills",
    price: "₹0",
    period: "forever",
    features: [
      { text: "Access to basic learning paths", included: true },
      { text: "Limited practice arena challenges", included: true },
      { text: "Community forum access", included: true },
      { text: "Join up to 1 project", included: true },
      { text: "Basic team collaboration tools", included: true },
      { text: "Premium learning content", included: false },
      { text: "Unlimited practice challenges", included: false },
      { text: "Industry mentor sessions", included: false },
      { text: "Patent application support", included: false },
      { text: "Priority project showcasing", included: false },
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    id: 2,
    name: "Premium",
    description: "For serious engineering students building their portfolio",
    price: "₹499",
    period: "per month",
    features: [
      { text: "Access to basic learning paths", included: true },
      { text: "Unlimited practice arena challenges", included: true },
      { text: "Community forum access", included: true },
      { text: "Join unlimited projects", included: true },
      { text: "Advanced team collaboration tools", included: true },
      { text: "Premium learning content", included: true },
      { text: "Monthly industry mentor sessions", included: true },
      { text: "Patent application support", included: true },
      { text: "Priority project showcasing", included: true },
      { text: "Resume and portfolio review", included: true },
    ],
    cta: "Upgrade Now",
    popular: true,
  },
  {
    id: 3,
    name: "Institution",
    description: "For colleges and universities enhancing their engineering programs",
    price: "₹1999",
    period: "per month",
    features: [
      { text: "Everything in Premium for all students", included: true },
      { text: "Student performance dashboard", included: true },
      { text: "Domain isolation (.edu emails only)", included: true },
      { text: "Custom branding options", included: true },
      { text: "Dedicated account manager", included: true },
      { text: "API access for LMS integration", included: true },
      { text: "Bulk student enrollment", included: true },
      { text: "Custom learning paths", included: true },
      { text: "Faculty training and support", included: true },
      { text: "Annual program assessment", included: true },
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

const PricingSection = () => {
  return (
    <section className="py-20 bg-muted/30" id="pricing">
      <div className="container px-4 md:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that works best for your learning journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex"
            >
              <Card
                className={`flex flex-col w-full border ${plan.popular ? "border-primary shadow-lg" : "shadow-md"} relative`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 inset-x-0 flex justify-center">
                    <Badge variant="default" className="bg-primary text-primary-foreground px-3 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className={`pb-8 ${plan.popular ? "pt-8" : "pt-6"}`}>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="mt-1.5">{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-2">/{plan.period}</span>
                  </div>
                </CardHeader>

                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        {feature.included ? (
                          <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        )}
                        <span className={feature.included ? "" : "text-muted-foreground"}>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="pt-4 pb-8">
                  <Button className="w-full" variant={plan.popular ? "default" : "outline"} size="lg">
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground">All plans include a 14-day free trial. No credit card required.</p>
        </motion.div>
      </div>
    </section>
  )
}

export default PricingSection
