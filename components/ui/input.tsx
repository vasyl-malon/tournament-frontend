import * as React from "react";
import { cn } from "@/lib/utils";
import { FieldError } from "react-hook-form";

export type InputProps = {
  label?: React.ReactNode;
  error?: FieldError | string;
  required?: boolean;
} & React.ComponentProps<"input">;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, required, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    // Підтримуємо як FieldError з react-hook-form, так і звичайну строку
    const errorMessage = typeof error === "string" ? error : error?.message;

    return (
      <div className="flex flex-col gap-y-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold text-gray-300 block"
          >
            {label}
            {required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          type={type}
          aria-invalid={!!errorMessage}
          className={cn(
            // Основні розміри, фон та тексти (1-в-1 з ComboboxInput)
            "h-10 w-full min-w-0 rounded-[0.25rem] border border-brand-border bg-brand-container px-3.5 py-2 text-[15px] font-medium text-gray-100 tracking-wide shadow-sm transition-all duration-200 outline-none",
            // Placeholder
            "placeholder:text-gray-500 placeholder:font-normal",
            // Смарагдовий Фокус (Emerald Ring)
            "focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20",
            // Disabled стан
            "disabled:opacity-50 disabled:cursor-not-allowed",
            // Стан помилки (Aria Invalid)
            "aria-invalid:border-red-500 aria-invalid:ring-2 aria-invalid:ring-red-500/20",
            className,
          )}
          {...props}
        />

        {errorMessage && (
          <p className="text-xs text-red-400 font-normal">{errorMessage}</p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };