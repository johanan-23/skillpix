import { CheckCircle } from "lucide-react";
import Image from "next/image";

// Mock data for benefits
const benefits = [
  {
    id: 1,
    title: "Build a Professional Portfolio",
    description: "Showcase real projects to potential employers.",
  },
  {
    id: 2,
    title: "Industry Connections",
    description:
      "Connect with companies looking for fresh talent and innovative solutions.",
  },
  {
    id: 3,
    title: "Patent Opportunities",
    description:
      "Get support for patenting innovative solutions you develop on our platform.",
  },
];

const BenefitsSection = () => {
  return (
    <section className="py-20 bg-primary/5">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Why Engineering Students{" "}
              <span className="text-primary">Love Skillpix</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Our platform is designed specifically for the unique needs of
              engineering students, helping you build the skills and portfolio
              that will set you apart.
            </p>

            <div className="space-y-4 mt-8">
              {benefits.map((benefit) => (
                <div key={benefit.id} className="flex gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium text-lg">{benefit.title}</h3>
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
                src={"/team-collaboration.jpg"}
                alt="Team of Students collaborating on a project and looking onto a computer screen"
                width={700}
                height={600}
              />

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                <p className="text-lg font-medium">
                  ‘Skillpix helped me land my dream internship by showcasing
                  real projects I built on the platform.’
                </p>
                <p className="text-sm mt-2">
                  — Priya S., Computer Engineering Student
                </p>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg text-sm font-medium">
              80% of our students secure internships
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
