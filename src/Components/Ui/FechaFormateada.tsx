interface Props extends React.HTMLAttributes<HTMLParagraphElement> {
    fecha?: string | Date; // Se espera una fecha como string o Date
  }
  
  export default function FechaFormateada({ fecha }: Props) {
    // Si no se pasa una fecha, usar la fecha actual
    const fechaRecibida = fecha ? new Date(fecha) : new Date();
  
    // Formatear la fecha
    const fechaFormateada = fechaRecibida.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  
    return <p>{fechaFormateada}</p>;
  }
  