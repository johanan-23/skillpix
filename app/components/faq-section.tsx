"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const FAQS = [
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
  {
    question:
      "What kind of legal and patent support can I expect, and is it really included?",
    answer:
      "Yes—it’s real support, not just boilerplate. Your subscription includes access to our patent-prep toolkit, which features template drafts, step-by-step filing checklists, and video tutorials on patent strategy. Beyond that, you get two 1-hour sessions per quarter with experienced IP attorneys in our network: one for drafting the initial filing, and another for discussing strategy in additional markets. If you choose to file in more countries or need expedited service, we’ll provide an exact add-on fee schedule up front—no hidden retainer or surprise legal bills down the line.",
  },
  {
    question:
      "How will Skillpix help me take my project from prototype to market or IPO?",
    answer:
      "We treat your journey as a continuum, not a checklist. After your prototype is production-ready, we invite you to participate in our quarterly virtual “Pitch & Partner” events, where vetted investors, industry experts, and incubator leads scout promising projects. You’ll receive pitch-deck reviews, financial-model templates, and personalised feedback from our ecosystem partners. When you’re ready to scale, our IPO Roadmap guides you through compliance, SEC filings, and underwriter negotiations—backed by workshops and one-on-one advisor calls. We stay by your side until you’ve crossed every milestone: pilot run, seed funding, Series A, and beyond.",
  },
  {
    question:
      "What happens if my project idea isn’t “big” enough—can I still get support?",
    answer:
      "Absolutely. We champion every spark of creativity—whether it’s a campus-level gadget, an assistive device, or a small-batch artisanal product. Our resources scale to your ambition. For smaller-scope projects, you’ll benefit from our community showcases (where peers vote on promising ideas), micro-grants for materials, and peer-mentorship circles. We believe even modest innovations can have meaningful impact—and often, those are the projects that solve real, everyday problems.",
  },
  {
    question: "How do you ensure data privacy and keep my designs secure?",
    answer:
      "We’ve built Skillpix on a zero-trust infrastructure. All files are encrypted in transit (TLS 1.3) and at rest (AES-256) on ISO/IEC-certified servers. Access control is granular: you decide exactly who can view, comment on, or download each file or folder. You can also enable two-factor authentication for your account and require MFA for any collaborator. Regular penetration tests and SOC 2 audits ensure our platform remains secure against emerging threats.",
  },
  {
    question:
      "Can I use Skillpix alongside other tools like GitHub or InVision?",
    answer:
      "Yes—the platform is designed for interoperability. You can link your GitHub repos for version tracking, import Figma or InVision prototypes for design reviews, and sync Trello or Jira boards for task management. Our one-click integrations keep information flowing—you manage your master data in Skillpix, and we push updates to your preferred tools (and vice versa). No need to give up the tools you love.",
  },
  {
    question:
      "What happens if I hit a roadblock—do you offer mentorship or expert advice?",
    answer:
      "Whenever you need a hand, we’ve got multiple support channels: On-demand mentors: Book 30- or 60-minute slots with industry veterans and academics across engineering, design, and business. Community forum: Post questions 24/7; experienced members and staff respond, often within hours. Live office hours: Join weekly group video calls on topics like DFM (Design for Manufacturability), material selection, or pitch prep.",
  },
  {
    question:
      "Are there success stories or case studies from students who monetized their work?",
    answer:
      "Yes—our “Alumni Spotlight” section features detailed case studies. You’ll find stories such as: A solar-powered water purifier that secured a $50K seed grant and is now in pilot deployment in rural markets. A wearable health monitor co-developed by two classmates that attracted angel investment and is entering small-batch production. A smart-valve retrofit for agricultural irrigation that won an industry design award and landed a contract with a regional OEM.",
  },
  {
    question:
      "How flexible are your manufacturing options (materials, processes, locations)?",
    answer:
      "Extremely flexible. You can choose from dozens of materials—from PLA and PETG to aircraft-grade aluminum and medical-grade polymers—and processes including FDM, SLA, SLS, CNC milling, injection molding, and more. You also decide where it’s made: local shops for low carbon footprint and fast shipping, or international partners for cost savings on high volumes. All of these choices are presented side-by-side in our quoting tool, so you can weigh cost, quality, speed, and sustainability.",
  },
  {
    question:
      "Do I have to commit long-term, or can I pick only the services I need?",
    answer:
      "You’re in control. There is no mandatory subscription or multi-month contract—you can use Skillpix a la carte (in plain English: pick and pay for only what you use). If today you just need one CNC-machined part, you pay that one job. If next week you choose a patent consultation or a 3-course mini-bootcamp on CAD, you only pay for those services. If you find yourself using multiple services regularly, our subscription plans offer cost savings and added perks—otherwise, there’s zero lock-in.",
  },
  {
    question:
      "How quickly can I see real progress—from learning a skill to shipping a prototype?",
    answer:
      "Many students report finishing a basic course module and completing a simple prototype within 7–10 days. With our accelerated “Fast-Track Prototyping” add-on, you can compress that timeline to under 5 business days: immediate mentor access, priority scheduling with manufacturing partners, and express shipping. For more advanced projects, we provide a recommended timeline, detailed Gantt charts in the PLM tool, and milestone alerts to help you stay on track.",
  },
];

export default function FaqSection() {
  const [visibleCount, setVisibleCount] = useState(5);

  const handleAccordionChange = (value: string) => {
    if (value) {
      setVisibleCount((prev) => Math.min(prev + 2, FAQS.length));
    }
  };

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
          <Accordion
            type="single"
            collapsible
            className="w-full"
            onValueChange={handleAccordionChange}
          >
            {FAQS.slice(0, visibleCount).map((faq, i) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <AccordionItem
                  value={`item-${i}`}
                  className="border-b last:border-b-0"
                >
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <div className="py-2">{faq.answer}</div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
