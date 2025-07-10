"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { useState, useEffect } from "react";
import { signIn } from "@/utils/auth-client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Loader, AlertCircle } from "lucide-react";

export default function SignInCard() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [showBannedDialog, setShowBannedDialog] = useState(false);

  // Social sign-in handlers
  const handleSocialSignIn = async (provider: "google" | "github") => {
    setError(null);
    setLoading(true);
    try {
      // Get callbackUrl from query string if present
      const params = new URLSearchParams(window.location.search);
      const callbackUrl = params.get("callbackUrl") || "/";

      const { error } = await signIn.social(
        {
          provider,
          callbackURL: callbackUrl,
        },
        {
          onRequest: () => setLoading(true),
          // Do not set onResponse, let loader stay until redirect
        }
      );

      // Handle OAuth errors
      if (error?.code) {
        console.error("OAuth error:", error);

        // Handle BANNED_USER specifically with dialog
        if (error.code === "BANNED_USER") {
          setLoading(false);
          setShowBannedDialog(true);
          return;
        }

        let errorMessage = "Sign in failed. Please try again.";

        // Handle other specific OAuth error codes
        switch (error.code) {
          case "OAUTH_PROFILE_DISABLED":
            errorMessage =
              "Your account has been disabled. Please contact support.";
            break;
          case "OAUTH_ACCOUNT_NOT_LINKED":
            errorMessage =
              "This account is not linked. Please try a different sign-in method.";
            break;
          case "OAUTH_ACCESS_DENIED":
            errorMessage =
              "Access was denied. Please try again and allow access.";
            break;
          case "OAUTH_INVALID_REQUEST":
            errorMessage = "Invalid request. Please try again.";
            break;
          default:
            errorMessage = error.message || "Sign in failed. Please try again.";
        }

        setError(errorMessage);
        setLoading(false);
      }
    } catch (e) {
      const error =
        e instanceof Error ? e.message : "Sign in failed. Please try again.";
      console.error("Sign in exception:", e);
      setError(error);
      setLoading(false);
    }
    // Don't setLoading(false) in finally, only on error
  };
  // Reset form state on mount (for back navigation)
  // and when the component is re-mounted (e.g. after OAuth back)
  // This ensures the checkbox and loading state are reset
  useEffect(() => {
    setLoading(false);
    setAgreed(false);
    setError(null);
    setShowBannedDialog(false);
  }, []);

  return (
    <>
      <Card className="max-w-md w-full mx-auto">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg md:text-xl">Sign In</CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Enter your email below to sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
              <Loader className="animate-spin w-8 h-8 text-primary" />
              <div className="text-base font-medium text-muted-foreground">
                Please wait, signing you in...
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="flex items-center mb-2">
                <input
                  id="agree"
                  type="checkbox"
                  className="mr-2 accent-primary"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  disabled={loading}
                />
                <label
                  htmlFor="agree"
                  className="text-xs text-muted-foreground select-none"
                >
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy-policy"
                    className="underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>
              <Button
                variant="outline"
                className={cn(
                  "w-full gap-2 text-base md:text-base flex items-center justify-center"
                )}
                disabled={loading || !agreed}
                onClick={() => handleSocialSignIn("google")}
              >
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 256 262"
                  >
                    <path
                      fill="#4285F4"
                      d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                    ></path>
                    <path
                      fill="#34A853"
                      d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                    ></path>
                    <path
                      fill="#FBBC05"
                      d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
                    ></path>
                    <path
                      fill="#EB4335"
                      d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                    ></path>
                  </svg>
                  Sign In with Google
                </>
              </Button>
              <Button
                variant="outline"
                className={cn(
                  "w-full gap-2 text-base md:text-base flex items-center justify-center"
                )}
                disabled={loading || !agreed}
                onClick={() => handleSocialSignIn("github")}
              >
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
                    ></path>
                  </svg>
                  Sign In with GitHub
                </>
              </Button>
              {error && (
                <div className="text-sm text-red-500 text-center mt-2">
                  {error}
                </div>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2 pt-2">
          {/* Empty footer for spacing or future content */}
        </CardFooter>
      </Card>

      {/* Banned User Dialog */}
      <Dialog open={showBannedDialog} onOpenChange={setShowBannedDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <DialogTitle className="text-red-600">Account Banned</DialogTitle>
            </div>
            <DialogDescription className="text-sm text-muted-foreground">
              Your account has been banned from this application. Please contact
              support if you believe this is an error.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setShowBannedDialog(false)}
              className="w-full sm:w-auto"
            >
              Close
            </Button>
            <Button asChild className="w-full sm:w-auto">
              <Link href="/contact">Contact Support</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
