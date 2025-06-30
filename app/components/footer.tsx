"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
// Mock data for footer links
const footerLinks = {
  product: [
    { name: "Features", href: "#" },
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
    { name: "Terms", href: "#" },
    { name: "Privacy", href: "#" },
    { name: "Cookies", href: "#" },
    { name: "Contact", href: "#" },
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
            <p className="text-center md:text-left text-base text-muted-foreground mb-4 max-w-xs">
              Empowering students to turn ideas into reality.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-1 mb-4 md:mb-0">
              <Button
                variant="secondary"
                size="default"
                aria-label="Twitter"
                className="rounded-l-xl rounded-r-none bg-primary/15 hover:bg-primary/20"
              >
                <FaXTwitter className="h-12 w-12" />
              </Button>
              <Button
                variant="secondary"
                size="default"
                aria-label="Instagram"
                className="rounded-none bg-primary/15 hover:bg-primary/20"
              >
                <AiFillInstagram className="h-12 w-12" />
              </Button>
              <Button
                variant="secondary"
                size="default"
                aria-label="LinkedIn"
                className="rounded-none bg-primary/15 hover:bg-primary/20"
              >
                <FaLinkedin className="h-12 w-12" />
              </Button>
              <Button
                variant="secondary"
                size="default"
                aria-label="YouTube"
                className="rounded-l-none rounded-r-xl bg-primary/15 hover:bg-primary/20"
              >
                <FaYoutube className="h-12 w-12" />
              </Button>
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
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
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
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
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
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
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
            Made with ❤️ by{" "}
            <Link
              target="_blank"
              href="https://www.johanan.in"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Johanan S. A.
            </Link>
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
