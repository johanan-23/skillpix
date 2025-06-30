import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Code, Rocket } from "lucide-react";

// Mock data for the LPA steps
const lpaSteps = [
  {
    id: 1,
    title: "Learn",
    description:
      "Master the fundamentals with our curated learning paths designed specifically for engineering students.",
    icon: BookOpen,
    color: "bg-blue-100 dark:bg-blue-950",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    id: 2,
    title: "Practice",
    description:
      "Strengthen your skills in our practice arenas with real-world problems and expert guidance.",
    icon: Code,
    color: "bg-purple-100 dark:bg-purple-950",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
  {
    id: 3,
    title: "Apply",
    description:
      "Put your skills to work on real projects, build your portfolio, and connect with industry partners.",
    icon: Rocket,
    color: "bg-green-100 dark:bg-green-950",
    iconColor: "text-green-600 dark:text-green-400",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            How Skillpix Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our innovative LPA model transforms how engineering students develop
            practical skills
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {lpaSteps.map((step) => (
            <div key={step.id}>
              <Card className="h-full border-none shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-2">
                  <div
                    className={`w-12 h-12 rounded-lg ${step.color} flex items-center justify-center mb-4`}
                  >
                    <step.icon className={`h-6 w-6 ${step.iconColor}`} />
                  </div>
                  <CardTitle className="text-2xl">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg font-medium mb-2">The 20/80 Principle</p>
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Engineering is 20% Learning, 80% Doing
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Traditional education focuses too much on theory. Skillpix flips the
            model to emphasize practical application and project-based learning
            that employers actually value.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
