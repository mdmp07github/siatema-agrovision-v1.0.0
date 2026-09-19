import { CardLayout, CardLayoutBody, CardLayoutHeader } from "@/components/basic/componente/card-layout";
import { useState } from "react";
import { Stepper, type Step } from "@/components/basic/componente/stepper";
import { Button } from "@/components/basic/componente/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const stepsList: Step[] = [
  { title: "Cuenta", description: "Detalles del usuario" },
  { title: "Perfil", description: "Información personal" },
  { title: "Verificación", description: "Validar identidad" }, // Paso 3
  { title: "Confirmación", description: "Revisar y enviar" },   // Paso 4
];

function PageTable() {
  const [currentStep, setCurrentStep] = useState(0);
  const [maxStepReached, setMaxStepReached] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleNext = () => {
    if (currentStep < stepsList.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setMaxStepReached((prev) => Math.max(prev, nextStep));
    } else {
      setIsFinished(true);
    }
  };

  const handlePrev = () => {
    if (isFinished) {
      setIsFinished(false);
    } else if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      setMaxStepReached(prevStep); // Al ir hacia atrás con el botón, también reseteamos el alcance
    }
  };

  const handleStepClick = (stepIndex: number) => {
    setIsFinished(false);
    setCurrentStep(stepIndex);
    setMaxStepReached(stepIndex); // Actualiza el máximo alcanzado al paso seleccionado
  };

  return (
    <CardLayout>
      <CardLayoutHeader>
        <h4 className="text-3xl font-semibold text-neutral-700 dark:text-neutral-200 underline">
          Table
        </h4>
      </CardLayoutHeader>
      <CardLayoutBody>
        <Card className="w-full mx-auto">
          <CardHeader>
            <CardTitle className="text-xl">Registro de Usuario</CardTitle>

            <Stepper
              steps={stepsList}
              currentStep={currentStep}
              maxStepReached={maxStepReached}
              isCompletedAll={isFinished}
              onStepClick={handleStepClick}
            />
          </CardHeader>

          <CardContent className="flex items-center justify-center border-t pt-3">
            {isFinished ? (
              <div className="text-center">
                <p className="text-lg font-semibold text-primary">¡Proceso Completado!</p>
                <p className="text-sm text-muted-foreground mt-1">Todos los datos han sido guardados.</p>
              </div>
            ) : (
              <>
                {currentStep === 0 && <p className="text-sm">Paso 1: Formulario de Cuenta</p>}
                {currentStep === 1 && <p className="text-sm">Paso 2: Formulario de Perfil</p>}
                {currentStep === 2 && <p className="text-sm">Paso 3: Verificación de Identidad</p>}
                {currentStep === 3 && <p className="text-sm">Paso 4: Resumen y Confirmación</p>}
              </>
            )}
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === 0 && !isFinished}
            >
              Anterior
            </Button>

            <Button
              onClick={handleNext}
              disabled={isFinished}
            >
              {currentStep === stepsList.length - 1 ? "Finalizar" : "Siguiente"}
            </Button>
          </CardFooter>
        </Card>
      </CardLayoutBody>
    </CardLayout>
  );
}

export default PageTable;