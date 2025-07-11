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
import { useClipboard } from "@/hooks/use-clipboard";
import { useState, useTransition } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { createNotification } from "@/actions/notifications";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

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

// Zod schema for the contact form
const ContactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function ContactSection() {
  const { copyToClipboard } = useClipboard();
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // react-hook-form setup
  const form = useForm<z.infer<typeof ContactSchema>>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const handleCopy = (field: string, value: string) => {
    copyToClipboard(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Submit handler
  const onSubmit = (values: z.infer<typeof ContactSchema>) => {
    startTransition(() => {
      createNotification({
        title: `Support Ticket: ${values.subject}`,
        message: [
          `From: ${values.name} <${values.email}>`,
          "",
          values.message,
        ].join("\n"),
        type: "support",
        category: "support",
        priority: "high",
        userId: "P1bSy86JTH4SPw7kg6K7TRXMY3hecrGy",
        actionUrl: "/admin/users?search=" + values.email,
        actionLabel: "View User",
        metadata: {
          from: values.email,
          name: values.name,
        },
      })
        .then(() => {
          toast.success(
            "Your ticket has been submitted! We'll get back to you soon."
          );
          form.reset();
        })
        .catch((error) => {
          toast.error("Failed to submit ticket. Please try again later.");
          console.error("Failed to create support notification", error);
        });
    });
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
                    "19th Street, Rahmath Nagar, Maharaja Nagar Post, Palayankottai, Tirunelveli-627011, Tamil Nadu, India"
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
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({
                        field,
                      }: {
                        field: import("react-hook-form").ControllerRenderProps<
                          z.infer<typeof ContactSchema>,
                          "name"
                        >;
                      }) => (
                        <FormItem>
                          <FormLabel htmlFor="name">Name</FormLabel>
                          <FormControl>
                            <Input
                              id="name"
                              placeholder="Your full name"
                              disabled={isPending}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({
                        field,
                      }: {
                        field: import("react-hook-form").ControllerRenderProps<
                          z.infer<typeof ContactSchema>,
                          "email"
                        >;
                      }) => (
                        <FormItem>
                          <FormLabel htmlFor="email">Email</FormLabel>
                          <FormControl>
                            <Input
                              id="email"
                              type="email"
                              placeholder="you@example.com"
                              disabled={isPending}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({
                      field,
                    }: {
                      field: import("react-hook-form").ControllerRenderProps<
                        z.infer<typeof ContactSchema>,
                        "subject"
                      >;
                    }) => (
                      <FormItem>
                        <FormLabel htmlFor="subject">Subject</FormLabel>
                        <FormControl>
                          <Input
                            id="subject"
                            placeholder="Brief summary of your inquiry"
                            disabled={isPending}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({
                      field,
                    }: {
                      field: import("react-hook-form").ControllerRenderProps<
                        z.infer<typeof ContactSchema>,
                        "message"
                      >;
                    }) => (
                      <FormItem>
                        <FormLabel htmlFor="message">Message</FormLabel>
                        <FormControl>
                          <Textarea
                            id="message"
                            placeholder="Please describe your issue or question in detail"
                            className="min-h-32"
                            disabled={isPending}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? (
                      <>
                        Submitting
                        <svg
                          className="inline ml-2 w-4 h-4 text-black animate-spin"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                          ></path>
                        </svg>
                      </>
                    ) : (
                      "Submit Ticket"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
