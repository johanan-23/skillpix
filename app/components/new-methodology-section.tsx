import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const NewMethodologySection = () => {

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Introducing the{" "}
              <span className="text-primary">20/80 Principle</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Engineering education needs a fundamental shift. Our research
              shows that successful engineers spend:
            </p>

            <div className="space-y-6 mt-8">
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Theory & Fundamentals</span>
                  <span className="font-medium">20%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-4">
                  <div
                    className="bg-primary h-4 rounded-full"
                    style={{ width: "20%" }}
                  ></div>
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">
                    Practical Application & Projects
                  </span>
                  <span className="font-medium">80%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-4">
                  <div
                    className="bg-primary h-4 rounded-full"
                    style={{ width: "80%" }}
                  ></div>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground">
              Yet traditional education inverts this ratio, focusing 80% on
              theory and only 20% on practical application. This disconnect is
              why so many graduates struggle in their first engineering roles.
            </p>

            <div className="pt-4">
              <Button size="lg" className="group">
                Learn More About Our Approach
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-xl overflow-hidden shadow-xl">
              <Image
                src={"/team-collab.svg"}
                alt="Students collaborating in a Project"
                width={700}
                height={600}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewMethodologySection;
