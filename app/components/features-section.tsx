import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BookOpen,
  Code,
  Users,
  Briefcase,
  Award,
  MessageSquare,
  FileText,
  Target,
} from "lucide-react";

// Mock data for features
const features = [
  {
    id: 1,
    title: "Skill Learning Paths",
    description:
      "Structured learning paths for various engineering disciplines with curated content.",
    icon: BookOpen,
  },
  {
    id: 2,
    title: "Practice Arenas",
    description:
      "Discipline-specific practice environments with real-world problems and challenges.",
    icon: Code,
  },
  {
    id: 3,
    title: "Team Formation",
    description:
      "Find teammates with complementary skills or invite friends to collaborate on projects.",
    icon: Users,
  },
  {
    id: 4,
    title: "Project Marketplace",
    description:
      "Browse industry-posted problems or submit your own project ideas.",
    icon: Briefcase,
  },
  {
    id: 5,
    title: "Project Showcasing",
    description:
      "Present your completed projects to industry partners and potential employers.",
    icon: Award,
  },
  {
    id: 6,
    title: "Team Collaboration Tools",
    description:
      "Built-in messaging, file sharing, and project management tools.",
    icon: MessageSquare,
  },
  {
    id: 7,
    title: "Patent Application Support",
    description:
    "Assistance with intellectual property protection for innovative projects.",
    icon: FileText,
  },
  {
    id: 8,
    title: "Placement Training",
    description:
      "Comprehensive interview prep, resume review, and aptitude training for career success.",
    icon: Target,
  },
];

const FeaturesSection = () => {

  return (
    <section
      id="features"
      className="py-20 relative overflow-hidden"
    >
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Platform Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything engineering students need to learn, practice, and apply
            their skills effectively
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div key={feature.id}>
              <Card className="h-full border shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/20">
                <CardHeader className="pb-2">
                  <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mb-3">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
