import React from "react";
import Link from "next/link";
import Header from "../components/header";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";

import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutUsPage() {
  // Example team data for carousel
  const team = [
    {
      name: "Johanan S. A.",
      role: "Founder & Head of Product",
      img: "/dp/johanan-dp.jpg",
      bio: "Mechanical engineering student and tech entrepreneur. Leads product, engineering, and vision at Skillpix.",
      linkedin: "https://www.linkedin.com/in/johanan23/",
      github: "https://github.com/johanan-23",
    },
    {
      name: "Steward S.",
      role: "Co-Founder & Head of Content",
      img: "/dp/steward-dp.jpg",
      bio: "English major with sharp editorial skills. Crafts clear, concise, and engaging content that powers the Skillpix learning experience.",
      linkedin: "https://www.linkedin.com/in/steward-s-6babb0269/",
      github: "https://github.com/SteveSRoaR",
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <div className="relative z-10 container mx-auto max-w-4xl px-4 md:px-6">
        <Header />
        <section className="py-16 mt-24 flex flex-col items-center text-center gap-8">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2">
            About Us
          </h1>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            <Badge>Accessible</Badge>
            <Badge variant="secondary">Practical</Badge>
            <Badge variant="outline">Community-driven</Badge>
            <Badge variant="secondary">Future-proof</Badge>
          </div>
          <p className="max-w-2xl text-lg md:text-xl text-muted-foreground mb-4">
            Skillpix empowers students and professionals with practical skills,
            real-world projects, and a supportive community to help them succeed
            in their careers.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base text-muted-foreground">
                  To create a world where everyone has access to quality
                  education, hands-on experience, and opportunities to grow,
                  regardless of their background.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Our Approach</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base text-muted-foreground">
                  We blend innovative learning methodologies, mentorship, and
                  industry collaboration to ensure our users are job-ready and
                  future-proof.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="w-full mt-12">
            <Card className="p-6">
              <CardHeader>
                <CardTitle>Meet the Team</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base text-muted-foreground max-w-2xl mx-auto mb-6">
                  We are a passionate group of educators, technologists, and
                  industry experts dedicated to making a difference. Our team
                  brings together diverse skills and experiences to build a
                  platform that truly helps learners thrive.
                </p>
                <div className="flex flex-col gap-8 items-center sm:items-stretch sm:flex-row sm:justify-center">
                  {team.map((member, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center gap-4 p-6 bg-background rounded-2xl shadow-lg border border-border min-w-[260px] max-w-[320px] mx-auto"
                    >
                      <Avatar className="w-40 h-40 sm:w-48 sm:h-48 border-4 border-primary shadow-lg bg-muted">
                        <AvatarImage
                          src={member.img}
                          alt={member.name}
                          className="object-cover"
                        />
                        <AvatarFallback className="flex items-center justify-center w-full h-full text-4xl font-bold text-primary">
                          {member.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="font-bold text-primary text-lg sm:text-xl tracking-tight leading-tight">
                        {member.name}
                      </div>
                      <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-1">
                        {member.role}
                      </div>
                      <div className="text-sm text-muted-foreground italic mb-2 text-center max-w-[200px]">
                        {member.bio}
                      </div>
                      <div className="flex gap-4 mt-1">
                        <Link
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="LinkedIn"
                          className="hover:text-primary transition-colors"
                        >
                          <Button
                            variant="secondary"
                            className="flex items-center"
                          >
                            <Linkedin size={28} />
                          </Button>
                        </Link>
                        <Link
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="GitHub"
                          className="hover:text-primary transition-colors"
                        >
                          <Button
                            variant="secondary"
                            className="flex items-center"
                          >
                            <Github size={28} />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
}
