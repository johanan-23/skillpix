"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

type BanStatusResult = {
  banned: boolean;
  banReason?: string;
  banExpires?: string;
};

export default function BannedPage() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BanStatusResult | null>(null);
  const [error, setError] = useState("");

  async function handleCheckBanStatus(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError("");
    try {
      const res = await fetch("/api/ban-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unknown error");
      setResult(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Failed to check ban status");
      } else {
        setError("Failed to check ban status");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-background">
      <Card className="w-full max-w-md shadow-xl border border-border rounded-2xl mx-6">
        <CardContent className="flex flex-col items-center p-8 md:p-6">
          <div className="text-center space-y-4 w-full mt-2">
            <h1 className="text-3xl md:text-4xl font-bold text-destructive">
              Account Suspended
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-md mx-auto">
              Your account has been suspended due to a violation of our terms of
              service.
            </p>
            <div className="bg-destructive/10 rounded-lg p-4">
              <p className="text-sm text-destructive font-medium">
                Access Denied: You are currently unable to access your account
                or use our services.
              </p>
            </div>
            <div className="pt-2">
              <p className="text-xs text-muted-foreground">
                If you believe this is a mistake, please{" "}
                <a
                  href="/contact"
                  className="text-primary underline font-medium"
                >
                  contact support
                </a>
                .
              </p>
              <Link href="/" className="block mt-6">
                <Button className="w-full" variant="outline">
                  Go Home
                </Button>
              </Link>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full mt-3" variant="secondary">
                    See why you&apos;re banned
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>Check Ban Details</DialogTitle>
                  <DialogDescription>
                    Enter your email to see ban reason and details.
                  </DialogDescription>
                  <form
                    onSubmit={handleCheckBanStatus}
                    className="space-y-4 mt-2"
                  >
                    <Label htmlFor="ban-email">Email</Label>
                    <Input
                      id="ban-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="your@email.com"
                      autoFocus
                      disabled={loading}
                    />
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={loading || !email}
                    >
                      {loading ? "Checking..." : "Check Status"}
                    </Button>
                  </form>
                  {error && (
                    <Alert variant="destructive" className="mt-4">
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  {result && (
                    <Alert className="mt-4">
                      <AlertTitle>Ban Status:</AlertTitle>
                      <AlertDescription>
                        {result.banned ? (
                          <div>
                            <div className="font-semibold text-destructive">
                              You are banned.
                            </div>
                            {result.banReason && (
                              <div>Reason: {result.banReason}</div>
                            )}
                            {result.banExpires && (
                              <div>
                                Banned until:{" "}
                                {new Date(result.banExpires).toLocaleString()}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="text-green-600">
                            You are not banned.
                          </div>
                        )}
                      </AlertDescription>
                    </Alert>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
