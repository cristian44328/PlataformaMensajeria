import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({
    message: "Correo electrónico no valido",
  }),
  password: z.string().min(6, {
    message: "La contraseña debe ser de al menos 6 caracteres",
  }),
});

export const registerSchema = z
  .object({
    username: z
      .string({
        required_error: "Nombre de usuario requerido",
      })
      .min(3, {
        message: "El nombre de usuario debe ser de al menos 3 caracteres",
      }),
    email: z.string().email({
      message: "Ingrese un correo electrónico valido",
    }),
    password: z.string().min(6, {
      message: "La contraeña debe de ser de almenos 6 caracteres",
    }),
    confirmPassword: z.string().min(6, {
      message: "La contraeña debe de ser de almenos 6 caracteres",
    }),
  });