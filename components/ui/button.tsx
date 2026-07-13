import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Базові стилі GitHub: трохи менше заокруглення (rounded-md), шрифт medium,
  // специфічний синій ринг при фокусі та тонкий border.
  "group/button inline-flex shrink-0 items-center justify-center rounded-md text-sm font-medium transition-colors outline-none select-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 gap-2",
  {
    variants: {
      variant: {
        // Стандартна кнопка GitHub (сірий фон, тонка рамка)
        default:
          "border border-slate-300 bg-slate-50 text-slate-700 shadow-sm hover:bg-slate-100 hover:border-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:border-slate-600",

        // Головна дія (GitHub's iconic Green Button)
        primary:
          "border border-emerald-600/20 bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500",

        // Outline (просто рамка, без фону)
        outline:
          "border border-slate-300 bg-transparent text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800",

        // Невидима кнопка (Ghost)
        ghost:
          "border border-transparent bg-transparent text-slate-600 shadow-none hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",

        // Destructive (у GitHub це сіра кнопка з червоним текстом, яка стає повністю червоною при наведенні)
        destructive:
          "border border-slate-300 bg-slate-50 text-red-600 shadow-sm hover:border-red-600 hover:bg-red-600 hover:text-white dark:border-slate-700 dark:bg-slate-800 dark:text-red-500 dark:hover:bg-red-700 dark:hover:border-red-700 dark:hover:text-white",

        // Текстове посилання
        link: "border-transparent bg-transparent text-blue-600 shadow-none hover:underline underline-offset-4 dark:text-blue-400",
      },
      size: {
        // Розміри GitHub зазвичай досить компактні
        default: "h-8 px-3 py-1.5 [&_svg:not([class*='size-'])]:size-4",
        sm: "h-7 px-2.5 text-xs [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-10 px-4 text-base [&_svg:not([class*='size-'])]:size-5",
        icon: "size-8 flex justify-center [&_svg:not([class*='size-'])]:size-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn('cursor-pointer', buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
