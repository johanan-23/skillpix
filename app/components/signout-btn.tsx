"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/utils/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PulseLoader } from "react-spinners";

export default function SignOutButton() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const handleSignOut = async () => {
    setIsPending(true);
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            setIsPending(false);
            router.refresh();
          },
        },
      });
    } catch (error) {
      console.error("Sign out failed:", error);
      setIsPending(false);
    }
  };

  return (
    <Button onClick={handleSignOut} className="mr-4 w-full bg-destructive hover:bg-destructive/80" disabled={isPending}>
      {isPending ? <PulseLoader size={8} color={"black"} /> : "Sign Out"}
    </Button>
  );
}
