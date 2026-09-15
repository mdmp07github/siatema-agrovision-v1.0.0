import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

type AnyMouseOrPointerEvent =
  | React.PointerEvent<HTMLButtonElement>
  | React.MouseEvent<HTMLButtonElement>

const switchVariants = cva(
  "peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent transition-all outline-none overflow-hidden group-has-focus-visible/field-label:border-transparent group-has-focus-visible/field-label:ring-0 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-disabled:cursor-not-allowed data-disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "data-checked:bg-primary data-unchecked:bg-input dark:data-unchecked:bg-input/80",
        outline:
          "data-checked:bg-background data-checked:border-border data-unchecked:bg-input dark:data-unchecked:bg-input/80",
        secondary:
          "data-checked:bg-secondary data-unchecked:bg-input dark:data-unchecked:bg-input/80",
        ghost:
          "data-checked:bg-muted data-unchecked:bg-input dark:data-unchecked:bg-input/80",
        destructive:
          "data-checked:bg-destructive data-unchecked:bg-input dark:data-unchecked:bg-input/80",
        link: "data-checked:bg-primary data-unchecked:bg-input",
        blue: "data-checked:bg-blue data-checked:border-blue data-unchecked:bg-input dark:data-unchecked:bg-input/80",
        purple:
          "data-checked:bg-purple data-checked:border-purple data-unchecked:bg-input dark:data-unchecked:bg-input/80",
        green:
          "data-checked:bg-green data-checked:border-green data-unchecked:bg-input dark:data-unchecked:bg-input/80",
        yellow:
          "data-checked:bg-yellow data-checked:border-yellow data-unchecked:bg-input dark:data-unchecked:bg-input/80",
        red: "data-checked:bg-red data-checked:border-red data-unchecked:bg-input dark:data-unchecked:bg-input/80",
        orange:
          "data-checked:bg-orange data-checked:border-orange data-unchecked:bg-input dark:data-unchecked:bg-input/80",
        black:
          "data-checked:bg-black data-checked:border-black data-unchecked:bg-input dark:data-unchecked:bg-input/80",
      },
      size: {
        default: "h-[18.4px] w-8",
        sm: "h-3.5 w-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
  VariantProps<typeof switchVariants> { }

const Switch = React.forwardRef<
  HTMLButtonElement,
  SwitchProps
>(({ className, variant, size = "default", ...props }, ref) => {
  const handleRipple = (e: AnyMouseOrPointerEvent) => {
    const target = e.currentTarget
    if (target.hasAttribute("disabled") || target.getAttribute("data-disabled") !== null) return

    const circle = document.createElement("span")
    const diameter = Math.max(target.clientWidth, target.clientHeight)
    const radius = diameter / 2

    circle.style.width = circle.style.height = `${diameter}px`
    circle.style.left = `${e.clientX - target.getBoundingClientRect().left - radius}px`
    circle.style.top = `${e.clientY - target.getBoundingClientRect().top - radius}px`
    circle.className = "ripple"

    const old = target.getElementsByClassName("ripple")[0]
    if (old) old.remove()

    circle.addEventListener("animationend", () => {
      circle.remove()
    })

    target.appendChild(circle)
  }

  return (
    <SwitchPrimitive.Root
      ref={ref}
      data-slot="switch"
      data-size={size}
      data-variant={variant}
      onPointerDownCapture={(e) => {
        handleRipple(e)
        props.onPointerDown?.(e as any)
      }}
      onMouseDownCapture={(e) => {
        handleRipple(e)
        props.onMouseDown?.(e as any)
      }}
      className={cn(switchVariants({ variant, size, className }))}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block rounded-full bg-background ring-0 transition-transform group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] dark:data-checked:bg-primary-foreground group-data-[size=default]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-unchecked:translate-x-0 dark:data-unchecked:bg-foreground"
      />
    </SwitchPrimitive.Root>
  )
})

Switch.displayName = "Switch"

export { Switch, switchVariants }