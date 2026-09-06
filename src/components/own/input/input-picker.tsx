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
import { Calendar } from "@/components/ui/calendar"
import { Button } from "../../basic/componente/button"
import type { ButtonProps } from "../../basic/componente/button"
import { CalendarIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { ButtonGroup } from "../../basic/componente/button-group"
import { es } from "react-day-picker/locale"
import { Label } from "../../ui/label"
import { BrushCleaning } from "lucide-react"
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
  format?: string
  locale?: Partial<import("react-day-picker").Locale>
  type?: "single" | "range" | "multiple"
  variant?: ButtonProps["variant"]
  disableDays?: {
    day?: Date | string
    past?: boolean
    future?: boolean
    weekends?: boolean
  }
  disableRanges?: { from: Date | string; to: Date | string }[]
  enableRanges?: { from: Date | string; to: Date | string }[]
  disableSpecificDays?: (Date | string)[]
  enableSpecificDays?: (Date | string)[]
  ref?: React.RefObject<HTMLInputElement> | ((e: HTMLInputElement | null) => void) | null
}

export default function InputPicker({
  className,
  form,
  name,
  loading = false,
  disable,
  binding,
  label,
  placeholder,
  info,
  format = "yyyy-mm-dd",
  type = "single",
  variant = "default",
  locale = es,
  disableDays = { day: new Date(), past: false, future: false, weekends: false },
  disableRanges = [],
  enableRanges = [],
  disableSpecificDays = [],
  enableSpecificDays = [],
  ref
}: VDMInputProps) {

  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<any>() // puede ser Date | Date[] | { from: Date; to: Date }
  const [month, setMonth] = useState<Date | undefined>()
  const [inputText, setInputText] = useState("")
  const hasError = !!name && !!form.formState.errors[name]

  if (!name) return null

  const funMaskDate1 = (sValue: string): string => {
    const clean = sValue.replace(/\D/g, "").slice(0, 8);
    const padded = clean.padEnd(8, "_");
    return `${padded.slice(0, 4)}-${padded.slice(4, 6)}-${padded.slice(6, 8)}`;
  };

  const funMaskDate2 = (sValue: string): string => {
    const clean = sValue.replace(/\D/g, "").slice(0, 16);
    const padded = clean.padEnd(16, "_");
    const f1 = `${padded.slice(0, 4)}-${padded.slice(4, 6)}-${padded.slice(6, 8)}`;
    const f2 = `${padded.slice(8, 12)}-${padded.slice(12, 14)}-${padded.slice(14, 16)}`;
    return `${f1} - ${f2}`;
  };

  const funMaskDate3 = (sValue: string): string => {
    const digits = sValue.replace(/\D/g, "");
    if (digits.length === 0) return "____-__-__";

    const totalDates = Math.ceil(digits.length / 8);
    const blocks: string[] = [];

    for (let i = 0; i < totalDates; i++) {
      const chunk = digits.slice(i * 8, (i + 1) * 8).padEnd(8, "_");
      const y = chunk.slice(0, 4);
      const m = chunk.slice(4, 6);
      const d = chunk.slice(6, 8);
      blocks.push(`${y}-${m}-${d}`);
    }

    return blocks.join(", ");
  };

  const parseAndTriggerRangeChange = (text: string, onChange: (val: any) => void) => {
    const clean = text.replace(/\D/g, "");
    if (clean.length === 16) {
      const y1 = Number(clean.slice(0, 4)), m1 = Number(clean.slice(4, 6)), d1 = Number(clean.slice(6, 8));
      const y2 = Number(clean.slice(8, 12)), m2 = Number(clean.slice(12, 14)), d2 = Number(clean.slice(14, 16));

      const dateFrom = new Date(y1, m1 - 1, d1);
      const dateTo = new Date(y2, m2 - 1, d2);

      if (
        isValidDate(dateFrom) && dateFrom.getFullYear() === y1 && dateFrom.getMonth() === m1 - 1 && dateFrom.getDate() === d1 &&
        isValidDate(dateTo) && dateTo.getFullYear() === y2 && dateTo.getMonth() === m2 - 1 && dateTo.getDate() === d2
      ) {
        setDate({ from: dateFrom, to: dateTo });
        onChange({ from: dateFrom, to: dateTo });
        return;
      }
    }
    onChange(undefined);
  };

  const parseAndTriggerMultipleChange = (text: string, onChange: (val: any) => void) => {
    const clean = text.replace(/\D/g, "");
    if (clean.length === 0) {
      setDate(undefined);
      onChange(undefined);
      return;
    }

    const dateList: Date[] = [];
    const totalChunks = Math.floor(clean.length / 8);

    for (let i = 0; i < totalChunks; i++) {
      const chunk = clean.slice(i * 8, (i + 1) * 8);
      const y = Number(chunk.slice(0, 4));
      const m = Number(chunk.slice(4, 6));
      const d = Number(chunk.slice(6, 8));
      const parsed = new Date(y, m - 1, d);

      if (
        isValidDate(parsed) &&
        parsed.getFullYear() === y &&
        parsed.getMonth() === m - 1 &&
        parsed.getDate() === d
      ) {
        dateList.push(parsed);
      }
    }

    if (dateList.length > 0) {
      setDate(dateList);
      onChange(dateList);
    } else {
      onChange(undefined);
    }
  };

  const isDayDisabled = (day: Date) => {

    const base = disableDays.day ? toLocalDate(disableDays.day) : toLocalDate(new Date());

    const baseNum = toDateNumber(base);
    const dayNum = toDateNumber(day);

    if (disableDays.past && dayNum < baseNum) return true;

    if (disableDays.future && dayNum > baseNum) return true;

    if (disableDays.weekends) {
      const dow = day.getDay();
      if (dow === 0 || dow === 6) return true;
    }

    // 🚫 Deshabilitar varios rangos
    if (disableRanges && disableRanges.length > 0) {
      for (const range of disableRanges) {
        const fromNum = toDateNumber(toLocalDate(range.from));
        const toNum = toDateNumber(toLocalDate(range.to));
        if (dayNum >= fromNum && dayNum <= toNum) return true;
      }
    }

    // ✅ Solo habilitar dentro de los rangos permitidos (varios)
    if (enableRanges && enableRanges.length > 0) {
      let isInsideAnyRange = false;
      for (const range of enableRanges) {
        const fromNum = toDateNumber(toLocalDate(range.from));
        const toNum = toDateNumber(toLocalDate(range.to));
        if (dayNum >= fromNum && dayNum <= toNum) {
          isInsideAnyRange = true;
          break;
        }
      }
      // Si no está dentro de ningún rango permitido → deshabilitar
      if (!isInsideAnyRange) return true;
    }

    // 🚫 Deshabilitar días específicos (por ejemplo 2025-11-15, 2025-11-18, etc.)
    if (disableSpecificDays && disableSpecificDays.length > 0) {
      const currentNum = toDateNumber(day);
      for (const d of disableSpecificDays) {
        const dNum = toDateNumber(toLocalDate(d));
        if (currentNum === dNum) return true;
      }
    }

    // ✅ Solo habilitar días específicos
    if (enableSpecificDays && enableSpecificDays.length > 0) {
      const dayNum = toDateNumber(day);
      const isEnabled = enableSpecificDays.some((d) => toDateNumber(toLocalDate(d)) === dayNum);
      return !isEnabled; // si no está en la lista, deshabilita
    }

    return false;
  };

  function toLocalDate(d: Date | string): Date {

    if (typeof d === "string") {
      const [y, m, day] = d.split("-").map(Number);
      return new Date(y, m - 1, day);
    }
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  function toDateNumber(d: Date): number {
    return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  }

  useEffect(() => {
    const raw = form?.getValues(name)
    if (!raw) return
    if (type === "range" && raw?.from) {
      setDate({ from: new Date(raw.from), to: raw.to ? new Date(raw.to) : undefined })
    } else if (type === "multiple" && Array.isArray(raw)) {
      setDate(raw.map((d: any) => new Date(d)))
    } else {
      const initial = raw instanceof Date ? raw : new Date(raw)
      if (isValidDate(initial)) {
        setDate(initial)
        setMonth(initial)
      }
    }
  }, [form, name, type])

  useEffect(() => {
    if (type === "range") {
      if (!date?.from) return setInputText("")
      const from = formatDate(date.from)
      const to = date.to ? formatDate(date.to) : ""
      setInputText(to ? `${from} - ${to}` : from)
    } else if (type === "multiple") {
      if (!Array.isArray(date)) return setInputText("")
      setInputText(date.map((d: Date) => formatDate(d)).join(", "))
    } else {
      setInputText(formatDate(date))
    }
  }, [date, type])

  useEffect(() => {
    const defaultValue = form.getValues(name);

    if (!defaultValue) {
      setDate(undefined);
      setMonth(undefined);
      setInputText("");
      return;
    }

    if (type === "range") {
      setDate({
        from: defaultValue.from ? new Date(defaultValue.from) : undefined,
        to: defaultValue.to ? new Date(defaultValue.to) : undefined
      });
    } else if (type === "multiple") {
      setDate(defaultValue.map((d: any) => new Date(d)));
    } else {
      setDate(new Date(defaultValue));
      setMonth(new Date(defaultValue));
    }
  }, [form.formState]);

  function formatDate(date: Date | undefined) {

    if (!date) return ""
    const y = String(date.getFullYear())
    const m = String(date.getMonth() + 1).padStart(2, "0")
    const d = String(date.getDate()).padStart(2, "0")
    if (format === "large") {
      const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
      const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
      return `${dias[date.getDay()]} ${d} de ${meses[date.getMonth()]} del ${y}`
    }
    return format.replace("yyyy", y).replace("mm", m).replace("dd", d)
  }

  function isValidDate(date: Date | undefined) {
    return !!date && !isNaN(date.getTime())
  }

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
                  {label}{binding ? <Label className="text-[#ff6467]">*</Label> : ""}
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
                    {label}{binding ? <span className="text-[#ff6467]">*</span> : ""}
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
                      <span className="font-bold underline flex gap-1"><Info className="h-5 w-5" /> Información</span>
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

            <div className="relative">
              <FormControl>
                <ButtonGroup className="w-full">
                  <Input
                    className={`pr-10 ${disable ? "pointer-events-none bg-neutral-100 dark:bg-input/10" : ""} ${label ? "" : "-mt-2"} ${hasError ? "border-destructive focus-visible:ring-destructive" : ""}`}
                    name={field.name}
                    /* ref={field.ref} */
                    value={inputText || (type === "range" ? "____-__-__ - ____-__-__" : type === "multiple" ? "____-__-__" : "____-__-__")}
                    placeholder={placeholder}
                    /* readOnly={type !== "single"} */
                    onBeforeInput={(e: any) => {
                      if (type === "single" || type === "range" || type === "multiple") {
                        const input = e.target as HTMLInputElement;
                        const char = e.data;

                        if (!/^\d$/.test(char)) {
                          e.preventDefault();
                          return;
                        }

                        const defaultMask = type === "range" ? "____-__-__ - ____-__-__" : "____-__-__";
                        const currentText = inputText || defaultMask;
                        let start = input.selectionStart ?? 0;

                        // Avanzar si el cursor está sobre separadores
                        while (start < currentText.length && (currentText[start] === "-" || currentText[start] === " " || currentText[start] === ",")) {
                          start++;
                        }

                        let targetText = currentText;
                        if (type === "multiple" && start >= currentText.length) {
                          targetText = currentText + ", ____-__-__";
                          while (start < targetText.length && (targetText[start] === "-" || targetText[start] === " " || targetText[start] === ",")) {
                            start++;
                          }
                        }

                        if (start >= targetText.length) {
                          e.preventDefault();
                          return;
                        }

                        e.preventDefault();

                        const textArray = targetText.split("");
                        textArray[start] = char;
                        const updatedText = textArray.join("");

                        setInputText(updatedText);

                        let nextCursor = start + 1;
                        while (nextCursor < updatedText.length && (updatedText[nextCursor] === "-" || updatedText[nextCursor] === " " || updatedText[nextCursor] === ",")) {
                          nextCursor++;
                        }
                        setTimeout(() => input.setSelectionRange(nextCursor, nextCursor), 0);

                        if (type === "single") {
                          if (!updatedText.includes("_")) {
                            const [y, m, d] = updatedText.split("-").map(Number);
                            const parsedDate = new Date(y, m - 1, d);
                            if (
                              isValidDate(parsedDate) &&
                              parsedDate.getFullYear() === y &&
                              parsedDate.getMonth() === m - 1 &&
                              parsedDate.getDate() === d
                            ) {
                              setDate(parsedDate);
                              setMonth(parsedDate);
                              field.onChange(parsedDate);
                              return;
                            }
                          }
                          field.onChange(undefined);
                        } else if (type === "range") {
                          parseAndTriggerRangeChange(updatedText, field.onChange);
                        } else if (type === "multiple") {
                          parseAndTriggerMultipleChange(updatedText, field.onChange);
                        }
                      }
                    }}
                    onKeyDown={(e) => {
                      if (type === "single" || type === "range" || type === "multiple") {
                        const input = e.target as HTMLInputElement;
                        let start = input.selectionStart ?? 0;
                        let end = input.selectionEnd ?? 0;

                        if (e.key === "Backspace") {
                          e.preventDefault();

                          const defaultMask = type === "range" ? "____-__-__ - ____-__-__" : "____-__-__";
                          const textArray = (inputText || defaultMask).split("");

                          if (start !== end) {
                            for (let i = start; i < end; i++) {
                              if (textArray[i] !== "-" && textArray[i] !== " " && textArray[i] !== ",") {
                                textArray[i] = "_";
                              }
                            }
                          } else {
                            if (start > 0 && (textArray[start - 1] === "-" || textArray[start - 1] === " " || textArray[start - 1] === ",")) {
                              while (start > 0 && (textArray[start - 1] === "-" || textArray[start - 1] === " " || textArray[start - 1] === ",")) {
                                start--;
                              }
                            }
                            if (start > 0) {
                              start--;
                              textArray[start] = "_";
                            }
                          }

                          let updatedText = textArray.join("");

                          if (type === "multiple") {
                            while (updatedText.endsWith(", ____-__-__") && updatedText.length > 10) {
                              updatedText = updatedText.slice(0, -12);
                            }
                          }

                          setInputText(updatedText);

                          if (type === "single") {
                            field.onChange(undefined);
                          } else if (type === "range") {
                            parseAndTriggerRangeChange(updatedText, field.onChange);
                          } else if (type === "multiple") {
                            parseAndTriggerMultipleChange(updatedText, field.onChange);
                          }

                          setTimeout(() => input.setSelectionRange(start, start), 0);
                        }
                      }
                    }}
                    onChange={(e) => {
                      if (type === "range") {
                        const formattedValue = funMaskDate2(e.target.value);
                        setInputText(formattedValue);
                        parseAndTriggerRangeChange(formattedValue, field.onChange);
                      } else if (type == "single") {
                        const formattedValue = funMaskDate1(e.target.value);
                        setInputText(formattedValue);
                        const cleanDigits = formattedValue.replace(/\D/g, "");
                        if (cleanDigits.length === 8) {
                          const year = Number(cleanDigits.slice(0, 4));
                          const month = Number(cleanDigits.slice(4, 6));
                          const day = Number(cleanDigits.slice(6, 8));
                          const parsedDate = new Date(year, month - 1, day);

                          if (
                            isValidDate(parsedDate) &&
                            parsedDate.getFullYear() === year &&
                            parsedDate.getMonth() === month - 1 &&
                            parsedDate.getDate() === day
                          ) {
                            setDate(parsedDate);
                            setMonth(parsedDate);
                            field.onChange(parsedDate);
                            return;
                          }
                        }
                        field.onChange(undefined)
                      } else if (type === "multiple") {
                        const formattedValue = funMaskDate3(e.target.value);
                        setInputText(formattedValue);
                        parseAndTriggerMultipleChange(formattedValue, field.onChange);
                      } else {
                        const nextDate = new Date(e.target.value)
                        setInputText(e.target.value)
                        if (isValidDate(nextDate)) {
                          field.onChange(nextDate)
                        } else {
                          field.onChange(undefined)
                        }
                      }
                    }}
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
                  <Button
                    type="button"
                    size="icon"
                    variant={variant}
                    disabled={disable}
                    className={`${label ? "" : "-mt-2"}`}
                    onClick={() => {
                      setInputText("")
                      setDate(undefined)
                      field.onChange(undefined)
                    }}
                  >
                    <BrushCleaning />
                  </Button>
                </ButtonGroup>
              </FormControl>

              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    disabled={disable}
                    variant="ghost"
                    className={`absolute mr-8 z-10 ${label ? "top-1/2" : "top-2.5"} right-3 size-6 -translate-y-1/2`}
                  >
                    <CalendarIcon className="size-3.5" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="end" sideOffset={10}>
                  <Calendar
                    mode={type}
                    selected={date}
                    captionLayout="dropdown"
                    month={month}
                    onMonthChange={setMonth}
                    locale={{ ...locale, options: { ...es.options, weekStartsOn: 0 } }}
                    onSelect={(selected: any) => {
                      setDate(selected)
                      field.onChange(selected)
                      if (type === "single") setOpen(false)
                    }}
                    {...(type === "range" ? { required: false } : {})}
                    disabled={isDayDisabled}
                    modifiersClassNames={{
                      booked: "[&>button]:line-through opacity-100",
                    }}
                    modifiers={{
                      booked: isDayDisabled,
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
