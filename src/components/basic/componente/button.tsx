import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type AnyMouseOrPointerEvent =
  | React.PointerEvent<HTMLButtonElement>
  | React.MouseEvent<HTMLButtonElement>

const buttonVariants = cva(
  "cursor-pointer relative overflow-hidden inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive active:not-aria-[haspopup]:translate-y-px",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
        blue: "border bg-blue/30 border-blue hover:bg-blue/50 active:bg-blue/40 dark:bg-blue/30 dark:border-blue dark:hover:bg-blue/40 dark:active:bg-blue/40",
        purple: "border bg-purple/30 border-purple hover:bg-purple/50 active:bg-purple/40 dark:bg-purple/30 dark:border-purple dark:hover:bg-purple/40 dark:active:bg-purple/40",
        green: "border bg-green/30 border-green hover:bg-green/50 active:bg-green/40 dark:bg-green/30 dark:border-green dark:hover:bg-green/40 dark:active:bg-green/40",
        yellow: "border bg-yellow/30 border-yellow hover:bg-yellow/50 active:bg-yellow/40 dark:bg-yellow/30 dark:border-yellow dark:hover:bg-yellow/40 dark:active:bg-yellow/40",
        red: "border bg-red/30 border-red hover:bg-red/50 active:bg-red/40 dark:bg-red/30 dark:border-red dark:hover:bg-red/40 dark:active:bg-red/40",
        orange: "border bg-orange/30 border-orange hover:bg-orange/50 active:bg-orange/40 dark:bg-orange/30 dark:border-orange dark:hover:bg-orange/40 dark:active:bg-orange/40",
        black: "border bg-black/30 border-black hover:bg-black/50 active:bg-black/40 dark:bg-black/30 dark:border-black dark:hover:bg-black/40 dark:active:bg-black/40",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "default",
    },
  }
)

/* function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
} */

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
  tooltip?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, tooltip, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    const handleRipple = (e: AnyMouseOrPointerEvent) => {
      const target = e.currentTarget
      // por seguridad, si el botón está deshabilitado, no hacemos ripple
      if (target.hasAttribute("disabled")) return

      const circle = document.createElement("span")
      const diameter = Math.max(target.clientWidth, target.clientHeight)
      const radius = diameter / 2

      circle.style.width = circle.style.height = `${diameter}px`
      // clientX/clientY existen tanto en PointerEvent como en MouseEvent
      circle.style.left = `${e.clientX - target.getBoundingClientRect().left - radius}px`
      circle.style.top = `${e.clientY - target.getBoundingClientRect().top - radius}px`
      circle.className = "ripple"

      // elimina ripple anterior (si existe) para que uno nuevo no quede detrás
      const old = target.getElementsByClassName("ripple")[0]
      if (old) old.remove()

      // elimina el span cuando termine la animación (evita acumular nodos)
      circle.addEventListener("animationend", () => {
        circle.remove()
      })

      target.appendChild(circle)
    }

    const button = (
      <Comp
        ref={ref}
        // usamos capture para ejecutar ANTES que Radix/Radix's handler
        onPointerDownCapture={(e) => {
          handleRipple(e)
          // prop passthrough (en caso que el usuario pase onPointerDown)
          props.onPointerDown?.(e as any)
        }}
        onMouseDownCapture={(e) => {
          // redundante pero cubre escenarios donde Pointer no se dispara
          handleRipple(e)
          props.onMouseDown?.(e as any)
        }}
        // expongo el variant como atributo para estilos (opcional)
        data-variant={variant}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    )

    if (!tooltip) return button

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {button}
          </TooltipTrigger>
          <TooltipContent>
            {tooltip}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }
