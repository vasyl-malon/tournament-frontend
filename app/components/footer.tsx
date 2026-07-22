import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-brand-page text-gray-400 border-t border-brand-border/60 py-6 sm:py-8 mt-auto transition-colors">
      <div className="max-w-[87.5rem] mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-y-4">
        <div className="flex items-center gap-3">
          <Image
            src="/logo-full.svg"
            alt="Predict the Win Logo"
            width={120}
            height={40}
            className="h-7 w-auto object-contain"
          />
          <span className="text-gray-600 hidden sm:inline">•</span>
          <span className="text-xs text-gray-400 font-medium">
            © {currentYear} All rights reserved.
          </span>
        </div>

        <nav>
          <ul className="flex items-center gap-x-6 text-xs font-medium">
            <li>
              <Link
                href="/privacy"
                className="hover:text-emerald-400 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/vasyl-malion-8690ba1b5/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-emerald-400 transition-colors duration-200"
              >
                <span>LinkedIn</span>
                <ExternalLink className="size-3" />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
