import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#010409] text-[#848d97] border-t border-[#3d444d] py-6 mt-auto">
      <div className="max-w-[1400px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-y-4">
        <span className="text-xs font-normal tracking-wide">
          © {currentYear} Predict the win. All rights reserved.
        </span>
        <nav>
          <ul className="flex items-center gap-x-6 text-xs font-medium">
            <li>
              <Link
                href="/rules"
                className="hover:text-white transition-colors duration-200"
              >
                Rules
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="hover:text-white transition-colors duration-200"
              >
                Privacy
              </Link>
            </li>
            <li>
              <a
                href="https://github.com" // Можеш замінити на свій репозиторій
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-200"
              >
                GitHub
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
