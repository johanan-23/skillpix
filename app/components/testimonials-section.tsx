"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data for testimonials
const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Computer Science, Final Year",
    avatar: "/placeholder.svg?height=100&width=100",
    content:
      "Skillpix completely changed how I approach learning. The practice arenas helped me master data structures and algorithms, and I built a real-world project that I now showcase in interviews.",
    university: "IIT Bombay",
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "Mechanical Engineering, Third Year",
    avatar: "/placeholder.svg?height=100&width=100",
    content:
      "The project marketplace connected me with a startup looking for design solutions. What started as a student project turned into a part-time job offer before I even graduated!",
    university: "VIT Vellore",
  },
  {
    id: 3,
    name: "Arjun Nair",
    role: "Electronics Engineering, Graduate",
    avatar: "/placeholder.svg?height=100&width=100",
    content:
      "I used Skillpix to find teammates for my IoT project. We ended up filing for a patent with the platform's support, and now we're exploring turning it into a startup.",
    university: "BITS Pilani",
  },
  {
    id: 4,
    name: "Ananya Reddy",
    role: "Civil Engineering, Final Year",
    avatar: "/placeholder.svg?height=100&width=100",
    content:
      "The structured learning paths helped me understand complex concepts, and the practice arenas gave me confidence. My final year project got recognized at a national competition!",
    university: "NIT Trichy",
  },
  {
    id: 5,
    name: "Vikram Singh",
    role: "Aerospace Engineering, Second Year",
    avatar: "/placeholder.svg?height=100&width=100",
    content:
      "As a sophomore, I was able to contribute to a senior-level project through Skillpix's team formation feature. The experience I gained was invaluable and set me apart from my peers.",
    university: "IIT Madras",
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [, setWidth] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (carouselRef.current) {
        setWidth(
          carouselRef.current.scrollWidth - carouselRef.current.offsetWidth
        );
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  // For mobile, show one testimonial at a time
  // For desktop, show 3 testimonials at a time
  const visibleTestimonials = testimonials.slice(
    currentIndex,
    currentIndex + 3
  );
  if (visibleTestimonials.length < 3) {
    visibleTestimonials.push(
      ...testimonials.slice(0, 3 - visibleTestimonials.length)
    );
  }

  return (
    <section className="py-20">
      <div className="container px-4 md:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Student Success Stories
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hear from engineering students who transformed their education with
            Skillpix
          </p>
        </motion.div>

        {/* Mobile Testimonials (Single View) */}
        <div className="block md:hidden">
          <div className="relative">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <Card className="border shadow-md">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12 border-2 border-primary">
                      <AvatarImage
                        src={
                          testimonials[currentIndex].avatar &&
                          !testimonials[currentIndex].avatar.includes(
                            "/placeholder.svg"
                          )
                            ? testimonials[currentIndex].avatar
                            : undefined
                        }
                        alt={testimonials[currentIndex].name}
                      />
                      <AvatarFallback>
                        {testimonials[currentIndex].name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">
                        {testimonials[currentIndex].name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {testimonials[currentIndex].role}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {testimonials[currentIndex].university}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 relative">
                    <Quote className="h-6 w-6 text-primary/20 absolute -top-2 -left-2" />
                    <p className="text-muted-foreground pl-4">
                      {testimonials[currentIndex].content}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <div className="flex justify-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Desktop Testimonials (Multiple View) */}
        <div className="hidden md:block">
          <motion.div ref={carouselRef} className="overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{ x: -currentIndex * (100 / 3) + "%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  className="min-w-[calc(33.333%-1rem)] flex-1"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full border shadow-md hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12 border-2 border-primary">
                          <AvatarImage
                            src={
                              testimonial.avatar &&
                              !testimonial.avatar.includes("/placeholder.svg")
                                ? testimonial.avatar
                                : undefined
                            }
                            alt={testimonial.name}
                          />
                          <AvatarFallback>
                            {testimonial.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.role}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {testimonial.university}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 relative">
                        <Quote className="h-6 w-6 text-primary/20 absolute -top-2 -left-2" />
                        <p className="text-muted-foreground pl-4">
                          {testimonial.content}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <div className="flex justify-center gap-2 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              aria-label="Next testimonials"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
