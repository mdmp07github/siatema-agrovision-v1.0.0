import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/basic/componente/input-group"
import { Input } from "@/components/basic/componente/input"
import { Spinner } from "@/components/ui/spinner"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover"
import { useEffect, useState } from "react"
import { Button } from "../../basic/componente/button"
import type { ButtonProps } from "../../basic/componente/button"
import { ButtonGroup } from "../../basic/componente/button-group"
import { BrushCleaning, Info } from "lucide-react"

interface VDMInputProps {
  className?: string,
  form?: any
  name?: string
  loading?: boolean
  disable?: boolean
  binding?: boolean
  label?: string
  placeholder?: string
  info?: {
    width?: "sm" | "md" | "lg" | string
    data?: {
      info: string
    }[]
  }
  variant?: ButtonProps["variant"]
  accept?: string[] // ✅ Nuevo prop: tipos de archivo permitidos (por ejemplo: ["pdf", "xml", "png"]) 
  ref?: React.RefObject<HTMLInputElement> | ((e: HTMLInputElement | null) => void) | null
}

export default function InputSingleFile({
  className,
  form,
  name,
  loading = false,
  disable,
  binding,
  label,
  placeholder,
  info,
  variant = "default",
  accept = [], // por defecto vacío
  ref
}: VDMInputProps) {
  const hasError = !!name && !!form.formState.errors[name]
  const [fileName, setFileName] = useState<string>("")
  const multiple = false;

  if (!name) return null

  const value = form.watch(name)
  useEffect(() => {
    if (multiple && Array.isArray(value) && value.length > 0) {
      setFileName(value.map((f: File) => f.name).join(", "))
    } else if (value instanceof File) {
      setFileName(value.name)
    } else {
      setFileName("")
    }
  }, [value, multiple])

  if (loading) {
    return (
      <div className={`w-full ${className}`}>
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              {label && (<FormLabel className="flex justify-between text-md -mb-1!">
                <div className="flex gap-2">
                  {label}
                  {binding ? <span className="text-[#ff6467]">*</span> : ""}
                </div>
              </FormLabel>)}
              <FormControl>
                <InputGroup>
                  <InputGroupInput
                    className={disable ? "pointer-events-none bg-neutral-100 dark:bg-input/10" : ""}
                    placeholder={loading ? "Cargando..." : placeholder}
                    disabled={loading}
                    clear={loading}
                    {...field}
                  />
                  {loading && (
                    <InputGroupAddon align="inline-end">
                      <Spinner className="size-5 text-purple-500" />
                    </InputGroupAddon>
                  )}
                </InputGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    )
  }

  return (
    <div className={`w-full ${className}`}>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <div className={`${label ? "flex justify-between" : "flex justify-end"}`}>
              {label && (
                <FormLabel className="text-md -mb-1!">
                  <div className="flex gap-2">
                    {label}
                    {binding ? <span className="text-[#ff6467]">*</span> : ""}
                  </div>
                </FormLabel>
              )}
              {info && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Info className={`"hover:opacity-80 active:opacity-70 h-5 w-5 cursor-pointer " ${label ? "" : "mb-2"}`} />
                  </PopoverTrigger>
                  <PopoverContent className={`mx-3 ${info.width === "md" ? "w-64" : info.width === "lg" ? "w-80" : "w-48"}`}>
                    <div className="flex flex-col gap-2">
                      <span className="font-bold underline flex gap-1">
                        <Info className="h-5 w-5" /> Información
                      </span>
                      {info.data?.map((item, idx) => (
                        <span key={idx} className="text-xs">
                          • {item.info}
                        </span>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </div>

            <FormControl>
              <div className="flex items-center gap-2">
                {/* ✅ Input invisible con tipo de archivos permitidos */}
                <input
                  id={name}
                  type="file"
                  multiple={multiple}
                  accept={accept.map(ext => `.${ext}`).join(",")}
                  className="hidden"
                  onChange={(e) => {
                    const files = multiple
                      ? Array.from(e.target.files || [])
                      : e.target.files?.[0] || null
                    field.onChange(files)
                    if (multiple && Array.isArray(files)) {
                      setFileName(files.map((f) => f.name).join(", "))
                    } else if (files instanceof File) {
                      setFileName(files.name)
                    } else {
                      setFileName("")
                    }
                  }}
                />

                {/* Campo de texto que muestra el nombre */}
                <ButtonGroup className="w-full">
                  <Input
                    type="text"
                    readOnly
                    value={fileName || ""}
                    placeholder={placeholder || ""}
                    className={`pr-2 cursor-pointer hover:bg-input/40 dark:hover:bg-input/50 ${disable ? "pointer-events-none bg-neutral-100 dark:bg-input/10" : ""} ${hasError ? "border-destructive focus-visible:ring-destructive" : ""} ${label ? "" : "-mt-2"}`}
                    onClick={() => document.getElementById(name)?.click()}
                    ref={(e) => {
                      field.ref(e);
                      if (ref) {
                        if (typeof ref === "function") {
                          (ref as (e: HTMLInputElement | null) => void)(e);
                        } else {
                          (ref as React.RefObject<HTMLInputElement | null>).current = e;
                        }
                      }
                    }}
                  />
                  {/* Botón para abrir el selector */}
                  <Button
                    type="button"
                    size="icon"
                    variant={variant}
                    disabled={disable}
                    className={`${label ? "" : "-mt-2"}`}
                    onClick={() => {
                      // Limpia el nombre mostrado
                      setFileName("")

                      // Limpia el valor en react-hook-form
                      field.onChange(multiple ? [] : null)

                      // Limpia el input file (importante para permitir volver a seleccionar el mismo archivo)
                      const input = document.getElementById(name) as HTMLInputElement
                      if (input) {
                        input.value = ""
                      }
                    }}
                  >
                    <BrushCleaning />
                  </Button>
                </ButtonGroup>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
