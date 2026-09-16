import { createContext, useContext, type ReactNode, useState } from "react";
import { type UseFormReturn } from "react-hook-form";
import { z } from "zod";

export const formSchema = z.object({
  idInputIniciales: z.string().min(1, { message: "Debe ser obligatorio." }),
  idInputPickerFecha: z.date({ message: "Debe seleccionar una fecha." }),
  idInputTextUsuario: z.string().optional(),
  idInputTextToken: z.string().optional(),
});

export const formSchema1 = z.object({
  idSwitchIncluir1: z.boolean().optional(),
  idInputSingleSelectRama1: z.string().min(1, { message: "Debe seleccionar una rama." }),
  idInputSingleSelectProGit1: z.string().min(1, { message: "Debe seleccionar un proyecto." }),
  idInputTextUsuSol1: z.string().optional(),
  idInputTextVersion1: z.string().min(1, { message: "Debe ser obligatorio." }),
  idInputTextDescripcion1: z.string().min(1, { message: "Debe ser obligatorio." }),
});

export const formSchema2 = z.object({
  idSwitchIncluir2: z.boolean().optional(),
  idInputSingleSelectRama2: z.string().min(1, { message: "Debe seleccionar una rama." }),
  idInputSingleSelectProGit2: z.string().min(1, { message: "Debe seleccionar un proyecto." }),
  idInputTextUsuSol2: z.string().optional(),
  idInputTextVersion2: z.string().min(1, { message: "Debe ser obligatorio." }),
  idInputTextDescripcion2: z.string().min(1, { message: "Debe ser obligatorio." }),
});

export type FormSchemaValues = z.infer<typeof formSchema>;
export type FormSchemaValues1 = z.infer<typeof formSchema1>;
export type FormSchemaValues2 = z.infer<typeof formSchema2>;

export type AppData = {
  form?: UseFormReturn<FormSchemaValues>;
  form1?: UseFormReturn<FormSchemaValues1>;
  form2?: UseFormReturn<FormSchemaValues2>;
  setValueTabDes?: (tab: string) => void;
};

type AppContextType = {
  data: AppData;
  setData: React.Dispatch<React.SetStateAction<AppData>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<any>(null);
  return (
    <AppContext.Provider value={{ data, setData }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext debe usarse dentro de AppProvider");
  }
  return context;
};