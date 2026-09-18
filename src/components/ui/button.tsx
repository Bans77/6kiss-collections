import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center border font-body uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        primary: "border-foreground bg-foreground text-ink hover:bg-glow hover:border-glow",
        outline: "border-line bg-transparent text-foreground hover:border-glow hover:text-glow",
        ghost: "border-transparent bg-transparent text-muted-foreground hover:text-foreground",
      },
      size: {
        default: "h-12 px-6 text-xs font-bold tracking-[0.2em]",
        icon: "size-10 p-0 text-xs tracking-[0]",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

function Button({ className, variant, size, asChild, ...props }: ButtonProps) {
  const Component = asChild ? Slot : "button";
  return <Component className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { Button, buttonVariants };