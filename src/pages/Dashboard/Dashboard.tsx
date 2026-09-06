import InputText from "@/components/own/input/input-text"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import { z } from "zod"
import InputEmail from "@/components/own/input/input-email"
import InputMultiFile from "@/components/own/input/input-multi-file"
import InputMultiSelect from "@/components/own/input/input-multi-select"
import Icons from "@/images/icons/icons"
import InputNumber from "@/components/own/input/input-number"
import InputPicker from "@/components/own/input/input-picker"
import InputSingleFile from "@/components/own/input/input-single-file"
import InputTextArea from "@/components/own/input/input-text-area"
import InputSingleSelect from "@/components/own/input/input-single-select"
import InputPassword from "@/components/own/input/input-password"
import { enUS } from "react-day-picker/locale"

const oInfo = [{
  info: "Info 1"
}, {
  info: "Info 2"
}, {
  info: "Info 3"
}]

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

function Dashboard() {

  const formSchema = z.object({
    idInputEjemplo1: z.string().optional(),
    idInputEjemplo2: z.date().optional(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      idInputEjemplo1: "Ejemplo 1",
      idInputEjemplo2: new Date(),
    },
  })

  return (
    <>
      <h4 className="text-3xl font-semibold text-neutral-700 dark:text-neutral-200 underline">
        Dashboard
      </h4>
      <div className="flex gap-2 w-full px-1">
        <Form {...form}>
          <InputText form={form} label="Inicales" name="idInputEjemplo1" info={{ width: "md", data: oInfo }} binding />
          {/* <InputPassword form={form} label="Inicales" name="idInputEjemplo2" info={{ width: "md", data: oInfo }} binding /> */}
          {/* <InputSingleSelect form={form} label="Inicales" name="idInputEjemplo2" info={{ width: "md", data: oInfo }} data={gDatosRamas1} placeholder="-- Seleccione --" binding /> */}
          {/* <InputEmail form={form} label="Inicales" name="idInputEjemplo1" info={{ width: "md", data: oInfo }} binding /> */}
          {/* <InputMultiFile form={form} label="Inicales" name="idInputEjemplo2" info={{ width: "md", data: oInfo }} binding /> */}
          {/* <InputMultiSelect form={form} label="Inicales" name="idInputEjemplo1" info={{ width: "md", data: oInfo }} data={gDatosRamas1} binding /> */}
          {/* <InputNumber form={form} label="Inicales" name="idInputEjemplo2" info={{ width: "md", data: oInfo }} binding /> */}
          <InputPicker form={form} label="Inicales" name="idInputEjemplo2" info={{ width: "md", data: oInfo }} type="single" format="large" variant={"green"} binding />
          {/* <InputSingleFile form={form} label="Inicales" name="idInputEjemplo2" info={{ width: "md", data: oInfo }} binding /> */}
          {/* <InputTextArea form={form} label="Inicales" name="idInputEjemplo2" info={{ width: "md", data: oInfo }} binding /> */}
        </Form>
      </div>
      <h3 className="mt-3">
        Lista de componentes actualizados de SHADCN
      </h3>
      <ul className="ml-6 list-disc [&>li]:mt-1">
        <li>Button</li>
        <li>Icons</li>
        <li>Input</li>
        <li>Checkbox</li>
        <li>Input-group</li>
        <li>Pagination</li>
        <li>Badge</li>
        <li>Sidebar</li>
        <li>Tabs</li>
        <li>Select</li>
        <li>multi-select</li>
        <li>textarea</li>
        <li>table</li>
        <li>Dialog</li>
      </ul>
      <h3 className="mt-3">
        URLs
      </h3>
      <ul className="ml-6 list-disc [&>li]:mt-1">
        <li>npm install @dnd-kit/core - https://dndkit.com/</li>
        <li>npm install @dnd-kit/modifiers - https://docs.dndkit.com/api-documentation/modifiers</li>
        <li>npm install @dnd-kit/sortable - https://docs.dndkit.com/presets/sortable</li>
        <li>https://tabler.io/icons</li>
        <li>https://tanstack.com/table/latest/docs/introduction</li>
        <li>https://pokemondb.net/pokedex/national</li>
        <li>https://pokemon-go.name/es/pokemony/</li>
        <li>PDF: https://react-pdf.org/</li>
        <li>Excel: npm install exceljs file-saver y npm install --save-dev @types/file-saver</li>
        <li>Word: npm install docx file-saver y npm install --save-dev @types/file-saver</li>
      </ul>
    </>
  )
}

export default Dashboard
