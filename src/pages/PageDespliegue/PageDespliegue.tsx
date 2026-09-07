import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import InputSingleSelect from "@/components/own/input/input-single-select"
import InputPicker from "@/components/own/input/input-picker"
import { Form, FormField } from "@/components/ui/form"
import Icons from "@/images/icons/icons"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/basic/componente/tabs"
import InputText from "@/components/own/input/input-text"
import InputPassword from "@/components/own/input/input-password"
import { Button } from "@/components/basic/componente/button"
import { useRef, useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

/* const oInfo = [{
  info: "Info 1"
}, {
  info: "Info 2"
}, {
  info: "Info 3"
}] */

const funFormatoFecha1 = (sFechaSistema: Date) => {

  const year = sFechaSistema.getFullYear();
  // getMonth() devuelve de 0 a 11, por eso sumamos 1. padStart asegura 2 dígitos.
  const month = String(sFechaSistema.getMonth() + 1).padStart(2, '0');
  const day = String(sFechaSistema.getDate()).padStart(2, '0');

  return `${year}${month}${day}`;
}

const funFormatoFecha2 = (sFecha: string) => {

  const anio = sFecha.substring(0, 4);
  const mes = sFecha.substring(4, 6);
  const dia = sFecha.substring(6, 8);

  return `${dia}/${mes}/${anio}`;
}

const funProyectoDesMDK = (sCodPro: string) => {

  if (sCodPro == "mdk_lpc") {
    return "agv_smartpacking_launchpad_mobile"
  } else if (sCodPro == "mdk_pro") {
    return "agv_smartpacking_produccion_mobile"
  } else if (sCodPro == "mdk_gen") {
    return "agv_smartpacking_generales_mobile"
  } else if (sCodPro == "mdk_dpc") {
    return "agv_smartpacking_despacho_mobile"
  } else if (sCodPro == "mdk_acp") {
    return "agv_smartpacking_dev_mobile"
  }

  return "";
}

const funProyectoDesCAP = (sCodPro: string) => {

  if (sCodPro == "cap_pro") {
    return "agv_smartpacking_capbl_pp_mobile"
  } else if (sCodPro == "cap_gen") {
    return "agv_smartpacking_capbl_gn_mobile"
  } else if (sCodPro == "cap_dpc") {
    return "agv_smartpacking_capbl_sd_mobile"
  } else if (sCodPro == "cap_acp") {
    return "agv_smartpacking_cap_mobile"
  }

  return "";
}

const funTipoDes1 = (sCodPro: string) => {

  if (sCodPro == "mdk_lpc") {
    return "LP"
  } else if (sCodPro == "mdk_pro") {
    return "PP"
  } else if (sCodPro == "mdk_gen") {
    return "GN"
  } else if (sCodPro == "mdk_dpc") {
    return "SD"
  } else if (sCodPro == "mdk_acp") {
    return "AC"
  }

  return "";
}

const funTipoDes2 = (sCodPro: string) => {

  if (sCodPro == "cap_pro") {
    return "PP"
  } else if (sCodPro == "cap_gen") {
    return "GN"
  } else if (sCodPro == "cap_dpc") {
    return "SD"
  } else if (sCodPro == "cap_acp") {
    return "AC"
  }

  return "";
}

const gDatosRamas1 = [
  {
    label: "Registros",
    options: [
      { ico: <Icons icon="" />, cod: "develop1", des: "develop1" },
      { ico: <Icons icon="" />, cod: "develop2", des: "develop2" },
      { ico: <Icons icon="" />, cod: "develop3", des: "develop3" },
      { ico: <Icons icon="" />, cod: "developc", des: "developc" },
      { ico: <Icons icon="" />, cod: "developm", des: "developm" },
    ],
  }
]

const gDatosProGits1 = [
  {
    label: "Registros",
    options: [
      { ico: <Icons icon="" />, cod: "mdk_acp", des: "agv_smartpacking_dev_mobile" },
      { ico: <Icons icon="" />, cod: "mdk_lpc", des: "agv_smartpacking_launchpad_mobile" },
      { ico: <Icons icon="" />, cod: "mdk_pro", des: "agv_smartpacking_produccion_mobile" },
      { ico: <Icons icon="" />, cod: "mdk_gen", des: "agv_smartpacking_generales_mobile" },
      { ico: <Icons icon="" />, cod: "mdk_dpc", des: "agv_smartpacking_despacho_mobile" },
    ],
  }
]

const gDatosProGits2 = [
  {
    label: "Registros",
    options: [
      { ico: <Icons icon="" />, cod: "cap_acp", des: "agv_smartpacking_cap_mobile" },
      { ico: <Icons icon="" />, cod: "cap_pro", des: "agv_smartpacking_capbl_pp_mobile" },
      { ico: <Icons icon="" />, cod: "cap_gen", des: "agv_smartpacking_capbl_gn_mobile" },
      { ico: <Icons icon="" />, cod: "cap_dpc", des: "agv_smartpacking_capbl_sd_mobile" },
    ],
  }
]

function PageDespliegue() {

  const [rValueTabDes, setValueTabDes] = useState("mdk");
  const [rValueFecha, setValueFecha] = useState("");
  const [rValueInhUsu, setValueInhUsu] = useState(true);
  const [rValueInhToken, setValueInhToken] = useState(true);
  const inputRefUsuario = useRef<HTMLInputElement>(null);
  const inputRefToken = useRef<HTMLInputElement>(null);
  type FormSchemaValues = z.infer<typeof formSchema>;
  type FormSchemaValues1 = z.infer<typeof formSchema1>;
  type FormSchemaValues2 = z.infer<typeof formSchema2>;
  const [rValueForm, setValueForm] = useState<Partial<FormSchemaValues>>({});
  const [rValueForm1, setValueForm1] = useState<Partial<FormSchemaValues1>>({});
  const [rValueForm2, setValueForm2] = useState<Partial<FormSchemaValues2>>({});

  const formSchema = z.object({
    idInputIniciales: z.string().min(1, { message: "Debe ser obligatorio.", }),
    idInputPickerFecha: z.date({ message: "Debe seleccionar una fecha." }),
    idInputTextUsuario: z.string().optional(),
    idInputTextToken: z.string().optional(),
  })

  const formSchema1 = z.object({
    idSwitchIncluir1: z.boolean().optional(),
    idInputSingleSelectRama1: z.string().min(1, { message: "Debe seleccionar una rama.", }),
    idInputSingleSelectProGit1: z.string().min(1, { message: "Debe seleccionar un proyecto.", }),
    idInputTextUsuSol1: z.string().optional(),
    idInputTextVersion1: z.string().min(1, { message: "Debe ser obligatorio.", }),
    idInputTextDescripcion1: z.string().min(1, { message: "Debe ser obligatorio.", }),
  })

  const formSchema2 = z.object({
    idSwitchIncluir2: z.boolean().optional(),
    idInputSingleSelectRama2: z.string().min(1, { message: "Debe seleccionar una rama.", }),
    idInputSingleSelectProGit2: z.string().min(1, { message: "Debe seleccionar un proyecto.", }),
    idInputTextUsuSol2: z.string().optional(),
    idInputTextVersion2: z.string().min(1, { message: "Debe ser obligatorio.", }),
    idInputTextDescripcion2: z.string().min(1, { message: "Debe ser obligatorio.", }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      idInputIniciales: "MM",
      idInputPickerFecha: new Date(),
      idInputTextUsuario: "x-token-auth",
      idInputTextToken: "ATATT3xFfGF065q5PsiMADsYeGhkkvMGe6wjXn9ybqwFYCGOsVwhf7T2NJ0z_Z36XSVS1VM2gOiFothjzZFyuvXW_H7tWEcgMuQotyJn9Wti-uz1X_gkAPJp8U36cj625AXSHqLoEIfG1UUqeW1Bx6YXmiFG4Vkn0069Jwq3fU8uKA8MtRAcPN0=4D90C6B9",
    },
  })

  const form1 = useForm<z.infer<typeof formSchema1>>({
    resolver: zodResolver(formSchema1),
    defaultValues: {
      idSwitchIncluir1: false,
      idInputSingleSelectRama1: "developm",
      idInputSingleSelectProGit1: "",
      idInputTextUsuSol1: "",
      idInputTextVersion1: "1.0.0",
      idInputTextDescripcion1: "",
    },
  })

  const form2 = useForm<z.infer<typeof formSchema2>>({
    resolver: zodResolver(formSchema2),
    defaultValues: {
      idSwitchIncluir2: false,
      idInputSingleSelectRama2: "developm",
      idInputSingleSelectProGit2: "",
      idInputTextUsuSol2: "",
      idInputTextVersion2: "1.0.0",
      idInputTextDescripcion2: "",
    },
  })

  // 1. Modificación de la función para el Formulario 1 (MDK)
  type DatosPaso1 = z.infer<typeof formSchema> & z.infer<typeof formSchema1>;
  const fun_on_click_siguiente_1 = async (e?: React.SyntheticEvent) => {
    if (e) e.preventDefault();

    // Validar campos del header (Iniciales / Fecha)
    const esHeaderValido = await form.trigger();
    if (!esHeaderValido) return;

    const valoresForm1 = form1.getValues();
    const oValidacion1 = valoresForm1.idSwitchIncluir1;
    setValueForm(form.getValues())
    setValueForm1(valoresForm1)

    if (oValidacion1) {
      // Si el switch está encendido, validamos los campos de form1
      const esForm1Valido = await form1.trigger();
      if (!esForm1Valido) return;
    } else {
      // Si no se incluye, limpiamos los errores visuales de form1
      form1.clearErrors();
    }

    const datosCompletos: DatosPaso1 = {
      ...form.getValues(),
      ...valoresForm1,
    };

    console.log("Datos1:", datosCompletos);
    setValueFecha(funFormatoFecha1(datosCompletos.idInputPickerFecha));
    setValueTabDes("cap");
  };

  // 2. Modificación de la función para el Formulario 2 (CAP)
  type DatosPaso2 = z.infer<typeof formSchema> & z.infer<typeof formSchema2>;
  const fun_on_click_siguiente_2 = async (e?: React.SyntheticEvent) => {
    if (e) e.preventDefault();

    const esHeaderValido = await form.trigger();
    if (!esHeaderValido) return;

    const valoresForm2 = form2.getValues();
    const oValidacion2 = valoresForm2.idSwitchIncluir2;
    setValueForm2(valoresForm2)

    if (oValidacion2) {
      const esForm2Valido = await form2.trigger();
      if (!esForm2Valido) return;
    } else {
      form2.clearErrors();
    }

    const datosCompletos: DatosPaso2 = {
      ...form.getValues(),
      ...valoresForm2,
    };

    console.log("Datos2:", datosCompletos);
    setValueFecha(funFormatoFecha1(datosCompletos.idInputPickerFecha));
    setValueTabDes("resultado");
  };

  const fun_on_click_siguiente_3 = () => {

    setValueTabDes("correo");
  }

  const funCopiarUsuario = async () => {
    //await navigator.clipboard.writeText(rValueForm.idInputTextUsuario || "");
    if (!inputRefUsuario.current) return;
    inputRefUsuario.current.select();
    document.execCommand('copy');
  }

  const funCopiarToken = async () => {
    //await navigator.clipboard.writeText(rValueForm.idInputTextToken || "");
    if (!inputRefToken.current) return;
    inputRefToken.current.select();
    document.execCommand('copy');
  }

  return (
    <div className="space-y-3 w-full">
      {/* Header con formulario independiente para la Fecha */}
      <Form {...form}>
        <div className="h-20 w-full rounded-lg bg-muted flex items-center justify-between px-6">
          <h4 className="text-3xl font-semibold text-neutral-700 dark:text-neutral-200 underline">
            Despliegue
          </h4>
          <div className="flex gap-2">
            <InputText form={form} label="Inicales" placeholder="Ingrese Iniciales" name="idInputIniciales" binding />
            <InputPicker form={form} label="Fecha" placeholder="Ingrese Fecha" format="dd/mm/yyyy" name="idInputPickerFecha" binding />
          </div>
        </div>
        <div className="w-full rounded-lg bg-muted flex gap-2 items-center p-6">
          <div className="flex-col gap-2 w-1/4">
            <div className="flex gap-2 pb-2 w-full text-muted-foreground justify-between items-center">
              <div className="flex gap-2">
                <Button type="submit" size="icon" variant="orange" tooltip="Copiar" onClick={() => funCopiarUsuario()}>
                  <Icons icon="document1" />
                </Button>
                <Button type="submit" size="icon" variant="blue" tooltip="Editar" onClick={() => setValueInhUsu(!rValueInhUsu)}>
                  <Icons icon="edit" />
                </Button>
              </div>
              <span className="text-neutral-700 dark:text-neutral-200 mr-2">Usuario</span>
            </div>
            <div className="flex gap-2">
              <InputText form={form} placeholder="Ingrese Usuario" name="idInputTextUsuario" disable={rValueInhUsu} ref={inputRefUsuario as React.RefObject<HTMLInputElement> | ((e: HTMLInputElement | null) => void) | null} />
            </div>
          </div>
          <div className="flex-col gap-2 w-3/4">
            <div className="flex gap-2 pb-2 w-full text-muted-foreground justify-between items-center">
              <div className="flex gap-2">
                <Button type="submit" size="icon" variant="orange" tooltip="Copiar" onClick={() => funCopiarToken()}>
                  <Icons icon="document1" />
                </Button>
                <Button type="submit" size="icon" variant="blue" tooltip="Editar" onClick={() => setValueInhToken(!rValueInhToken)}>
                  <Icons icon="edit" />
                </Button>
              </div>
              <span className="text-neutral-700 dark:text-neutral-200 mr-2">Token</span>
            </div>
            <div className="flex gap-2">
              <InputPassword form={form} placeholder="Ingrese Token" name="idInputTextToken" disable={rValueInhToken} ref={inputRefToken as React.RefObject<HTMLInputElement> | ((e: HTMLInputElement | null) => void) | null} />
            </div>
          </div>
        </div>
      </Form>

      {/* Contenido principal con Tabs */}
      <div className="w-full rounded-lg bg-muted flex items-center p-6">
        <Tabs className="w-full" value={rValueTabDes} onValueChange={setValueTabDes}>
          <TabsList>
            <TabsTrigger value="mdk">
              <div className="flex items-center gap-1">
                <Icons icon="monitor" className="w-6" />
                <span>MDK</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="cap">
              <div className="flex items-center gap-1">
                <Icons icon="monitor" className="w-6" />
                <span>CAP</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="resultado">
              <div className="flex items-center gap-1">
                <Icons icon="simple-right-1" className="w-6" />
                <span>Resultado</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="correo">
              <div className="flex items-center gap-1">
                <Icons icon="document1" className="w-6" />
                <span>Correo</span>
              </div>
            </TabsTrigger>
          </TabsList>

          {/* TAB MDK -> Form 1 */}
          <TabsContent value="mdk">
            <Form {...form1}>
              <form onSubmit={fun_on_click_siguiente_1}>
                <Card>
                  <CardHeader>
                    <CardTitle>
                      <div className="flex justify-between items-center">
                        <div className="flex gap-3">
                          <span>Formulario de datos de MDK</span>
                          <div className="flex items-center space-x-2">
                            <FormField
                              control={form1.control}
                              name="idSwitchIncluir1"
                              render={({ field }) => (
                                <div className="flex items-center space-x-2">
                                  <Switch
                                    id="switch-mdk"
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                  <Label htmlFor="switch-mdk">Incluir</Label>
                                </div>
                              )}
                            />
                          </div>
                        </div>
                        <Button type="submit" variant="green">
                          <Icons icon="check1" />
                          <span>Siguiente</span>
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2 pb-2 w-full text-muted-foreground">
                      <InputSingleSelect label="Rama" placeholder="-- Seleccione --" form={form1} name="idInputSingleSelectRama1" data={gDatosRamas1} binding />
                      <InputSingleSelect label="Proyecto GIT" placeholder="-- Seleccione --" form={form1} name="idInputSingleSelectProGit1" data={gDatosProGits1} binding />
                      <InputText form={form1} label="Usuario Solicitante" placeholder="Ingrese Usuario" name="idInputTextUsuSol1" />
                    </div>
                    <div className="flex gap-2 w-full text-muted-foreground">
                      <InputText className="w-1/3!" form={form1} label="Versión" placeholder="Ingrese Versión" name="idInputTextVersion1" binding />
                      <InputText className="w-2/3!" form={form1} label="Descripción" placeholder="Ingrese Descripción" name="idInputTextDescripcion1" binding />
                    </div>
                  </CardContent>
                </Card>
              </form>
            </Form>
          </TabsContent>

          {/* TAB CAP -> Form 2 */}
          <TabsContent value="cap">
            <Form {...form2}>
              <form onSubmit={fun_on_click_siguiente_2}>
                <Card>
                  <CardHeader>
                    <CardTitle>
                      <div className="flex justify-between items-center">
                        <div className="flex gap-3">
                          <span>Formulario de datos de CAP</span>
                          <div className="flex items-center space-x-2">
                            <FormField
                              control={form2.control}
                              name="idSwitchIncluir2"
                              render={({ field }) => (
                                <div className="flex items-center space-x-2">
                                  <Switch
                                    id="switch-cap"
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                  <Label htmlFor="switch-cap">Incluir</Label>
                                </div>
                              )}
                            />
                          </div>
                        </div>
                        <Button type="submit" variant="green">
                          <Icons icon="check1" />
                          <span>Siguiente</span>
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2 pb-2 w-full text-muted-foreground">
                      <InputSingleSelect label="Rama" placeholder="-- Seleccione --" form={form2} name="idInputSingleSelectRama2" data={gDatosRamas1} binding />
                      <InputSingleSelect label="Proyecto GIT" placeholder="-- Seleccione --" form={form2} name="idInputSingleSelectProGit2" data={gDatosProGits2} binding />
                      <InputText form={form2} label="Usuario Solicitante" placeholder="Ingrese Usuario" name="idInputTextUsuSol2" />
                    </div>
                    <div className="flex gap-2 w-full text-muted-foreground">
                      <InputText className="w-1/3!" form={form2} label="Versión" placeholder="Ingrese Versión" name="idInputTextVersion2" binding />
                      <InputText className="w-2/3!" form={form2} label="Descripción" placeholder="Ingrese Descripción" name="idInputTextDescripcion2" binding />
                    </div>
                  </CardContent>
                </Card>
              </form>
            </Form>
          </TabsContent>

          {/* TAB RESULTADO */}
          <TabsContent value="resultado">
            <Card>
              <CardHeader>
                <CardTitle>
                  <div className="flex justify-between items-center">
                    <span>Código GitHub</span>
                    <Button type="button" variant="green" onClick={fun_on_click_siguiente_3}>
                      <Icons icon="check1" />
                      <span>Siguiente</span>
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <ResizablePanelGroup
                  orientation="horizontal"
                  className="rounded-lg border w-full"
                >
                  {rValueForm1.idSwitchIncluir1 && (
                    <>
                      <ResizablePanel defaultSize="50%">
                        <div className="flex h-full items-center p-6">
                          <div >
                            <p className="text-popover-foreground dark:text-neutral-100 underline text-2xl">MDK</p><br />
                            <p>git add .</p>
                            <p>git status –short</p>
                            <p>git commit -m "{rValueForm.idInputIniciales}-{rValueFecha}-AJUSTES {funTipoDes1(rValueForm1.idInputSingleSelectProGit1 || "")} {rValueForm1.idInputTextDescripcion1} v{rValueForm1.idInputTextVersion1}"</p>
                            <p>git push origin {rValueForm1.idInputSingleSelectRama1}</p><br />

                            <p>git fetch origin –prune</p>
                            <p>git switch develop</p>
                            <p>git pull --ff-only origin develop</p>
                            <p>git log --oneline develop..origin/{rValueForm1.idInputSingleSelectRama1}</p>
                            <p>git merge --no-ff origin/{rValueForm1.idInputSingleSelectRama1} -m "Integración develop - {rValueForm.idInputIniciales} {rValueFecha} AJUSTES {funTipoDes1(rValueForm1.idInputSingleSelectProGit1 || "")} {rValueForm1.idInputTextDescripcion1} v{rValueForm1.idInputTextVersion1}"</p>
                            <p>git push origin develop</p><br />

                            <p>git fetch origin</p>
                            <p>git switch {rValueForm1.idInputSingleSelectRama1}</p>
                            <p>git pull --ff-only origin {rValueForm1.idInputSingleSelectRama1}</p>
                            <p>git status –short</p>
                            <p>git switch -c release/v{rValueForm1.idInputTextVersion1}_{rValueForm.idInputIniciales}_{rValueFecha}_MDK_{funTipoDes1(rValueForm1.idInputSingleSelectProGit1 || "")}_{rValueForm1.idInputTextDescripcion1?.replaceAll(" ", "_").toUpperCase()}</p>
                            <p>git push -u origin release/v{rValueForm1.idInputTextVersion1}_{rValueForm.idInputIniciales}_{rValueFecha}_MDK_{funTipoDes1(rValueForm1.idInputSingleSelectProGit1 || "")}_{rValueForm1.idInputTextDescripcion1?.replaceAll(" ", "_").toUpperCase()}</p><br />

                            <p>git switch {rValueForm1.idInputSingleSelectRama1}</p>
                          </div>
                        </div>
                      </ResizablePanel>
                    </>
                  )}
                  {rValueForm2.idSwitchIncluir2 && (
                    <>
                      <ResizableHandle withHandle />
                      <ResizablePanel defaultSize="50%">
                        <div className="flex h-full items-center p-6">
                          <div >
                            <p className="text-popover-foreground dark:text-neutral-100 underline text-2xl">CAP</p><br />
                            <p>git add .</p>
                            <p>git status –short</p>
                            <p>git commit -m "{rValueForm.idInputIniciales}-{rValueFecha}-AJUSTES {funTipoDes2(rValueForm2.idInputSingleSelectProGit2 || "")} {rValueForm2.idInputTextDescripcion2} v{rValueForm2.idInputTextVersion2}"</p>
                            <p>git push origin {rValueForm2.idInputSingleSelectRama2}</p><br />

                            <p>git fetch origin –prune</p>
                            <p>git switch develop</p>
                            <p>git pull --ff-only origin develop</p>
                            <p>git log --oneline develop..origin/{rValueForm2.idInputSingleSelectRama2}</p>
                            <p>git merge --no-ff origin/{rValueForm2.idInputSingleSelectRama2} -m "Integración develop - {rValueForm.idInputIniciales} {rValueFecha} AJUSTES {funTipoDes2(rValueForm2.idInputSingleSelectProGit2 || "")} {rValueForm2.idInputTextDescripcion2} v{rValueForm2.idInputTextVersion2}"</p>
                            <p>git push origin develop</p><br />

                            <p>git fetch origin</p>
                            <p>git switch {rValueForm2.idInputSingleSelectRama2}</p>
                            <p>git pull --ff-only origin {rValueForm2.idInputSingleSelectRama2}</p>
                            <p>git status –short</p>
                            <p>git switch -c release/v{rValueForm2.idInputTextVersion2}_{rValueForm.idInputIniciales}_{rValueFecha}_CAP_{funTipoDes2(rValueForm2.idInputSingleSelectProGit2 || "")}_{rValueForm2.idInputTextDescripcion2?.replaceAll(" ", "_").toUpperCase()}</p>
                            <p>git push -u origin release/v{rValueForm2.idInputTextVersion2}_{rValueForm.idInputIniciales}_{rValueFecha}_CAP_{funTipoDes2(rValueForm2.idInputSingleSelectProGit2 || "")}_{rValueForm2.idInputTextDescripcion2?.replaceAll(" ", "_").toUpperCase()}</p><br />

                            <p>git switch {rValueForm2.idInputSingleSelectRama2}</p>
                          </div>
                        </div>
                      </ResizablePanel>
                    </>
                  )}
                </ResizablePanelGroup>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB CORREO */}
          <TabsContent value="correo">
            <Card>
              <CardHeader>
                <CardTitle>
                  <div className="flex justify-between items-center">
                    <span>Envío de correo</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>Estimado Cesar</p><br />
                <p>Envío datos para despliegue a QAS</p><br />

                {rValueForm1.idSwitchIncluir1 && (
                  <>
                    <p className="underline">MDK</p>
                    <p> - Rama: release/v{rValueForm1.idInputTextVersion1}_{rValueForm.idInputIniciales}_{rValueFecha}_MDK_{funTipoDes1(rValueForm1.idInputSingleSelectProGit1 || "")}_{rValueForm1.idInputTextDescripcion1?.replaceAll(" ", "_").toUpperCase()}</p>
                    <p> - Fecha: {funFormatoFecha2(rValueFecha)}</p>
                    <p> - Proyecto GIT: {funProyectoDesMDK(rValueForm1.idInputSingleSelectProGit1 || "")}</p>
                    <p> - Usuario Solicitante: {rValueForm1.idInputTextUsuSol1 || "vacío"}</p>
                    <p> - Nombre de rama: {rValueForm1.idInputSingleSelectRama1}</p><br />
                  </>
                )}

                {rValueForm2.idSwitchIncluir2 && (
                  <>
                    <p className="underline">CAP</p>
                    <p> - Rama: release/v{rValueForm2.idInputTextVersion2}_{rValueForm.idInputIniciales}_{rValueFecha}_CAP_{funTipoDes2(rValueForm2.idInputSingleSelectProGit2 || "")}_{rValueForm2.idInputTextDescripcion2?.replaceAll(" ", "_").toUpperCase()}</p>
                    <p> - Fecha: {funFormatoFecha2(rValueFecha)}</p>
                    <p> - Proyecto GIT: {funProyectoDesCAP(rValueForm2.idInputSingleSelectProGit2 || "")}</p>
                    <p> - Usuario Solicitante: {rValueForm2.idInputTextUsuSol2 || "vacío"}</p>
                    <p> - Nombre de rama: {rValueForm2.idInputSingleSelectRama2}</p><br />
                  </>
                )}

                <p>Saludos</p><br />
                <p>{rValueForm1.idInputTextUsuSol1 || rValueForm2.idInputTextUsuSol2 || "vacío"}</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default PageDespliegue