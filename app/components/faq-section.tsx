import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
// Only the best 5 questions for lightweight SSR
// Only the best 5 questions for lightweight SSR
const FAQS: { question: string; answer: string }[] = [
  {
    question:
      "How much does it cost to prototype my project, and are there any hidden fees?",
    answer:
      "We believe in total transparency. When you submit a design, our system instantly generates a detailed quote based on your selected material (PLA, ABS, aluminum, steel, etc.), manufacturing process (FDM 3D printing, CNC milling, injection molding, etc.), part volume, and desired finish. That quote breaks down every cost component—material, machine time, labor, packaging, shipping, even taxes—so there are no surprises at checkout. If you decide to add options—like color matching, post-processing, or expedited delivery—you’ll see exactly how much each choice adds before you confirm. Once you approve, that price is locked in, guaranteed.",
  },
  {
    question:
      "I’m a beginner—do I need prior experience to start a project on Skillpix?",
    answer:
      "Not at all. We’ve designed every learning module with newcomers in mind. You’ll start with bite-sized video lessons, interactive quizzes, and live demos that teach fundamentals (CAD basics, material science, prototyping workflows) in simple terms. After each lesson, practice sessions let you apply what you’ve learned in a sandbox environment—no pressure, no deadlines. When you feel confident, our built-in PLM (Product Lifecycle Management) tools guide you step-by-step through planning, task assignment, and version control. Plus, you can always tap into our mentor network for one-on-one coaching, or join study groups with peers who are on the same journey.",
  },
  {
    question:
      "How do you match me with team members who share my interests and skills?",
    answer:
      "Our matchmaking algorithm combines a short onboarding questionnaire with real-time data from your profile activity. You tell us your project goals, technical strengths, soft skills (e.g., leadership, communication), preferred work style, and availability. Skillpix then uses this data—alongside members’ past project history and ratings—to suggest teammates whose backgrounds complement yours. You’ll see each candidate’s profile metrics (skill levels, completed projects, areas of interest), and you can chat or video-call before you form a group. This approach means you’re not randomly paired—you’re teaming up with people who truly amplify your strengths.",
  },
  {
    question:
      "What guarantees do you provide for the quality and turnaround time of manufactured prototypes?",
    answer:
      "Quality is at the heart of what we do. Every manufacturing partner in our network undergoes a rigorous certification process, including regular audits and sample-part inspections. When you place an order, you get a real-time status tracker—from “in queue” to “in production” to “shipped”—so you always know exactly where your part is. If your delivered part doesn’t meet the agreed tolerances or surface-finish standards, we’ll either reprint/re-machine it at no extra cost or issue a full refund—your choice. And if a vendor foresees any delay, we’ll notify you immediately with a revised timeline and expedite options.",
  },
  {
    question:
      "Who owns the intellectual property (IP) of the projects created on Skillpix?",
    answer:
      "The IP is—and always remains—yours. From the moment you upload a design or code, our terms of service make it clear that you retain full ownership and usage rights. We act purely as a facilitator: hosting your files securely, handling version control, and walking you through legal protections. We never claim ownership, never license your work, and never share your ideas with third parties unless you explicitly authorize it.",
  },
];

export default function FaqSection() {
  return (
    <section className="py-20 bg-primary/5" id="faq">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about how Skillpix works for
            engineering students
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={faq.question}
                value={`item-${i}`}
                className="border-b last:border-b-0"
              >
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <div className="py-2">{faq.answer}</div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
