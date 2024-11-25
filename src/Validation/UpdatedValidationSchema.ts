import * as Yup from "yup";

export const UpdatedValidationSchema = Yup.object().shape({
    nameRestaurant: Yup.string().required(
        "El nombre del restaurante es requerido"
      ),
      phoneRestaurant: Yup.string()
        .matches(/^\d{10}$/, "El número de teléfono debe tener 10 dígitos")
        .required("El número de teléfono es requerido"),
      restaurantEmail: Yup.string()
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          "Correo electrónico no válido"
        )
        .required("El correo del restaurante es obligatorio"),
      description: Yup.string().required("La descripción es requerida"),
      address: Yup.string().required("La dirección es requerida"),
      zipCode: Yup.string()
        .matches(/^[0-9]{5}$/, "Debe ser un código postal válido")
        .required("El código postal es obligatorio"),
      minPrice: Yup.number()
        .min(1, "El precio minimo tiene que ser mayor a 0")
        .required("El precio minimo es requerido"),
      maxPrice: Yup.number()
        .min(1, "El precio maximo tiene que ser mayor a 0")
        .required("El precio maximo es requerido"),
      foodTypes: Yup.array().min(1, "Selecciona al menos un tipo de comida"),
      isCheck: Yup.string()
        .oneOf(
          ["Si", "No"],
          "Debe seleccionar Si o No para reservaciones de eventos"
        )
        .required("Debe seleccionar Si o No para reservaciones de eventos"),
      eventReservations: Yup.array().when("isCheck", {
        is: "Si",
        then: () =>
          Yup.array()
            .min(1, "Debe seleccionar al menos un tipo de evento")
            .required("Debe seleccionar al menos un tipo de evento"),
        otherwise: () => Yup.array().notRequired(),
      }),
      capacity: Yup.number()
        .min(1, "La capacidad tiene que ser mayor a 0")
        .required("La capacidad es requerida"),
      termsConditions: Yup.boolean().oneOf(
        [true],
        "Debes aceptar los términos y condiciones"
      ),
      logo: Yup.string().required("La imagen del logo es requerida"),
      banner: Yup.string().required("La imagen del banner es requerida"),
});