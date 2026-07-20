"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
} from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import { useGetMyTournament } from "@/api/tournament/tournaments.queries";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams, usePathname, useRouter } from "next/navigation";
import Image from "next/image";

const ITEMS = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Matches", href: "/matches", icon: Calendar },
  { name: "Bonus", href: "/bonus", icon: Trophy },
  { name: "My Predictions", href: "/predictions", icon: ListTodo },
  { name: "Leaderboard", href: "/leaderboard", icon: BarChart2 },
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setTournamentId, logout } = useAuthStore();
  const { id } = useParams<{ id: string }>();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data, isLoading, isFetching } = useGetMyTournament();

  const items =
    data?.data?.map((item) => ({
      label: item.name,
      value: item.id,
    })) || [];

  // Закриваємо меню при зміні сторінки
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header className="fixed flex items-center h-16 w-full bg-[#010409] text-white border-b-[#3d444d] border-b z-50">
      {/* Головний контейнер (завжди на передньому плані завдяки z-50) */}
      <div className="relative z-50 flex flex-grow max-w-[1400px] mx-auto px-4 md:px-8 w-full h-full items-center">
        
        {/* --- ДЕСКТОПНА ВЕРСІЯ --- */}
        <div className="hidden lg:flex items-center justify-between gap-x-8 w-full">
          <div className="flex gap-2 shrink-0">
            <Image src="/logo.svg" alt="Logo" width={32} height={32} />
            <span className="text-xs">
              Predict <br /> the win
            </span>
          </div>

          <nav className="overflow-x-auto">
            <ul className="flex items-center gap-x-8">
              {ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.name}>
                    <Link
                      href={`/${id}${item.href}`}
                      className="flex items-center gap-2 text-sm font-medium hover:text-white transition-colors duration-200"
                    >
                      <Icon className="size-5 stroke-[2.5]" />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-x-6 shrink-0">
            <Select
              items={items}
              disabled={isLoading || isFetching}
              defaultValue={id}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tournament" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {items.map((item) => (
                    <SelectItem
                      key={item.value}
                      value={item.value}
                      onClick={() => {
                        setTournamentId(item.value);
                        const updatedPath = pathname.replace(
                          /\/\d+\//,
                          `/${item.value}/`,
                        );
                        router.push(updatedPath);
                      }}
                    >
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-x-6">
              <Link
                href={"/profile"}
                className="flex items-center gap-2 text-sm font-medium hover:text-white transition-colors duration-200"
              >
                <User className="size-5 stroke-[2.5]" />
                <span className="text-left leading-tight text-xs">
                  {user?.firstName} <br /> {user?.lastName}
                </span>
              </Link>

              <LogOut
                onClick={() => {
                  logout();
                  router.push("/login");
                }}
                className="size-5 stroke-[2.5] cursor-pointer hover:text-red-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* --- МОБІЛЬНА ВЕРСІЯ (Рядок хедера) --- */}
        <div className="flex lg:hidden items-center justify-between w-full">
          <div className="flex gap-2">
            <Image src="/logo.svg" alt="Logo" width={32} height={32} />
            <span className="text-xs">
              Predict <br /> the win
            </span>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-gray-400 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="size-6 stroke-[2.5]" />
            ) : (
              <Menu className="size-6 stroke-[2.5]" />
            )}
          </button>
        </div>

      </div>

      {/* --- МОБІЛЬНЕ МЕНЮ ТА ЗАТЕМНЕННЯ (Оверлей) --- */}
      {isMenuOpen && (
        <>
          {/* 1. Затемнення фону (Backdrop). Клік по ньому закриває меню. */}
          <div
            className="fixed inset-0 bg-black/60 lg:hidden z-30 animate-in fade-in duration-200"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* 2. Випадаюче меню. Позиціонується рівно від низу хедера (top-full). */}
          <div
            className="absolute top-full left-0 w-full bg-[#010409] border-b border-brand-border px-6 py-6 flex flex-col gap-y-6 z-40 lg:hidden shadow-2xl animate-in fade-in slide-in-from-top-4 duration-250"
            onClick={(e) => e.stopPropagation()} // Запобігає закриттю при кліках всередині меню
          >
            
            {/* Селектор турнірів */}
            <div className="flex flex-col gap-y-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Tournament</span>
              <Select
                items={items}
                disabled={isLoading || isFetching}
                defaultValue={id}
              >
                <SelectTrigger className="w-full bg-brand-container border-brand-border">
                  <SelectValue placeholder="Tournament" />
                </SelectTrigger>
                <SelectContent className="bg-brand-container border-brand-border">
                  <SelectGroup>
                    {items.map((item) => (
                      <SelectItem
                        key={item.value}
                        value={item.value}
                        onClick={() => {
                          setTournamentId(item.value);
                          const updatedPath = pathname.replace(
                            /\/\d+\//,
                            `/${item.value}/`,
                          );
                          router.push(updatedPath);
                          setIsMenuOpen(false);
                        }}
                      >
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Навігація */}
            <nav className="flex flex-col gap-y-1">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Navigation</span>
              <ul className="flex flex-col gap-y-4">
                {ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === `/${id}${item.href}`;
                  return (
                    <li key={item.name}>
                      <Link
                        href={`/${id}${item.href}`}
                        className={`flex items-center gap-3 text-sm font-medium py-1.5 transition-colors duration-200 ${
                          isActive ? "text-emerald-400" : "text-gray-300 hover:text-white"
                        }`}
                      >
                        <Icon className="size-5 stroke-[2]" />
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <hr className="border-brand-border/50" />

            {/* Профіль та кнопка виходу */}
            <div className="flex items-center justify-between">
              <Link
                href={"/profile"}
                className="flex items-center gap-3 text-sm font-medium hover:text-white transition-colors duration-200"
              >
                <div className="p-2 bg-brand-container rounded-full border border-brand-border">
                  <User className="size-5 stroke-[2]" />
                </div>
                <div className="leading-tight">
                  <p className="font-semibold text-sm">{user?.firstName} {user?.lastName}</p>
                  <p className="text-xs text-gray-500">View profile</p>
                </div>
              </Link>

              <button
                onClick={() => {
                  logout();
                  router.push("/login");
                }}
                className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-red-400 hover:text-red-300 border border-red-500/20 hover:border-red-500/40 rounded-md bg-red-500/5 transition-all"
              >
                <LogOut className="size-4 stroke-[2.5]" />
                Logout
              </button>
            </div>

          </div>
        </>
      )}
    </header>
  );
}