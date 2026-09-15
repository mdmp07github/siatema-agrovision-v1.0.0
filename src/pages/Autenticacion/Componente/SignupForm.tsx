import { cn } from "@/lib/utils"
import { Button } from "@/components/basic/componente/button"
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card"
import {
   Field,
   FieldDescription,
   FieldGroup,
   FieldSeparator,
} from "@/components/ui/field"
import { Link, useNavigate } from "react-router-dom"
import { Form } from "@/components/ui/form"
import { z } from "zod"
import Icons from "@/images/icons/icons"
import imgGithub from "@/images/images/imgGithub.png"
import imgGoogle from "@/images/images/imgGoogle.png"
import imgFacebook from "@/images/images/imgFacebook.png"
import InputPassword from "@/components/own/input/input-password"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import InputText from "@/components/own/input/input-text"

export function SignupForm({
   className,
   ...props
}: React.ComponentProps<"div">) {

   const o_navigate = useNavigate();

   const formSchema = z.object({
      idNombres: z.string().min(1, {
         message: "El nombre es obligatorio.",
      }),
      idApellidos: z.string().min(1, {
         message: "El apellido es obligatorio.",
      }),
      idCorreo: z.string().min(1, {
         message: "El correo es obligatorio.",
      }),
      idPassword: z.string().min(1, {
         message: "La contraseña es obligatoria.",
      }),
   })

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         idNombres: "Mauro",
         idApellidos: "Miche",
         idCorreo: "mauro.miche.perez@outlook.com",
         idPassword: "Mauro123",
      },
   })

   function onSubmit(values: z.infer<typeof formSchema>) {

      console.log(values)
      o_navigate('/signin')
   }

   return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
         <Card>
            <CardHeader className="text-center">
               <CardTitle className="text-xl">Crea tu cuenta</CardTitle>
               <CardDescription>
                  Introduce tu correo electrónico a continuación para crear tu cuenta, o utiliza tu cuenta de GitHub, Google o Facebook para registrarte.
               </CardDescription>
            </CardHeader>
            <CardContent>
               <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                     <FieldGroup>
                        <div className="flex gap-2">
                           <Button className="w-full flex flex-1" variant="black" type="button">
                              <img src={imgGithub} alt={"Imagen Github"} className="w-6 h-6" />
                              GitHub
                           </Button>
                           <Button className="w-full flex flex-1" variant="black" type="button">
                              <img src={imgGoogle} alt={"Imagen Google"} className="w-6 h-6" />
                              Google
                           </Button>
                           <Button className="w-full flex flex-1" variant="black" type="button">
                              <img src={imgFacebook} alt={"Imagen Facebook"} className="w-6 h-6" />
                              Facebook
                           </Button>
                        </div>
                        <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                           O continuar con
                        </FieldSeparator>
                        <div className="flex gap-4">
                           <InputText form={form} name="idNombres" label="Nombres" placeholder="Ingrese Nombres" binding />
                           <InputText form={form} name="idApellidos" label="Apellidos" placeholder="Ingrese Apellidos" binding />
                        </div>
                        <InputText form={form} name="idCorreo" label="Correo Electrónico" placeholder="Ingrese Correo" binding />
                        <InputPassword form={form} name="idPassword" label="Contraseña" placeholder="Ingrese Contraseña" binding />
                        <Field>
                           <Button type="submit" variant="green">
                              <Icons icon="add-user-male" />
                              Crear Cuenta
                           </Button>
                           <FieldDescription className="text-center">
                              ¿Ya tienes una cuenta? <Link to="/signin">Iniciar sesión</Link>
                           </FieldDescription>
                        </Field>
                     </FieldGroup>
                  </form>
               </Form>
            </CardContent>
         </Card>
         <FieldDescription className="px-6 text-center">
            Al hacer clic en continuar, acepta nuestros <a href="#">Términos de servicio</a>{" "}
            y <a href="#">Política de privacidad</a>.
         </FieldDescription>
      </div>
   )
}
