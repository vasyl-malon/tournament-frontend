"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from "lucide-react";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "dark" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[#161b22] group-[.toaster]:text-white group-[.toaster]:border-brand-border group-[.toaster]:shadow-2xl group-[.toaster]:rounded-xl group-[.toaster]:p-4 group-[.toaster]:gap-3 font-sans border",
          title:
            "group-[.toast]:text-sm group-[.toast]:font-semibold text-white",
          description:
            "group-[.toast]:text-xs group-[.toast]:text-gray-400 mt-0.5",
          actionButton:
            "group-[.toast]:bg-emerald-600 group-[.toast]:text-white group-[.toast]:font-bold group-[.toast]:rounded-lg group-[.toast]:px-3 group-[.toast]:py-1.5 group-[.toast]:text-xs transition-colors hover:group-[.toast]:bg-emerald-500",
          cancelButton:
            "group-[.toast]:bg-brand-card group-[.toast]:text-gray-300 group-[.toast]:rounded-lg group-[.toast]:px-3 group-[.toast]:py-1.5 group-[.toast]:text-xs hover:group-[.toast]:bg-brand-item-hover",
          success:
            "group-[.toast]:border-emerald-500/40 group-[.toast]:bg-emerald-500/10 [&_[data-icon]]:text-emerald-400",
          error:
            "group-[.toast]:border-red-500/40 group-[.toast]:bg-red-500/10 [&_[data-icon]]:text-red-400",
          warning:
            "group-[.toast]:border-amber-500/40 group-[.toast]:bg-amber-500/10 [&_[data-icon]]:text-amber-400",
          info: "group-[.toast]:border-sky-500/40 group-[.toast]:bg-sky-500/10 [&_[data-icon]]:text-sky-400",
        },
      }}
      icons={{
        success: (
          <CircleCheckIcon className="size-4 shrink-0 text-emerald-400" />
        ),
        info: <InfoIcon className="size-4 shrink-0 text-sky-400" />,
        warning: (
          <TriangleAlertIcon className="size-4 shrink-0 text-amber-400" />
        ),
        error: <OctagonXIcon className="size-4 shrink-0 text-red-400" />,
        loading: (
          <Loader2Icon className="size-4 shrink-0 text-emerald-400 animate-spin" />
        ),
      }}
      {...props}
    />
  );
};

export { Toaster };
