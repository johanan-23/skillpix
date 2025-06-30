"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "@/server/actions/users";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { PulseLoader } from "react-spinners";

export default function SignInButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleSignIn = async () => {
    startTransition(() => {
      signIn();
      router.refresh();
    });
  };

  return (
    <Button onClick={handleSignIn} className="ml-4 shadow-2xl" disabled={isPending}>
      {isPending ? <PulseLoader size={8} color={"black"} /> : "Sign In"}
    </Button>
  );
}
