import React from "react";
import { Check, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Step {
  title: string;
  description?: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  maxStepReached?: number;
  isCompletedAll?: boolean;
  onStepClick?: (stepIndex: number) => void;
  className?: string;
}

export function Stepper({
  steps,
  currentStep,
  maxStepReached = currentStep,
  isCompletedAll = false,
  onStepClick,
  className,
}: StepperProps) {
  return (
    <div className={cn("w-full pt-4", className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCurrent = index === currentStep && !isCompletedAll;

          // Pasos anteriores al máximo alcanzado ya están completados (deben llevar Check)
          const isCompleted = index < maxStepReached || isCompletedAll;

          // Solo el paso más avanzado en progreso lleva el lápiz
          const isPencil = index === maxStepReached && !isCompletedAll;

          // Permite hacer clic en cualquier paso ya alcanzado
          const isClickable = onStepClick && (index <= maxStepReached || isCompletedAll);

          const handleClick = () => {
            if (isClickable) {
              onStepClick(index);
            }
          };

          return (
            <React.Fragment key={index}>
              {/* Contenedor del paso */}
              <div
                onClick={handleClick}
                className={cn(
                  "flex items-center gap-3",
                  isClickable ? "cursor-pointer select-none" : "cursor-default"
                )}
              >
                {/* Ícono del paso */}
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-200",
                    // Estilos para pasos completados (Check)
                    isCompleted && !isCurrent && "border-primary bg-primary text-primary-foreground",
                    isCompleted && isCurrent && "border-primary bg-primary text-primary-foreground ring-4 ring-primary/20",

                    // Estilos para el paso en progreso (Lápiz)
                    isPencil && isCurrent && "border-primary text-primary ring-4 ring-primary/20",
                    isPencil && !isCurrent && "border-primary text-primary",

                    // Estilos para pasos bloqueados (Número)
                    !isCompleted && !isPencil && "border-muted-foreground/30 text-muted-foreground",

                    isClickable && "hover:opacity-80"
                  )}
                >
                  {isPencil ? (
                    <Pencil className="h-5 w-5" />
                  ) : isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    index + 1
                  )}
                </div>

                {/* Texto del paso */}
                <div className="hidden sm:block">
                  <p
                    className={cn(
                      "text-sm font-medium leading-none transition-colors",
                      isCurrent && "text-primary font-semibold",
                      !isCurrent && !isCompleted && !isPencil && "text-muted-foreground",
                      isClickable && "hover:text-primary"
                    )}
                  >
                    {step.title}
                  </p>
                  {step.description && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Línea divisora */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "h-0.5 flex-1 mx-2 transition-colors duration-200",
                    index < maxStepReached || isCompletedAll ? "bg-primary" : "bg-muted-foreground/20"
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}