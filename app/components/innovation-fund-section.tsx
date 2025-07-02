import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const InnovationFundSection = () => {
  return (
    <section className="py-24">
      <div className="container flex justify-center">
        <Card className="w-full max-w-xl border-none shadow-none bg-card">
          <CardContent className="flex flex-col items-center gap-8 py-14 px-6">
            <Badge
              className="mb-2 flex items-center gap-2 rounded-full border-primary/20 bg-primary/10 px-4 py-1 text-primary"
              variant="outline"
            >
              Innovation Fund for Projects
            </Badge>
            <h2 className="text-3xl text-center font-extrabold tracking-tight text-foreground md:text-4xl">
              Great Ideas Deserve{" "}
              <span className="decoration-primary decoration-wavy underline-offset-8 underline">
                Support
              </span>
            </h2>
            <p className="max-w-md text-center text-lg text-muted-foreground">
              We believe in removing barriers to innovation. That’s why we’ve
              created the{" "}
              <span className="font-semibold text-primary">
                Skillpix Innovation Fund
              </span>{" "}
              to sponsor promising student projects in the future.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default InnovationFundSection;
