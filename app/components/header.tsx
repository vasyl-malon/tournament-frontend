"use client";

import Link from "next/link";
import {
  Home,
  Calendar,
  Network,
  Trophy,
  ListTodo,
  BarChart2,
  PieChart,
  HelpCircle,
  User,
  Balloon,
  LogOut,
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

const ITEMS = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Matches", href: "/matches", icon: Calendar },
  // { name: "Knockout", href: "/knockout", icon: Network },
  { name: "Bonus", href: "/bonus", icon: Trophy },
  { name: "My Predictions", href: "/predictions", icon: ListTodo },
  { name: "Leaderboard", href: "/leaderboard", icon: BarChart2 },
  // { name: "Statistics", href: "/statistics", icon: PieChart },
  // { name: "Help", href: "/help", icon: HelpCircle },
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setTournamentId, logout } = useAuthStore();

  console.log(pathname);

  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isFetching } = useGetMyTournament();

  const items =
    data?.data?.map((item) => ({
      label: item.name,
      value: item.id,
    })) || [];

  return (
    <header className="flex items-center h-16 w-full bg-[#010409] text-white border-b-[#3d444d] border-b overflow-hidden">
      <div className="flex flex-grow max-w-[1400px] mx-auto">
        <div className="flex items-center justify-around gap-x-8 w-full">
          <h1 className="font-bold text-lg leading-tight uppercase tracking-wide text-nowrap">
            Football tournament
          </h1>

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
                      <div>
                        <Icon className="size-5 stroke-[2.5]" />
                      </div>
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

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
              <div>
                <User className="size-5 stroke-[2.5]" />
              </div>
              {user?.firstName}
              <br />
              {user?.lastName}
            </Link>

            <LogOut
              onClick={() => {
                logout();
                router.push("/login");
              }}
              className="size-5 stroke-[2.5] cursor-pointer"
            />
          </div>

          {/* <div className="flex items-center shrink-0 h-full">
            <button className="flex items-center justify-center w-12 h-12 mr-2 hover:text-white transition-colors">
              <User className="size-5 stroke-[2.5]" />
            </button>
            <div className="">{user?.firstName + " " + user?.lastName}</div>
          </div> */}
        </div>
      </div>
    </header>
  );
}
