"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Trophy,
  Zap,
  CheckCircle2,
  ArrowRight,
  BarChart3,
  Sparkles,
  Shield,
  Clock,
  Award,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth.store";

export function HomePage() {
  const { user, tournamentId } = useAuthStore();

  const dashboardHref = tournamentId
    ? `/${tournamentId}/dashboard`
    : "/dashboard";

  return (
    <div className="flex flex-col gap-y-20 pb-16 pt-6 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative flex flex-col items-center text-center pt-8 md:pt-16 px-4 max-w-5xl mx-auto w-full">
        {/* Glow Effects */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 size-96 bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <Sparkles className="size-3.5" />
          <span>The Ultimate Football Prediction Tournament</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6">
          Predict the Scores. <br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent">
            Outsmart Friends.
          </span>{" "}
          Claim the Crown.
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg text-gray-400 max-w-2xl mb-8 leading-relaxed">
          Take your match predictions to the next level. Test your football intuition across group stages, knockout thrillers, and bonus tournaments.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          {user ? (
            <Button
              size="lg"
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-6 rounded-xl text-base shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
            >
              <Link href={dashboardHref} className="flex items-center gap-2">
                Go to Dashboard
                <ArrowRight className="size-5" />
              </Link>
            </Button>
          ) : (
            <>
              <Button
                size="lg"
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-6 rounded-xl text-base shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
              >
                <Link href="/login" className="flex items-center gap-2">
                  Get Started
                  <ArrowRight className="size-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-brand-border bg-[#161b22] hover:bg-brand-container text-gray-200 font-semibold px-8 py-6 rounded-xl text-base transition-all cursor-pointer"
              >
                <Link href="/rules">View Tournament Rules</Link>
              </Button>
            </>
          )}
        </div>

        {/* Hero Interactive Card Mockup */}
        <div className="mt-14 w-full max-w-3xl bg-[#161b22]/80 border border-brand-border/80 rounded-2xl p-6 shadow-2xl backdrop-blur-sm relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[11px] font-bold uppercase rounded-full tracking-wider">
            Match of the Day
          </div>

          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 pt-2">
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="size-12 sm:size-14 bg-brand-container border border-brand-border rounded-full flex items-center justify-center p-2">
                <Shield className="size-8 text-emerald-400" />
              </div>
              <span className="font-bold text-sm sm:text-base text-white">
                Real Madrid
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">
                Your Prediction
              </span>
              <div className="flex items-center gap-2">
                <span className="size-10 sm:size-12 bg-[#0d1117] border border-emerald-500/50 text-emerald-400 text-xl font-black rounded-xl flex items-center justify-center">
                  2
                </span>
                <span className="text-gray-500 font-bold text-xl">:</span>
                <span className="size-10 sm:size-12 bg-[#0d1117] border border-emerald-500/50 text-emerald-400 text-xl font-black rounded-xl flex items-center justify-center">
                  1
                </span>
              </div>
              <span className="text-[11px] text-emerald-400 font-semibold mt-2 flex items-center gap-1">
                <Trophy className="size-3" /> Real Madrid to advance
              </span>
            </div>

            <div className="flex flex-col items-center gap-2 text-center">
              <div className="size-12 sm:size-14 bg-brand-container border border-brand-border rounded-full flex items-center justify-center p-2">
                <Shield className="size-8 text-amber-400" />
              </div>
              <span className="font-bold text-sm sm:text-base text-white">
                Bayern Munich
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-12 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Designed for Passionate Football Fans
          </h2>
          <p className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto">
            Everything you need to run competitive prediction leagues with friends or colleagues.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#161b22] border border-brand-border/60 rounded-2xl p-6 flex flex-col gap-y-3 hover:border-emerald-500/40 transition-all">
            <div className="size-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Zap className="size-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Exact Score Bets</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Predict exact match scores to hit maximum points, or gain partial credit for guessing the winning team.
            </p>
          </div>

          <div className="bg-[#161b22] border border-brand-border/60 rounded-2xl p-6 flex flex-col gap-y-3 hover:border-emerald-500/40 transition-all">
            <div className="size-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Trophy className="size-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Knockout Stage Logic</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Select which team qualifies for the next round in case of extra time and penalty shootouts.
            </p>
          </div>

          <div className="bg-[#161b22] border border-brand-border/60 rounded-2xl p-6 flex flex-col gap-y-3 hover:border-emerald-500/40 transition-all">
            <div className="size-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Award className="size-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Bonus Tournament Picks</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Lock in your tournament champion, top scorer, and podium finishers before kickoff for huge bonus points.
            </p>
          </div>

          <div className="bg-[#161b22] border border-brand-border/60 rounded-2xl p-6 flex flex-col gap-y-3 hover:border-emerald-500/40 transition-all">
            <div className="size-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <BarChart3 className="size-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Live Leaderboards</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Track your rank in real-time as goals are scored during matchday fixtures.
            </p>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-brand-container border border-brand-border rounded-3xl p-8 sm:p-12 relative overflow-hidden">
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
              <span className="text-4xl font-black text-emerald-500/30">01</span>
              <h4 className="text-base font-bold text-white">Select Tournament</h4>
              <p className="text-xs text-gray-400">
                Choose an active tournament from your account dashboard.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-4xl font-black text-emerald-500/30">02</span>
              <h4 className="text-base font-bold text-white">Submit Predictions</h4>
              <p className="text-xs text-gray-400">
                Enter your scores before the official kickoff time of each match.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-4xl font-black text-emerald-500/30">03</span>
              <h4 className="text-base font-bold text-white">Lock Bonus Picks</h4>
              <p className="text-xs text-gray-400">
                Predict the overall tournament winner and golden boot top scorer.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-4xl font-black text-emerald-500/30">04</span>
              <h4 className="text-base font-bold text-white">Climb the Table</h4>
              <p className="text-xs text-gray-400">
                Earn points for correct scores and outcomes to top the leaderboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SCORING SYSTEM PREVIEW */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Fair & Exciting Scoring Rules
          </h2>
          <p className="text-xs sm:text-sm text-gray-400">
            Every goal matters. Here is a quick breakdown of how points are awarded:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          <div className="p-5 rounded-2xl bg-[#161b22] border border-brand-border flex items-start gap-3">
            <CheckCircle2 className="size-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-white">Exact Score</p>
              <p className="text-xs text-gray-400 mt-1">
                Predicting the exact final score line yields maximum points.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#161b22] border border-brand-border flex items-start gap-3">
            <CheckCircle2 className="size-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-white">Correct Winner / Draw</p>
              <p className="text-xs text-gray-400 mt-1">
                Predicting the right outcome or goal difference awards key points.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#161b22] border border-brand-border flex items-start gap-3">
            <CheckCircle2 className="size-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-white">Qualified Team Bonus</p>
              <p className="text-xs text-gray-400 mt-1">
                Guessing the team that advances in knockout ties gives extra bonuses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA BANNER */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-gradient-to-r from-emerald-950/40 via-brand-container to-emerald-950/40 border border-emerald-500/30 rounded-3xl p-8 sm:p-12 text-center flex flex-col items-center gap-y-6">
          <div className="size-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Users className="size-6" />
          </div>
          <div className="space-y-2 max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Ready to Prove Your Football Expertise?
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Join your league now and start placing predictions for the upcoming matchday fixtures.
            </p>
          </div>

          <Button
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-6 rounded-xl text-sm transition-all cursor-pointer shadow-lg shadow-emerald-600/20"
          >
            <Link href={user ? dashboardHref : "/login"}>
              {user ? "Open Dashboard" : "Sign In & Predict"}
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}