import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-md text-sm font-semibold transition-all duration-200 outline-none select-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1117] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 gap-2 cursor-pointer active:scale-[0.98]",
  {
    variants: {
      variant: {
        // Стандартна темна кнопка під стиль бренд-карток
        default:
          "border border-brand-border bg-brand-card text-white shadow-sm hover:bg-brand-item-hover hover:border-brand-border-muted",

        // Головна дія (Emerald Primary)
        primary:
          "border border-emerald-500/30 bg-emerald-600 text-white shadow-md shadow-emerald-950/20 hover:bg-emerald-500 active:bg-emerald-700",

        // Вторинна/Прозора рамка
        outline:
          "border border-brand-border bg-transparent text-gray-200 hover:bg-brand-card hover:text-white hover:border-brand-border-muted",

        // Прихована кнопка (Ghost)
        ghost:
          "border border-transparent bg-transparent text-gray-300 hover:bg-brand-card hover:text-white",

        // Небезпечна дія (Destructive)
        destructive:
          "border border-red-500/30 bg-red-500/15 text-red-400 shadow-sm hover:bg-red-600 hover:text-white hover:border-red-500",

        // Посилання
        link: "border-transparent bg-transparent text-emerald-400 shadow-none hover:underline underline-offset-4 p-0 h-auto font-normal active:scale-100",
      },
      size: {
        default: "h-10 px-4 py-2 [&_svg:not([class*='size-'])]:size-4",
        sm: "h-8 px-3 text-xs rounded-md [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-12 px-6 text-base rounded-md [&_svg:not([class*='size-'])]:size-5",
        icon: "size-10 rounded-md flex items-center justify-center [&_svg:not([class*='size-'])]:size-4",
        "icon-sm":
          "size-8 rounded-md flex items-center justify-center [&_svg:not([class*='size-'])]:size-3.5",
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
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
