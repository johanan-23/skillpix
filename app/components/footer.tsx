"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Linkedin, Twitter, Youtube, Instagram } from "lucide-react";
import SocialLinks from "@/lib/social-links";
// Mock data for footer links
const footerLinks = {
  product: [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#" },
    { name: "Project Marketplace", href: "#" },
  ],
  company: [
    { name: "About Us", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Partners", href: "#" },
  ],
  resources: [
    { name: "Documentation", href: "#" },
    { name: "Tutorials", href: "#" },
    { name: "Community", href: "#" },
  ],
  legal: [
    { name: "Terms", href: "/terms" },
    { name: "Privacy", href: "/privacy-policy" },
    { name: "Cookies", href: "/cookies" },
    { name: "Contact", href: "/contact" },
  ],
};

const Footer = () => {
  return (
    <footer className="border-t bg-background text-foreground">
      <div className="container px-4 md:px-6 py-12 md:py-16">
        <div className="w-full flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          {/* Left: Logo + Motto + Socials */}
          <div className="flex flex-col items-center md:items-start md:w-1/3">
            <Link
              href="/"
              prefetch={true}
              className="mb-2 flex flex-col items-center md:items-start"
            >
              {/* Light logo */}
              <Image
                src="/logo/skillpix-logo-black.svg"
                alt="Skillpix Logo"
                width={80}
                height={80}
                className="block dark:hidden"
                priority
              />
              {/* Dark logo */}
              <Image
                src="/logo/skillpix-logo-white.svg"
                alt="Skillpix Logo"
                width={80}
                height={80}
                className="hidden dark:block"
                priority
              />
            </Link>
            <h2 className="text-center md:text-left text-2xl font-bold text-primary mb-2 mt-0 leading-tight">
              Skillpix Platform
            </h2>
            <p className="text-center md:text-left text-base text-muted-foreground mb-4 max-w-xs">
              From Learning to Earning.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-1 mb-4 md:mb-0">
              <Link href={SocialLinks.X} target="_blank" aria-label="Twitter">
                <Button
                  variant="secondary"
                  size="default"
                  className="rounded-l-xl rounded-r-none bg-primary/15 hover:bg-primary/20"
                >
                  <Twitter className="h-12 w-12" />
                </Button>
              </Link>
              <Link
                href={SocialLinks.instagram}
                target="_blank"
                aria-label="Instagram"
              >
                <Button
                  variant="secondary"
                  size="default"
                  className="rounded-none bg-primary/15 hover:bg-primary/20"
                >
                  <Instagram className="h-12 w-12" />
                </Button>
              </Link>
              <Link
                href={SocialLinks.linkedin}
                target="_blank"
                aria-label="LinkedIn"
              >
                <Button
                  variant="secondary"
                  size="default"
                  className="rounded-none bg-primary/15 hover:bg-primary/20"
                >
                  <Linkedin className="h-12 w-12" />
                </Button>
              </Link>
              <Link
                href={SocialLinks.youtube}
                target="_blank"
                aria-label="YouTube"
              >
                <Button
                  variant="secondary"
                  size="default"
                  className="rounded-l-none rounded-r-xl bg-primary/15 hover:bg-primary/20"
                >
                  <Youtube className="h-12 w-12" />
                </Button>
              </Link>
            </div>
          </div>
          {/* Right: Footer Links */}
          <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Product */}
            <div>
              <h4 className="font-semibold text-lg mb-3 text-primary">
                Product
              </h4>
              <ul className="space-y-2">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      prefetch={true}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* Company */}
            <div>
              <h4 className="font-semibold text-lg mb-3 text-primary">
                Company
              </h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      prefetch={true}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* Resources */}
            <div>
              <h4 className="font-semibold text-lg mb-3 text-primary">
                Resources
              </h4>
              <ul className="space-y-2">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      prefetch={true}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {/* Legal and Copyright */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center border-t pt-4 mt-8">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 mb-2 md:mb-0">
            {footerLinks.legal.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  prefetch={true}
                  className="text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <span className="text-xs text-muted-foreground mt-2 md:mt-0">
            Made with ❤️ in India
          </span>
          <span className="text-xs text-muted-foreground mt-2 md:mt-0">
            © {new Date().getFullYear()} Skillpix. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
