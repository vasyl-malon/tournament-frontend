import { Trophy } from "lucide-react";

export const NoTournamentsPage = () => (
  <div className="max-w-md w-full text-center space-y-6 bg-[#161b22]/80 border border-brand-border/60 p-4 md:p-8 rounded-md backdrop-blur-md shadow-2xl mx-auto">
    <div className="mx-auto size-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-inner">
      <Trophy className="size-8" />
    </div>
    <div className="space-y-2 font-semibold">
      <span className="inline-block text-[0.65rem] uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-md border border-emerald-500/20">
        Out of the League
      </span>
      <h1 className="text-xl text-white tracking-tight pt-1">
        No Active Tournaments
      </h1>
    </div>
  </div>
);
