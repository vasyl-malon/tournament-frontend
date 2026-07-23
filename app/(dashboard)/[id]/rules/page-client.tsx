import { FC } from "react";
import {
  Trophy,
  Target,
  Clock,
  Sparkles,
  CheckCircle2,
  XCircle,
  Zap,
  ArrowUpDown,
  ShieldAlert,
  Layers,
} from "lucide-react";

export const RulesPage: FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10 text-gray-200">
      <div className="space-y-3 text-center sm:text-left border-b border-brand-border/40 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <Sparkles className="size-3.5" />
          <span>Official Tournament Regulations</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
          Rules & Scoring System
        </h1>
        <p className="text-gray-400 text-sm sm:text-base max-w-2xl">
          Learn how points are calculated, deadline locks, playoff tie rules,
          and tie-breaking criteria in the leaderboard.
        </p>
      </div>

      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <Target className="size-5 text-emerald-400" />
          <h2 className="text-xl font-bold text-white">
            1. Match Score Predictions
          </h2>
        </div>

        <p className="text-sm text-gray-400">
          For every match, you can earn between{" "}
          <span className="text-white font-semibold">0 to 3 points</span>.
          Points do not stack — you receive the highest matching category.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="bg-brand-container p-4 sm:p-5 rounded-xl border border-emerald-500/30 border-l-4 border-l-emerald-500 flex flex-col justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Exact Score
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 font-black text-sm border border-emerald-500/30">
                  +3 pts
                </span>
              </div>
              <p className="text-xs text-gray-300">
                You guessed the exact final score of the match.
              </p>
            </div>
            <div className="bg-brand-page p-2.5 rounded-lg border border-brand-border/40 text-xs font-mono space-y-1">
              <div className="flex justify-between text-gray-400">
                <span>Actual Result:</span>
                <span className="text-white font-bold">2 : 1</span>
              </div>
              <div className="flex justify-between text-emerald-400">
                <span>Your Pick:</span>
                <span className="font-bold">2 : 1</span>
              </div>
            </div>
          </div>

          <div className="bg-brand-container p-4 sm:p-5 rounded-xl border border-sky-500/30 border-l-4 border-l-sky-500 flex flex-col justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                  Goal Difference
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-sky-500/20 text-sky-400 font-black text-sm border border-sky-500/30">
                  +2 pts
                </span>
              </div>
              <p className="text-xs text-gray-300">
                Guessed the winner/draw and exact goal margin, but not exact
                score.
              </p>
            </div>
            <div className="bg-brand-page p-2.5 rounded-lg border border-brand-border/40 text-xs font-mono space-y-1">
              <div className="flex justify-between text-gray-400">
                <span>Actual Result:</span>
                <span className="text-white font-bold">3 : 1 (+2)</span>
              </div>
              <div className="flex justify-between text-sky-400">
                <span>Your Pick:</span>
                <span className="font-bold">2 : 0 (+2)</span>
              </div>
            </div>
          </div>

          <div className="bg-brand-container p-4 sm:p-5 rounded-xl border border-amber-500/30 border-l-4 border-l-amber-500 flex flex-col justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Correct Winner / Draw
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-400 font-black text-sm border border-amber-500/30">
                  +1 pt
                </span>
              </div>
              <p className="text-xs text-gray-300">
                Guessed the overall outcome (Home win, Away win, or Draw), but
                not goal difference.
              </p>
            </div>
            <div className="bg-brand-page p-2.5 rounded-lg border border-brand-border/40 text-xs font-mono space-y-1">
              <div className="flex justify-between text-gray-400">
                <span>Actual Result:</span>
                <span className="text-white font-bold">3 : 1 (Home)</span>
              </div>
              <div className="flex justify-between text-amber-400">
                <span>Your Pick:</span>
                <span className="font-bold">1 : 0 (Home)</span>
              </div>
            </div>
          </div>

          <div className="bg-brand-container p-4 sm:p-5 rounded-xl border border-red-500/30 border-l-4 border-l-red-500 flex flex-col justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-red-400">
                  Incorrect Outcome
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-red-500/10 text-red-400 font-bold text-sm border border-red-500/20">
                  0 pts
                </span>
              </div>
              <p className="text-xs text-gray-300">
                Missed both the winner and the score.
              </p>
            </div>
            <div className="bg-brand-page p-2.5 rounded-lg border border-brand-border/40 text-xs font-mono space-y-1">
              <div className="flex justify-between text-gray-400">
                <span>Actual Result:</span>
                <span className="text-white font-bold">1 : 2 (Away)</span>
              </div>
              <div className="flex justify-between text-red-400">
                <span>Your Pick:</span>
                <span className="font-bold">1 : 1 (Draw)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-800/30 border border-brand-border/50 text-xs text-gray-300">
          <ShieldAlert className="size-4 text-amber-400 shrink-0 mt-0.5" />
          <span>
            <strong className="text-white">120 Minutes Rule:</strong> Match
            score predictions include{" "}
            <strong className="text-white">
              Regular Time + Extra Time (120 mins)
            </strong>
            . Penalty shootouts are <strong className="text-white">NOT</strong>{" "}
            counted towards the score prediction.
          </span>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <Layers className="size-5 text-indigo-400" />
          <h2 className="text-xl font-bold text-white">
            2. Two-Legged Playoff Qualification
          </h2>
        </div>

        <div className="bg-brand-container p-5 rounded-xl border border-indigo-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Aggregated Tie Winner
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-400 font-black text-sm border border-indigo-500/30">
              +1 pt
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            In two-legged knockout ties, you can predict which team will advance
            to the next round overall.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-3 rounded-lg bg-brand-page border border-brand-border/40 text-xs">
            <span className="text-gray-400">
              Pick must be submitted{" "}
              <strong className="text-white">
                before the kickoff of the 1st match
              </strong>
              .
            </span>
            <span className="text-indigo-300 font-semibold shrink-0">
              Includes Penalty Shootout outcome
            </span>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <Zap className="size-5 text-purple-400" />
          <h2 className="text-xl font-bold text-white">3. Bonus Predictions</h2>
        </div>

        <div className="bg-brand-container p-5 rounded-xl border border-purple-500/30 space-y-4">
          <p className="text-sm text-gray-300 leading-relaxed">
            Before the tournament starts, you can submit long-term predictions
            (e.g., Tournament Winner, Golden Boot / Top Scorer, etc.).
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="bg-brand-page p-3 rounded-lg border border-brand-border/40">
              <span className="text-[10px] uppercase font-bold text-gray-500 block mb-1">
                Deadline
              </span>
              <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                <Clock className="size-3.5 text-purple-400" /> Before Tournament
                Kickoff
              </span>
            </div>

            <div className="bg-brand-page p-3 rounded-lg border border-brand-border/40">
              <span className="text-[10px] uppercase font-bold text-gray-500 block mb-1">
                Points Awarded
              </span>
              <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                <Trophy className="size-3.5 text-amber-400" /> End of Tournament
              </span>
            </div>

            <div className="bg-brand-page p-3 rounded-lg border border-brand-border/40">
              <span className="text-[10px] uppercase font-bold text-gray-500 block mb-1">
                Value
              </span>
              <span className="text-xs font-semibold text-purple-300">
                Category specific
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <Clock className="size-5 text-blue-400" />
          <h2 className="text-xl font-bold text-white">
            4. Deadlines & Locking
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-brand-container p-4 rounded-xl border border-brand-border/60 space-y-2">
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              <CheckCircle2 className="size-4 text-emerald-400" />
              <span>Editing Predictions</span>
            </div>
            <p className="text-xs text-gray-400">
              You can change your prediction as many times as you like prior to
              the match kickoff.
            </p>
          </div>

          <div className="bg-brand-container p-4 rounded-xl border border-brand-border/60 space-y-2">
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              <XCircle className="size-4 text-red-400" />
              <span>Automatic Lock</span>
            </div>
            <p className="text-xs text-gray-400">
              The moment the match officially begins, predictions for that
              fixture are locked permanently.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <ArrowUpDown className="size-5 text-amber-400" />
          <h2 className="text-xl font-bold text-white">
            5. Leaderboard Tie-Breakers
          </h2>
        </div>

        <div className="bg-brand-container p-5 rounded-xl border border-brand-border/60 space-y-3">
          <p className="text-xs sm:text-sm text-gray-300">
            If two or more players end up with the same total number of points,
            higher standing in the leaderboard is determined by the following
            priority order:
          </p>

          <ol className="space-y-2 pt-1 text-xs sm:text-sm font-medium">
            <li className="flex items-center gap-3 p-2.5 rounded-lg bg-brand-page border border-brand-border/40">
              <span className="size-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">
                1
              </span>
              <span className="text-white">
                Most Exact Score predictions (+3 pts)
              </span>
            </li>
            <li className="flex items-center gap-3 p-2.5 rounded-lg bg-brand-page border border-brand-border/40">
              <span className="size-6 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-xs shrink-0">
                2
              </span>
              <span className="text-white">
                Most Goal Difference predictions (+2 pts)
              </span>
            </li>
            <li className="flex items-center gap-3 p-2.5 rounded-lg bg-brand-page border border-brand-border/40">
              <span className="size-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0">
                3
              </span>
              <span className="text-white">
                Most Outcome / Winner predictions (+1 pt)
              </span>
            </li>
            <li className="flex items-center gap-3 p-2.5 rounded-lg bg-brand-page border border-brand-border/40">
              <span className="size-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs shrink-0">
                4
              </span>
              <span className="text-white">
                Most Correct Two-Legged Qualified Picks (+1 pt)
              </span>
            </li>
            <li className="flex items-center gap-3 p-2.5 rounded-lg bg-brand-page border border-brand-border/40">
              <span className="size-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs shrink-0">
                5
              </span>
              <span className="text-white">Most Bonus Prediction points</span>
            </li>
          </ol>
        </div>
      </section>
    </div>
  );
};
