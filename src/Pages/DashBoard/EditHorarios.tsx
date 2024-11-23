import { Button, Label, Input, InputDate, BtnSecon } from "../../Components/Ui";
import { Link } from "react-router-dom";
import { useState } from "react";

import Horarios from "../../Components/Horarios";

const EditHorarios = () => {
  const [formData, setFormData] = useState({
    nameRestaurant: "",
    horarios: {},
  });

  const handleHorariosChange = (
    nuevosHorarios: Record<string, { abre: string; cierra: string }>
  ) => {
    setFormData((prevData) => ({ ...prevData, horarios: nuevosHorarios }));
  };
  return (
    <div className="font-Poppins px-6 pb-5 w-full flex flex-col items-center">
      <div className="w-full mb-4 md:mb-12 flex items-center md:space-x-9">
        <Link
          to="/dashboard"
          className="hover:bg-gray-100 rounded-full p-1 max-md:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
              clipRule="evenodd"
            />
          </svg>
        </Link>

        <h1 className="text-xl md:text-2xl font-bold">
          Horarios y días especiales
        </h1>
      </div>
      <div className="flex max-md:flex-col max-md:space-y-10 w-full md:justify-center md:px-[13rem]">
        <div className="w-1/2">
          <Horarios onChange={handleHorariosChange} editable={true} />
        </div>
        <div className="flex flex-col space-y-2 w-1/2">
          <p className="text-xl font-semibold">Festivos/Especiales</p>
          <button className="bg-[#FCE079] text-sm font-semibold w-full rounded-lg py-2">
            Agregar horario
          </button>
          <div>
            <div className="border border-primary p-2 flex justify-between items-center rounded-xl shadow-lg">
              <div className="space-y-1">
                <p>
                  Fecha: <span className="font-bold">22/11/2024</span>
                </p>
                <p>
                  Horario: <span className="font-bold">10:00 a 17:00</span>
                </p>
              </div>
              <div className="flex flex-col w-1/3 space-y-2">
                <button className="bg-primary rounded-lg">Editar</button>
                <button className="border border-black rounded-lg">
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditHorarios;
