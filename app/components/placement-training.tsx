import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Brain,
  FileText,
  Users,
  Target,
  TrendingUp,
  Award,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";

// Mock data for placement training features
const placementFeatures = [
  {
    id: 1,
    title: "Technical Interview Preparation",
    description:
      "Master data structures, algorithms, and system design concepts with structured practice sessions.",
    icon: Brain,
    color: "bg-blue-100 dark:bg-blue-950",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    id: 2,
    title: "Resume & Portfolio Building",
    description:
      "Learn to create compelling resumes and portfolios that showcase your projects effectively.",
    icon: FileText,
    color: "bg-green-100 dark:bg-green-950",
    iconColor: "text-green-600 dark:text-green-400",
  },
  {
    id: 3,
    title: "Mock Interview Sessions",
    description:
      "Practice with realistic interview scenarios and receive constructive feedback.",
    icon: Users,
    color: "bg-purple-100 dark:bg-purple-950",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
  {
    id: 4,
    title: "Aptitude & Reasoning",
    description:
      "Strengthen quantitative, logical, and verbal reasoning skills for placement tests.",
    icon: Target,
    color: "bg-orange-100 dark:bg-orange-950",
    iconColor: "text-orange-600 dark:text-orange-400",
  },
  {
    id: 5,
    title: "Communication Skills",
    description:
      "Develop professional communication and presentation skills for workplace success.",
    icon: TrendingUp,
    color: "bg-pink-100 dark:bg-pink-950",
    iconColor: "text-pink-600 dark:text-pink-400",
  },
  {
    id: 6,
    title: "Industry Preparation",
    description:
      "Get insights into different engineering domains and company-specific requirements.",
    icon: Award,
    color: "bg-amber-100 dark:bg-amber-950",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
];

// Mock data for what students will gain
const placementBenefits = [
  {
    id: 1,
    title: "Interview Confidence",
    description:
      "Build confidence to tackle technical and HR interviews with structured preparation.",
  },
  {
    id: 2,
    title: "Professional Portfolio",
    description:
      "Create a compelling portfolio that highlights your projects and technical skills.",
  },
  {
    id: 3,
    title: "Career Planning",
    description:
      "Develop a clear roadmap for your engineering career progression.",
  },
];

const PlacementTrainingSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Career Preparation <span className="text-primary">Training</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Bridge the gap between your technical skills and career success with
            comprehensive placement preparation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {placementFeatures.map((feature) => (
            <div key={feature.id}>
              <Card className="h-full border-none shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-2">
                  <div
                    className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}
                  >
                    <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-20">
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
              From Technical Skills to{" "}
              <span className="text-primary">Career Success</span>
            </h3>
            <p className="text-xl text-muted-foreground">
              Our placement training program will help you translate your
              engineering knowledge into career opportunities.
            </p>

            <div className="space-y-4 mt-8">
              {placementBenefits.map((benefit) => (
                <div key={benefit.id} className="flex gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium text-lg">{benefit.title}</h4>
                    <p className="text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-xl overflow-hidden shadow-xl">
              <Image
                src="/placement-prep.jpg"
                alt="Students preparing for interviews and career success"
                width={600}
                height={600}
                className="w-full h-auto"
              />

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                <p className="text-lg font-medium">
                  “Preparation is the key to turning your engineering skills
                  into career opportunities.”
                </p>
                <p className="text-sm mt-2">— Career Development Philosophy</p>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg text-sm font-medium">
              Coming Soon
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg font-medium mb-2">
            Complete Career Preparation
          </p>
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Technical Skills + Professional Readiness = Career Success
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Our comprehensive approach ensures you’re not just technically
            competent, but also professionally prepared for the engineering
            industry.
          </p>
          <Button size="lg" className="px-8">
            Learn More About Career Training
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PlacementTrainingSection;
