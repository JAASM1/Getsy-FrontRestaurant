import * as Yum from "yup";

export const LoginValidationSchema = Yum.object().shape({
  email: Yum.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Correo electrónico no válido"
    )
    .required("El correo electrónico es requerido"),
  password: Yum.string().required("La contraseña es requerida"),
});
