"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserDropdown from "./user-dropdown";
import { authClient } from "@/utils/auth-client";

import Image from "next/image";
import { BounceLoader } from "react-spinners";

const navigationLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about-us" },
  { name: "Features", href: "#features" },
  { name: "Contact", href: "/contact" },
];

interface HeaderProps {
  showBackButton?: boolean;
  showBranding?: boolean;
  showNavLinks?: boolean;
  showAuthArea?: boolean;
}

const Header = ({
  showBackButton = false,
  showBranding = true,
  showNavLinks = true,
  showAuthArea = true,
}: HeaderProps) => {
  // Avoid hydration mismatch: always start with false, then sync on mount
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const isLoggedIn = session?.user || false;
  const user = {
    name: session?.user.name,
    email: session?.user.email,
    image: session?.user.image ?? undefined,
  };
  useEffect(() => {
    const syncScroll = () => setIsScrolled(window.scrollY > 10);
    syncScroll();
    window.addEventListener("scroll", syncScroll);
    return () => window.removeEventListener("scroll", syncScroll);
  }, []);

  const pathname = usePathname();

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Back Button */}
          {showBackButton && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => window.history.back()}
              className="mr-2"
            >
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </Button>
          )}
          {/* Logo/Branding */}
          {showBranding && (
            <Link href="/" className="flex items-center space-x-2">
              <span className="hidden md:block">
                <Image
                  src="/logo/skillpix-brand-black.svg"
                  alt="Skillpix Branding"
                  width={120}
                  height={32}
                  className="block dark:hidden"
                  priority
                />
                <Image
                  src="/logo/skillpix-brand-white.svg"
                  alt="Skillpix Branding"
                  width={120}
                  height={32}
                  className="hidden dark:block"
                  priority
                />
              </span>
              <span className="md:hidden">
                <Image
                  src="/logo/skillpix-logo-black.svg"
                  alt="Skillpix Logo"
                  width={40}
                  height={40}
                  className="block dark:hidden"
                  priority
                />
                <Image
                  src="/logo/skillpix-logo-white.svg"
                  alt="Skillpix Logo"
                  width={40}
                  height={40}
                  className="hidden dark:block"
                  priority
                />
              </span>
            </Link>
          )}
          {showNavLinks && (
            <nav className="hidden md:flex items-center space-x-6">
          {navigationLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                prefetch={true}
                className={
                  `transition-colors font-medium ` +
                  (isActive
                    ? "text-primary font-bold"
                    : "text-foreground/80 hover:text-primary")
                }
              >
                {link.name}
              </Link>
            );
          })}
            </nav>
          )}
          {/* Auth Buttons & Theme Toggle */}
          <div className="flex items-center space-x-4">
            {showAuthArea &&
              (isPending ? (
              <div className="flex items-center space-x-2">
                <BounceLoader size={24} color="white"/>
                </div>
              ) : isLoggedIn ? (
                <UserDropdown user={user} />
              ) : (
                <Link href="/login" prefetch={true}>
                  <Button variant="default">
                    Login
                  </Button>
                </Link>
              ))}
            <ThemeToggle className={!!session ? "rounded-full" : ""} />
            {/* Mobile Menu */}
            {showNavLinks && (
              <div className="md:hidden">
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-6 w-6" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-56 mt-2 rounded-2xl shadow-xl border-0 backdrop-blur-lg p-0 overflow-hidden bg-card"
                  >
                    <div className="flex flex-col space-y-1 py-4 px-3">
                      {navigationLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                          <Link
                            key={link.name}
                            href={link.href}
                            prefetch={true}
                            className={
                              `transition-colors font-medium py-2 px-3 rounded-lg text-left ` +
                              (isActive
                                ? "text-primary font-bold bg-primary/10"
                                : "text-foreground/90 hover:text-primary hover:bg-primary/10")
                            }
                          >
                            {link.name}
                          </Link>
                        );
                      })}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
