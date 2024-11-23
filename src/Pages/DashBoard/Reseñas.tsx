import { Link } from "react-router-dom";

const reseñas = [
  {
    id: 1,
    nombre: "Ernesto Perez",
    rating: 5,
    reseña:
      "Excelente servicio, la comida es deliciosa y el ambiente es muy agradable.",
  },
  {
    id: 2,
    nombre: "Ana Martinez",
    rating: 4,
    reseña: "",
  },
  { id: 3, nombre: "Luis Gomez", rating: 3, reseña: "" },
  {
    id: 4,
    nombre: "Javier Gomez",
    rating: 3,
    reseña: "Muy buena comida, el servicio es rápido y el lugar es muy bonito.",
  },
];

const Reseñas = () => {
  return (
    <div className="font-Poppins px-6 w-full flex flex-col items-center">
      <div className="w-full mb-4 md:mb-12 flex items-center space-x-9">
        <Link to="/dashboard" className="hover:bg-gray-100 rounded-full p-1">
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
        <h1 className="text-2xl font-bold">Reseñas</h1>
      </div>
      <div className="w-full max-md:space-y-4 md:grid grid-cols-2 items-stretch gap-3 md:px-[13rem]">
        {reseñas.map((res) => (
          <div
            key={res.id}
            className="border border-primary rounded-lg shadow-md w-full flex flex-col p-2 space-y-1"
          >
            <p className="font-semibold">{res.nombre}</p>
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={`size-4 ${
                    i < res.rating ? "text-primary" : "text-gray-400"
                  }`}
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
            </div>
            <p className="text-xs">{res.reseña}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reseñas;
