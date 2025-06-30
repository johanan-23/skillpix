"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, LogOut, BookOpen, Github, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/utils/auth-client";
import SignOutButton from "./signout-btn";
import Image from "next/image";

// Mock navigation links
const navigationLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "#about" },
  // { name: "Pricing", href: "#pricing" },
  { name: "Features", href: "#features" },
  { name: "Contact", href: "#contact" },
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const {
    data: session,
    isPending,
  } = authClient.useSession();
  const isLoggedIn = session?.user || false;
  const user = {
    name: session?.user.name,
    email: session?.user.email,
    image: session?.user.image,
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
              variant="ghost"
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
                {/* Light branding (shown in light mode) */}
                <Image
                  src="/logo/skillpix-brand-black.svg"
                  alt="Skillpix Branding"
                  width={120}
                  height={32}
                  className="block dark:hidden"
                  priority
                />
                {/* Dark branding (shown in dark mode) */}
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
                {/* Light logo (shown in light mode) */}
                <Image
                  src="/logo/skillpix-logo-black.svg"
                  alt="Skillpix Logo"
                  width={40}
                  height={40}
                  className="block dark:hidden"
                  priority
                />
                {/* Dark logo (shown in dark mode) */}
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
          {/* Navigation Links */}
          {showNavLinks && (
            <nav className="hidden md:flex items-center space-x-6">
              {navigationLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  prefetch={true}
                  className="text-foreground/80 hover:text-primary transition-colors font-medium"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          )}
          {/* Auth Buttons & Theme Toggle */}
          <div className="flex items-center space-x-4">
            {showAuthArea &&
              (isPending ? (
                <div className="flex items-center space-x-2"></div>
              ) : (
                <>
                  {session ? (
                    <DropdownMenu modal={false}>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="relative h-8 w-8 rounded-full"
                        >
                          <Avatar className="size-9 border-[2px] border-primary cursor-pointer overflow-hidden flex items-center justify-center">
                            <AvatarImage
                              src={session?.user.image || ""}
                              alt={session?.user.name || "User Avatar"}
                              className="object-cover"
                            />
                            <AvatarFallback className="flex items-center justify-center">
                              {session?.user.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className="w-56"
                        align="end"
                        forceMount
                      >
                        <DropdownMenuLabel className="font-normal">
                          <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">
                              {session.user.name}
                            </p>
                            <p className="text-xs leading-none text-muted-foreground">
                              {session.user.email}
                            </p>
                          </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <User className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <BookOpen className="mr-2 h-4 w-4" />
                          <span>My Learning</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Github className="mr-2 h-4 w-4" />
                          <span>GitHub</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <SignOutButton />
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Link href="/login">
                      <Button variant="default">Log in</Button>
                    </Link>
                  )}
                </>
              ))}
            <ThemeToggle className={!!session ? "rounded-full" : ""} />
            {/* Mobile Menu */}
            {showNavLinks && (
              <div className="md:hidden">
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-6 w-6" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right">
                    <SheetTitle hidden>Skillpix Menu</SheetTitle>
                    <div className="flex flex-col space-y-2 mt-8 px-4">
                      {navigationLinks.map((link) => (
                        <Link
                          key={link.name}
                          href={link.href}
                          prefetch={true}
                          className="text-foreground/80 hover:text-primary transition-colors font-medium py-2 text-left hover:underline underline-offset-4"
                          onClick={() => setIsSheetOpen(false)}
                        >
                          {link.name}
                        </Link>
                      ))}
                      <div className="pt-6 border-t border-muted-foreground">
                        {!isLoggedIn ? (
                          <Link
                            href="/login"
                            onClick={() => setIsSheetOpen(false)}
                          >
                            <Button className="w-full" variant="default">
                              Login
                            </Button>
                          </Link>
                        ) : (
                          <div className="space-y-6">
                            <div className="flex items-center justify-between space-x-4 bg-primary/10 p-2 rounded-full w-fit pr-12 mx-auto">
                              <Avatar className="h-12 w-12 mr-6">
                                <AvatarImage
                                  src={user.image || ""}
                                  alt={user.name}
                                />
                                <AvatarFallback className="bg-primary text-primary-foreground">
                                  {user.name?.charAt(0) || "?"}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium text-center">
                                  {user.name}
                                </p>
                                <p className="text-xs text-muted-foreground text-center">
                                  {user.email}
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="destructive"
                              className="w-full "
                              onClick={() => setIsSheetOpen(false)}
                            >
                              <LogOut className="mr-2 h-4 w-4" />
                              <span>Log out</span>
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
