"use client";


import { useSession } from "@/utils/auth-client";
import { Role } from "@prisma/client";
import Image from "next/image";

interface RoleGateProps {
  allowedRole: Role;
  children: React.ReactNode;
}

export const RoleGate = ({ allowedRole, children }: RoleGateProps) => {
  const session = useSession();
  const isAuthorized = session?.user?.role === allowedRole;

  if (!isAuthorized) {
    return (
      <Image alt="403 Error" src="/auth/403.svg" width={500} height={400} />
    );
  }

  return <>{children}</>;
};
