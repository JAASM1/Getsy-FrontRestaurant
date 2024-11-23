interface Props extends React.HTMLAttributes<HTMLParagraphElement> {
  hora?: string; // Se espera una hora como string en formato "HH:mm:ss"
}

export default function HoraFormateada({ hora }: Props) {
  let horaFormateada = "Invalid Date";

  if (hora) {
    // Obtener la fecha actual
    const fechaActual = new Date();
    // Dividir la hora en horas y minutos
    const [horas, minutos] = hora.split(":").map(Number);

    // Crear un objeto Date con la hora proporcionada
    const fechaConHora = new Date(
      fechaActual.getFullYear(),
      fechaActual.getMonth(),
      fechaActual.getDate(),
      horas,
      minutos
    );

    // Formatear la hora sin segundos
    horaFormateada = fechaConHora.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // Formato de 12 horas
    });
  }

  return <p>{horaFormateada}</p>;
}
