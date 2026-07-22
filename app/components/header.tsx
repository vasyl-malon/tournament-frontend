"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import {
  Home,
  Calendar,
  Trophy,
  ListTodo,
  BarChart2,
  User,
  LogOut,
  Menu,
  X,
  BookOpen,
} from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useGetMyTournaments } from "@/api";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Matches", href: "/matches", icon: Calendar },
  { name: "Bonus", href: "/bonus", icon: Trophy },
  { name: "My Predictions", href: "/predictions", icon: ListTodo },
  { name: "Leaderboard", href: "/leaderboard", icon: BarChart2 },
  { name: "Rules", href: "/rules", icon: BookOpen },
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setTournamentId, logout } = useAuthStore();
  const { id } = useParams<{ id: string }>();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { data, isLoading, isFetching } = useGetMyTournaments();

  const tournamentOptions =
    data?.data?.map((item) => ({
      label: item.name,
      value: String(item.id),
    })) || [];

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const handleTournamentChange = (newTournamentId: string | null) => {
    setTournamentId(newTournamentId || "");

    if (id && pathname.includes(`/${id}`)) {
      const updatedPath = pathname.replace(`/${id}`, `/${newTournamentId}`);
      router.push(updatedPath);
    } else {
      router.push(`/${newTournamentId}/dashboard`);
    }
  };

  const selectedTournamentLabel = tournamentOptions.find(
    (item) => item.value === String(id),
  )?.label;

  return (
    <header className="fixed top-0 left-0 right-0 h-16 w-full bg-brand-page/85 backdrop-blur-md text-white border-b border-brand-border/60 z-50 transition-all">
      <div className="flex max-w-[87.5rem] mx-auto px-4 md:px-8 w-full h-full items-center justify-between gap-x-4">
        <Link href={id ? `/${id}/dashboard` : "/"}>
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

        <nav className="hidden xl:flex items-center gap-x-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const targetHref = `/${id}${item.href}`;
            const isActive =
              pathname === targetHref || pathname.startsWith(`${targetHref}/`);

            return (
              <Link
                key={item.name}
                href={targetHref}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 border border-transparent",
                  isActive
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm"
                    : "text-gray-400 hover:text-white hover:bg-[#161b22]",
                )}
              >
                <Icon className="size-4 shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden xl:flex items-center gap-x-4 shrink-0">
          <Select
            value={id ? String(id) : undefined}
            onValueChange={handleTournamentChange}
            disabled={isLoading || isFetching}
          >
            <SelectTrigger className="!rounded-xl">
              <SelectValue placeholder="Select Tournament" className="min-w-40">
                {selectedTournamentLabel}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {tournamentOptions.map((item) => (
                  <SelectItem
                    key={item.value}
                    value={item.value}
                    className="text-xs focus:bg-emerald-500/10 focus:text-emerald-400 cursor-pointer rounded-md"
                  >
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="h-4 w-px bg-brand-border/60" />

          <div className="flex items-center gap-x-3 grow">
            <Link
              href={`/${id}/profile`}
              className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-[#161b22] transition-colors group w-max"
            >
              <div className="size-8 rounded-lg bg-[#161b22] border border-brand-border flex items-center justify-center text-gray-300 group-hover:border-emerald-500/40 group-hover:text-emerald-400 transition-colors">
                <User className="size-4" />
              </div>
              <div className="text-start leading-tight hidden xl:block">
                <p className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-[0.625rem] text-gray-400 pt-1">
                  View Profile
                </p>
              </div>
            </Link>

            <button
              onClick={() => {
                logout();
                router.push("/login");
              }}
              title="Logout"
              className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all cursor-pointer"
            >
              <LogOut className="size-4" />
            </button>
          </div>
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="xl:hidden p-2 text-gray-400 hover:text-white hover:bg-[#161b22] rounded-xl focus:outline-none transition-colors"
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {mounted &&
        isMenuOpen &&
        createPortal(
          <div className="xl:hidden">
            <div
              className="fixed top-16 inset-0 bg-black/50 backdrop-blur-sm z-40 animate-in fade-in duration-200 cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            />

            <div className="fixed top-16 left-0 right-0 bg-brand-page border-b border-brand-border px-5 py-6 flex flex-col gap-y-6 z-50 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 max-h-[calc(100vh-4rem)] overflow-y-auto">
              <div className="space-y-1.5">
                <span className="text-[0.625rem] font-semibold text-gray-500 uppercase tracking-wider">
                  Active Tournament
                </span>
                <Select
                  value={id ? String(id) : undefined}
                  onValueChange={(val) => {
                    handleTournamentChange(val);
                    setIsMenuOpen(false);
                  }}
                  disabled={isLoading || isFetching}
                >
                  <SelectTrigger className="w-full bg-[#161b22] border-brand-border text-xs text-white rounded-xl h-10 mt-1">
                    <SelectValue placeholder="Select Tournament">
                      {selectedTournamentLabel}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="bg-[#161b22] border-brand-border text-white rounded-xl z-[60]">
                    <SelectGroup>
                      {tournamentOptions.map((item) => (
                        <SelectItem
                          key={item.value}
                          value={item.value}
                          className="text-xs focus:bg-emerald-500/10 focus:text-emerald-400"
                        >
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <nav className="space-y-1">
                <span className="text-[0.625rem] font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                  Navigation
                </span>
                <ul className="flex flex-col gap-y-1">
                  {NAV_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const targetHref = `/${id}${item.href}`;
                    const isActive =
                      pathname === targetHref ||
                      pathname.startsWith(`${targetHref}/`);

                    return (
                      <li key={item.name}>
                        <Link
                          href={targetHref}
                          onClick={() => setIsMenuOpen(false)}
                          className={cn(
                            "flex items-center gap-3 text-xs font-semibold px-3 py-2.5 rounded-xl transition-all",
                            isActive
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : "text-gray-300 hover:text-white hover:bg-[#161b22]",
                          )}
                        >
                          <Icon className="size-4 shrink-0" />
                          <span>{item.name}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="h-px bg-brand-border/60" />

              <div className="flex items-center justify-between pt-1">
                <Link
                  href="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 text-xs font-medium hover:text-white transition-colors"
                >
                  <div className="size-9 bg-[#161b22] rounded-xl border border-brand-border flex items-center justify-center text-emerald-400">
                    <User className="size-4" />
                  </div>
                  <div className="leading-tight">
                    <p className="font-bold text-white text-xs">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-[0.625rem] text-gray-500 pt-1">
                      View account details
                    </p>
                  </div>
                </Link>
                <Button
                  size="sm"
                  variant="destructive"
                  className="rounded-xl"
                  onClick={() => {
                    setIsMenuOpen(false);
                    logout();
                    router.push("/login");
                  }}
                >
                  <LogOut className="size-3.5" />
                  <span>Logout</span>
                </Button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </header>
  );
}
