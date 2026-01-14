
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        // Apple Blue - primary action
        default: "bg-primary text-primary-foreground shadow-apple hover:shadow-apple-md hover:bg-primary/90",
        // Destructive
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-apple",
        // Outline - secondary action
        outline: "border border-border bg-background hover:bg-secondary text-foreground shadow-apple-sm",
        // Secondary - subtle
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        // Ghost - minimal
        ghost: "hover:bg-secondary text-foreground",
        // Link
        link: "text-primary underline-offset-4 hover:underline",
        // Game Gold - for achievements
        gold: "bg-gradient-gold text-white shadow-glow-gold hover:shadow-glow-gold/50",
        // Game Success - for completed tasks
        success: "bg-accent text-accent-foreground shadow-glow-green hover:bg-accent/90",
        // Apple style - gradient
        apple: "bg-gradient-apple text-white shadow-apple-md hover:shadow-apple-lg",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        xl: "h-14 rounded-2xl px-10 text-lg",
        icon: "h-10 w-10 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
