import { FC } from "react";
import {
  ShieldCheck,
  Lock,
  Database,
  Cookie,
  Mail,
  UserCheck,
  FileText,
} from "lucide-react";

export const PrivacyPage: FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-2 py-4 md:py-8 space-y-8 text-gray-200">
      <div className="space-y-3 border-b border-brand-border/40 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <ShieldCheck className="size-3.5" />
          <span>Data Protection & Privacy</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
          Privacy Policy
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">
          This policy explains how we collect, store, and process your data when
          you participate in our prediction platform.
        </p>
      </div>
      <div className="bg-brand-container p-4 rounded-md border border-brand-border/60 flex items-start gap-3 text-xs sm:text-sm text-gray-300">
        <FileText className="size-5 text-emerald-400 shrink-0 mt-0.5" />
        <p>
          We value your privacy. As a closed, invite-only platform, we collect
          only the minimal amount of personal information necessary to manage
          your user account, maintain tournament leaderboards, and process your
          match predictions.
        </p>
      </div>

      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <UserCheck className="size-5 text-emerald-400" />
          <h2 className="text-lg font-bold text-white">
            1. Information We Collect
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-brand-container p-4 rounded-md border border-brand-border/60 space-y-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Mail className="size-4 text-sky-400" />
              Account & Credentials
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              When an invitation is issued to your email address, you set up
              your account by providing your{" "}
              <strong className="text-gray-200">First Name</strong>,{" "}
              <strong className="text-gray-200">Last Name</strong>, and a secure{" "}
              <strong className="text-gray-200">Password</strong>.
            </p>
          </div>
          <div className="bg-brand-container p-4 rounded-md border border-brand-border/60 space-y-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Database className="size-4 text-amber-400" />
              Game Activity Data
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              We store your{" "}
              <strong className="text-gray-200">match predictions</strong>,
              calculated points, ranking history, and tournament participation
              statistics directly in our database.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <Cookie className="size-5 text-sky-400" />
          <h2 className="text-lg font-bold text-white">
            2. Local Storage & Cookies
          </h2>
        </div>
        <div className="bg-brand-container p-4 rounded-md border border-brand-border/60 space-y-3">
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            We use technical browser storage mechanisms strictly for essential
            authentication and session state handling:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li className="flex max-md:flex-col items-start gap-2.5 p-3 rounded-md bg-brand-page border border-brand-border/40">
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[0.625rem] font-semibold uppercase shrink-0 mt-0.5">
                Cookies
              </span>
              <span className="text-gray-300">
                Used to securely store session tokens required by our backend
                server to keep you logged in.
              </span>
            </li>
            <li className="flex max-md:flex-col items-start gap-2.5 p-3 rounded-md bg-brand-page border border-brand-border/40">
              <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 text-[0.625rem] font-semibold uppercase shrink-0 mt-0.5">
                Local Storage
              </span>
              <span className="text-gray-300">
                Stores non-sensitive UI state preferences (such as view modes,
                cached table filters, or active layout settings).
              </span>
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <Lock className="size-5 text-amber-400" />
          <h2 className="text-lg font-bold text-white">
            3. Security & Data Usage
          </h2>
        </div>
        <div className="bg-brand-container p-4 rounded-md border border-brand-border/60 space-y-3">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-white">
              How your data is protected:
            </h3>
            <ul className="list-disc list-inside text-xs sm:text-sm text-gray-400 space-y-1.5 pl-1">
              <li>
                Passwords are never stored in plain text; they are encrypted
                using strong industry-standard hashing algorithms.
              </li>
              <li>
                Your email address and personal data are strictly used for
                platform authentication.
              </li>
              <li>
                <strong className="text-white">
                  Zero Third-Party Sharing:
                </strong>{" "}
                We do not sell, rent, or share your personal information with
                third-party advertisers or data brokers.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="size-5 text-purple-400" />
          <h2 className="text-lg font-semibold text-white">
            4. Your Rights & Data Retention
          </h2>
        </div>
        <div className="bg-brand-container p-4 rounded-md border border-brand-border/60 space-y-3 text-xs sm:text-sm text-gray-300">
          <p>
            Your account and prediction history remain active as long as you
            participate in active tournaments.
          </p>
          <p>
            You have the right to request access to the personal data we hold
            about you or to request complete deletion of your account and
            related predictions from our database.
          </p>
          <div className="pt-2">
            <span className="text-xs text-gray-400 block">
              To request account removal or query your stored data, please
              contact the tournament administrator.
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
