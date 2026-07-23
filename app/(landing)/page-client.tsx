"use client";

import Link from "next/link";
import {
  Trophy,
  Zap,
  CheckCircle2,
  ArrowRight,
  BarChart3,
  Sparkles,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/auth.store";

export function HomePage() {
  const { tournamentId, accessToken } = useAuthStore();

  const dashboardHref = tournamentId
    ? `/${tournamentId}/dashboard`
    : "/dashboard";

  return (
    <div className="flex flex-col gap-y-12 md:gap-y-20 overflow-hidden px-4 md:px-8 pt-26 md:pt-32 pb-12 md:pb-20">
      <section className="relative flex flex-col items-center text-center max-w-5xl mx-auto w-full">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 size-96 bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <Sparkles className="size-3.5" />
          <span>The Ultimate Football Prediction Tournament</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6">
          Predict the Scores. <br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent">
            Outsmart Friends.
          </span>{" "}
          Claim the Crown.
        </h1>
        <p className="text-sm sm:text-base text-gray-400 max-w-2xl mb-8 leading-relaxed">
          Take your match predictions to the next level. Test your football
          intuition across group stages, knockout thrillers, and bonus
          tournaments.
        </p>
        <Button
          size="lg"
          className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-6 rounded-xl text-base shadow-lg shadow-emerald-600/20 transition-all cursor-pointer border-none"
        >
          <Link
            href={accessToken ? dashboardHref : "/login"}
            className="flex items-center gap-2"
          >
            {accessToken ? "Go to Dashboard" : "Get Started"}
            <ArrowRight className="size-5" />
          </Link>
        </Button>
      </section>

      <section className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-12 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Designed for Passionate Football Fans
          </h2>
          <p className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto">
            Everything you need to run competitive prediction leagues with
            friends or colleagues.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#161b22] border border-brand-border/60 rounded-lg p-6 flex flex-col gap-y-3 hover:border-emerald-500/40 transition-all">
            <div className="size-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Zap className="size-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Exact Score Bets</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Predict exact match scores to hit maximum points, or gain partial
              credit for guessing the winning team.
            </p>
          </div>
          <div className="bg-[#161b22] border border-brand-border/60 rounded-lg p-6 flex flex-col gap-y-3 hover:border-emerald-500/40 transition-all">
            <div className="size-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Trophy className="size-5" />
            </div>
            <h3 className="text-lg font-bold text-white">
              Knockout Stage Logic
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Select which team qualifies for the next round in case of extra
              time and penalty shootouts.
            </p>
          </div>
          <div className="bg-[#161b22] border border-brand-border/60 rounded-lg p-6 flex flex-col gap-y-3 hover:border-emerald-500/40 transition-all">
            <div className="size-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Award className="size-5" />
            </div>
            <h3 className="text-lg font-bold text-white">
              Bonus Tournament Picks
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Lock in your tournament champion, top scorer, and podium finishers
              before kickoff for huge bonus points.
            </p>
          </div>
          <div className="bg-[#161b22] border border-brand-border/60 rounded-lg p-6 flex flex-col gap-y-3 hover:border-emerald-500/40 transition-all">
            <div className="size-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <BarChart3 className="size-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Live Leaderboards</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Track your rank in real-time as goals are scored during matchday
              fixtures.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto w-full">
        <div className="bg-brand-container border border-brand-border rounded-lg p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-xl mb-10 space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Step-by-Step
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              How the Tournament Works
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            <div className="flex flex-col gap-2">
              <span className="text-4xl font-black text-emerald-500/30">
                01
              </span>
              <h4 className="text-base font-bold text-white">
                Select Tournament
              </h4>
              <p className="text-xs text-gray-400">
                Choose an active tournament from your account dashboard.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-4xl font-black text-emerald-500/30">
                02
              </span>
              <h4 className="text-base font-bold text-white">
                Submit Predictions
              </h4>
              <p className="text-xs text-gray-400">
                Enter your scores before the official kickoff time of each
                match.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-4xl font-black text-emerald-500/30">
                03
              </span>
              <h4 className="text-base font-bold text-white">
                Lock Bonus Picks
              </h4>
              <p className="text-xs text-gray-400">
                Predict the overall tournament winner and golden boot top
                scorer.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-4xl font-black text-emerald-500/30">
                04
              </span>
              <h4 className="text-base font-bold text-white">
                Climb the Table
              </h4>
              <p className="text-xs text-gray-400">
                Earn points for correct scores and outcomes to top the
                leaderboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto w-full text-center space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Fair & Exciting Scoring Rules
          </h2>
          <p className="text-xs sm:text-sm text-gray-400">
            Every goal matters. Here is a quick breakdown of how points are
            awarded:
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          <div className="p-5 rounded-lg bg-[#161b22] border border-brand-border flex items-start gap-3">
            <CheckCircle2 className="size-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-white">Exact Score</p>
              <p className="text-xs text-gray-400 mt-1">
                Predicting the exact final score line yields maximum points.
              </p>
            </div>
          </div>
          <div className="p-5 rounded-lg bg-[#161b22] border border-brand-border flex items-start gap-3">
            <CheckCircle2 className="size-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-white">
                Correct Winner / Draw
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Predicting the right outcome or goal difference awards key
                points.
              </p>
            </div>
          </div>
          <div className="p-5 rounded-lg bg-[#161b22] border border-brand-border flex items-start gap-3">
            <CheckCircle2 className="size-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-white">
                Qualified Team Bonus
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Guessing the team that advances in knockout ties gives extra
                bonuses.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
