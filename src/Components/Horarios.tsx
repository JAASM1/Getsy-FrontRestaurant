import { useState, useEffect } from "react";
import { InputDate } from "./Ui";

type DiaSemana =
  | "lunes"
  | "martes"
  | "miercoles"
  | "jueves"
  | "viernes"
  | "sabado"
  | "domingo";

interface HorariosProps {
  onChange: (
    horarios: Record<DiaSemana, { abre: string; cierra: string }>
  ) => void;
  editable?: boolean;
  initialHorarios?: Record<DiaSemana, { abre: string; cierra: string }>;
}

// Array ordenado de días
const DIAS_ORDENADOS: DiaSemana[] = [
  "lunes",
  "martes",
  "miercoles",
  "jueves",
  "viernes",
  "sabado",
  "domingo",
];

const Horarios = ({
  onChange,
  editable = false,
  initialHorarios,
}: HorariosProps) => {
  const [editando, setEditando] = useState<Record<DiaSemana, boolean>>({
    lunes: false,
    martes: false,
    miercoles: false,
    jueves: false,
    viernes: false,
    sabado: false,
    domingo: false,
  });

  const [horarios, setHorarios] = useState<
    Record<DiaSemana, { abre: string; cierra: string }>
  >({
    lunes: { abre: "", cierra: "" },
    martes: { abre: "", cierra: "" },
    miercoles: { abre: "", cierra: "" },
    jueves: { abre: "", cierra: "" },
    viernes: { abre: "", cierra: "" },
    sabado: { abre: "", cierra: "" },
    domingo: { abre: "", cierra: "" },
  });

  useEffect(() => {
    if (initialHorarios) {
      setHorarios(initialHorarios);
    }
  }, [initialHorarios]);

  const handleHorarioChange = (
    dia: DiaSemana,
    tipo: "abre" | "cierra",
    valor: string
  ) => {
    const nuevosHorarios = {
      ...horarios,
      [dia]: { ...horarios[dia], [tipo]: valor },
    };
    setHorarios(nuevosHorarios);
    onChange(nuevosHorarios);
  };

  const toggleEditar = (dia: DiaSemana) => {
    setEditando((prevEditando) => ({
      ...prevEditando,
      [dia]: !prevEditando[dia],
    }));
  };

  const handleReset = (dia: DiaSemana) => {
    const nuevosHorarios = {
      ...horarios,
      [dia]: { abre: "", cierra: "" },
    };
    setHorarios(nuevosHorarios);
    onChange(nuevosHorarios);
  };

  return (
    <div className="flex flex-col w-full">
      <div>
        <p className="font-semibold">Horarios</p>
        <p className="text-[#888] text-xs mb-1">
          Deja en blanco los dias que no abras
        </p>
      </div>
      <div>
        <div
          className={`grid ${
            !editable ? "grid-cols-3" : "grid-cols-4"
          } gap-4 items-center`}
        >
          <div className="font-medium text-gray-600">Día</div>
          <div className="font-medium text-gray-600">Abre</div>
          <div className="font-medium text-gray-600">Cierra</div>
          {editable && (
            <div className="font-medium text-gray-600">Acciones</div>
          )}
        </div>

        {/* Usamos el array ordenado para mapear los días */}
        {DIAS_ORDENADOS.map((dia) => (
          <div
            key={dia}
            className={`grid ${
              !editable ? "grid-cols-3" : "grid-cols-4"
            } gap-4 items-center mt-2 max-md:gap-x-2`}
          >
            <p className="text-gray-800 capitalize">{dia}</p>
            <InputDate
              value={horarios[dia].abre}
              onChange={(e) => handleHorarioChange(dia, "abre", e.target.value)}
              className={`${
                editable && editando[dia] ? "border-primary border-2" : ""
              }`}
            />
            <InputDate
              value={horarios[dia].cierra}
              onChange={(e) =>
                handleHorarioChange(dia, "cierra", e.target.value)
              }
              className={`${
                editable && editando[dia] ? "border-primary border-2" : ""
              }`}
            />
            {editable && (
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => handleReset(dia)}
                  className="hover:text-red-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5 hover:text"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Horarios;
