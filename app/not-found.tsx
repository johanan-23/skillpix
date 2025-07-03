import Image from "next/image";
import Link from "next/link";
import React from "react";
export const runtime = "edge";
export default function NotFound() {
  return (
    <>
      <section className="relative z-10 overflow-hidden pb-16 pt-12 md:pb-20 lg:pb-28 lg:pt-2 flex items-center justify-center h-screen">
        <div className="container flex flex-col items-center justify-center">
          <Link href="/">
            <Image
              alt=""
              src="/errors/404.svg"
              width={600}
              height={400}
              className="delay-1000 motion-preset-pop motion-delay-1000"
            />
          </Link>
        </div>
      </section>
    </>
  );
}
