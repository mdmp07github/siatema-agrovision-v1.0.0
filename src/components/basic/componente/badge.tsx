import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        secondary:
          "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        destructive:
          "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
        outline:
          "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        ghost:
          "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-4 hover:underline",
        purple: "border bg-purple/30 border-purple text-purple-900 dark:bg-purple/30 dark:border-purple dark:text-purple-300",
        blue: "border bg-blue/30 border-blue text-blue-900 dark:bg-blue/30 dark:border-blue dark:text-blue-300",
        green: "border bg-green/30 border-green text-green-900 dark:bg-green/30 dark:border-green dark:text-green-300",
        yellow: "border bg-yellow/30 border-yellow text-yellow-900 dark:bg-yellow/30 dark:border-yellow dark:text-yellow-300",
        red: "border bg-red/30 border-red text-red-900 dark:bg-red/30 dark:border-red dark:text-red-300",
        orange: "border bg-orange/30 border-orange text-orange-900 dark:bg-orange/30 dark:border-orange dark:text-orange-300",
        black: "border bg-black/30 border-black text-black-900 dark:bg-black/30 dark:border-black dark:text-black-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
