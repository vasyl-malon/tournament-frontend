"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/auth.store";

export const LandingHeader = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { accessToken, tournamentId } = useAuthStore();

  const dashboardHref = tournamentId
    ? `/${tournamentId}/dashboard`
    : "/dashboard";

  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  return (
    <header className="fixed top-0 left-0 right-0 h-16 w-full bg-brand-page/85 backdrop-blur-md text-white border-b border-brand-border/60 z-50 transition-all">
      <div className="flex max-w-[87.5rem] mx-auto px-4 md:px-8 w-full h-full items-center justify-between gap-x-4 grow">
        <Link href="/">
          <div>
            <Image
              src="/logo-full.svg"
              alt="Predict the Win Logo"
              width={120}
              height={60}
              className="h-8 w-auto sm:h-9 object-contain"
              priority
            />
          </div>
        </Link>
        {isAuthPage ? null : accessToken ? (
          <Button onClick={() => router.push(dashboardHref)}>
            Go to dashboard
          </Button>
        ) : (
          <Button onClick={() => router.push("/login")}>Sign In</Button>
        )}
      </div>
    </header>
  );
};
