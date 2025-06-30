"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
interface NavLinkProps {
  children: React.ReactNode;
  href: string;
  activeClassName: string;
  nonActiveClassName: string;
  className?: string;
  [key: string]: unknown;
}

const NavLink: React.FC<NavLinkProps> = ({
  children,
  href,
  activeClassName,
  nonActiveClassName,
  className,
  ...rest
}) => {
  const pathname = usePathname(); // p
  const isActive =
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(href + "/");
  const newClassName = `${
    isActive ? activeClassName : nonActiveClassName
  } ${className}`;
  return (
    <Link href={href} className={newClassName} {...rest}>
      {children}
    </Link>
  );
};
export default NavLink;
