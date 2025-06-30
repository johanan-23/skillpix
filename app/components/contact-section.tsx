"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useClipboard } from "@/hooks/use-clipboard";
import { useState } from "react";

const contactInfo = {
  email: "contact@skillpix.com",
  phone: {
    display: "+91 741 830 8109",
    href: "+917418308109",
  },
  address: {
    line: "Palayankottai,",
    country: "Tirunelveli-11",
  },
};

export default function ContactSection() {
  const { copyToClipboard } = useClipboard();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (field: string, value: string) => {
    copyToClipboard(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Get in Touch
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We&apos;d love to hear from you! Reach out and our team will respond
            promptly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Contact Info Card */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl">Contact Information</CardTitle>
              <CardDescription>Reach us through these channels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-4">
              <div
                className="flex items-start gap-4 group cursor-pointer"
                onClick={() => handleCopy("email", contactInfo.email)}
                title="Click to copy email"
              >
                <div className="bg-secondary text-primary rounded-full p-3 group-hover:bg-primary group-hover:text-secondary transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                    Email
                  </h4>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-foreground hover:text-primary text-base block mt-1"
                  >
                    {contactInfo.email}
                  </a>
                  {copiedField === "email" && (
                    <span className="text-xs text-green-600 ml-2">Copied!</span>
                  )}
                </div>
              </div>

              <div
                className="flex items-start gap-4 group cursor-pointer"
                onClick={() => handleCopy("phone", contactInfo.phone.display)}
                title="Click to copy phone number"
              >
                <div className="bg-secondary text-primary rounded-full p-3 group-hover:bg-primary group-hover:text-secondary transition-colors">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                    Phone
                  </h4>
                  <a
                    href={`tel:${contactInfo.phone.href}`}
                    className="text-foreground hover:text-primary text-base block mt-1"
                  >
                    {contactInfo.phone.display}
                  </a>
                  {copiedField === "phone" && (
                    <span className="text-xs text-green-600 ml-2">Copied!</span>
                  )}
                </div>
              </div>

              <div
                className="flex items-start gap-4 group cursor-pointer"
                onClick={() =>
                  handleCopy(
                    "address",
                    "19th Street, Rahmath Nagar, Maharaja Nagar Post, Palayankottai, Tirunelveli-627011, Tamil Nadu, India" // Full address for copying
                  )
                }
                title="Click to copy address"
              >
                <div className="bg-secondary text-primary rounded-full p-3 group-hover:bg-primary group-hover:text-secondary transition-colors">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                    Address
                  </h4>
                  <p className="text-foreground text-base block mt-1">
                    {contactInfo.address.line} <br />
                    {contactInfo.address.country}
                  </p>
                  {copiedField === "address" && (
                    <span className="text-xs text-green-600 ml-2">Copied!</span>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild className="w-full group">
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center justify-between"
                >
                  <span>Email Us Directly</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </CardFooter>
          </Card>

          {/* Support Ticket Form Card */}
          <Card className="lg:col-span-3 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl">Submit a Ticket</CardTitle>
              <CardDescription>
                We&apos;ll get back to you as soon as possible
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your full name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Brief summary of your inquiry"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Please describe your issue or question in detail"
                  className="min-h-32"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Submit Ticket
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
