import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/basic/componente/input-group"
import { Textarea } from "../../basic/componente/textarea"
import { Spinner } from "@/components/ui/spinner"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover"
import { Info } from "lucide-react"

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
  rows?: number
  ref?: React.RefObject<HTMLTextAreaElement> | ((e: HTMLTextAreaElement | null) => void) | null
}

export default function InputTextArea({ className, form, name, loading = false, disable, binding, label, placeholder, info, rows = 3, ref }: VDMInputProps) {

  const hasError = !!name && !!form.formState.errors[name]

  if (!name) return null

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
                  {label}{binding ? <span className="text-[#ff6467]">*</span> : ""}
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
  } else {
    return (
      <div className={`w-full ${className}`}>
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <div className={`${label ? "flex justify-between" : "flex justify-end"}`}>
                {label && <FormLabel className="text-md -mb-1!">
                  <div className="flex gap-2">
                    {label}{binding ? <span className="text-[#ff6467]">*</span> : ""}
                  </div>
                </FormLabel>}
                {info && <Popover>
                  <PopoverTrigger asChild>
                    <Info className={`"hover:opacity-80 active:opacity-70 h-5 w-5 cursor-pointer " ${label ? "" : "mb-2"}`} />
                  </PopoverTrigger>
                  <PopoverContent className={`mx-3 ${info.width === "md" ? "w-64" : info.width === "lg" ? "w-80" : "w-48"}`}>
                    <div className="flex flex-col gap-2">
                      <span className="font-bold underline flex gap-1"><Info className="h-5 w-5" /> Información</span>
                      {info.data?.map((item, idx) => (
                        <span key={idx} className="text-xs">
                          • {item.info}
                        </span>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>}
              </div>
              <FormControl>
                <Textarea className={`${disable ? "pointer-events-none bg-neutral-100 dark:bg-input/10" : ""} ${label ? "" : "-mt-2"} ${hasError ? "border-destructive focus-visible:ring-destructive" : ""}`} placeholder={placeholder} {...field} rows={rows} ref={(e) => {
                  field.ref(e);
                  if (ref) {
                    if (typeof ref === "function") {
                      (ref as (e: HTMLTextAreaElement | null) => void)(e);
                    } else {
                      (ref as React.RefObject<HTMLTextAreaElement | null>).current = e;
                    }
                  }
                }} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    )
  }
}
