import React from "react";

const Holydays = () => {
  return (
    <div className="flex flex-col space-y-2 w-full">
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
            <button className="border border-black rounded-lg">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Holydays;
