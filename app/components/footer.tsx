import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#010409] text-white border-t border-[#3d444d] py-6 mt-auto">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-y-4">
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
                href="https://www.linkedin.com/in/vasyl-malion-8690ba1b5/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-200"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
