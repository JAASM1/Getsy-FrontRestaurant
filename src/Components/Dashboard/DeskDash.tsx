import { Link } from "react-router-dom";
import DailyReservationsBar from "./Graphics/DailyReservationsBar";
import ReservationTypesPie from "./Graphics/ReservationTypesPie";

const DeskDash = () => {
  return (
    <div className="max-md:hidden flex flex-col w-full pb-10 space-y-10">
      <div className="flex w-full text-sm font-medium space-x-20">
        <div className="w-1/2 space-y-1 flex flex-col items-center">
          <p className="font-semibold text-base">Estadisticas de reservas por día</p>
          <DailyReservationsBar/>
        </div>
        <div className="w-1/2 space-y-1 flex flex-col items-center">
          <p className="font-semibold text-base">Estadisticas de tipos de reservas</p>
          <ReservationTypesPie />
        </div>
      </div>
      <div className="w-full flex space-x-8">
        <div className="w-1/3 space-y-1">
          <p className="font-semibold">
            Reservas confirmadas/canceladas del día
          </p>
          <div className="flex flex-col border justify-between border-black rounded-lg bg-white px-7 py-3 w-full h-[9.5rem]">
            <div className="flex justify-between">
              <div className="flex flex-col items-center">
                <p className="font-medium">Total</p>
                <div className="text-2xl font-bold rounded-lg border border-black flex items-center justify-center w-20 h-14">
                  <p>10</p>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <p className="font-medium">Confirmadas</p>
                <div className="text-2xl font-bold rounded-lg border border-black flex items-center justify-center w-20 h-14">
                  <p>10</p>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <p className="font-medium">Canceladas</p>
                <div className="text-2xl font-bold rounded-lg border border-black flex items-center justify-center w-20 h-14">
                  <p>10</p>
                </div>
              </div>
            </div>
            <Link
              to="/"
              className="bg-gray-300 block text-center rounded-lg text-xs py-1"
            >
              Ver más
            </Link>
          </div>
        </div>
        <div className="w-2/3 space-y-1">
          <p className="font-semibold">Reseñas</p>
          <div className="border border-black rounded-lg p-3 h-[9.5rem]">
            <div className="bg-gray-100 py-2 px-3 rounded-lg space-y-1 mb-2">
              <p className="font-semibold capitalize text-sm">German perez</p>
              <div className="flex space-x-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>
              </div>
              <p className="text-xs line-clamp-2">
                Quisque pretium, leo quis tincidunt gravida, elit lacus dictum
                mi, vitae tempus ante elit sit amet lacus. Curabitur consequat
                tellus sit amet ornare lacinia.
              </p>
            </div>
            <Link to="/reseñas" className="bg-gray-300 px-7 py-1 rounded-lg text-xs">
              Ver más
            </Link>
          </div>
        </div>
      </div>
      <div className="flex w-full space-x-8">
        <div className="space-y-1">
          <p className="font-semibold">Historial de reservas</p>
          <div className="border border-black rounded-lg h-[7rem] w-[10rem]">
            <Link
              to="/"
              className="w-full h-full flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="size-16"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                />
              </svg>
            </Link>
          </div>
        </div>
        <div className="space-y-1">
          <p className="font-semibold">Horarios</p>
          <div className="border border-black rounded-lg h-[7rem] w-[10rem]">
            <Link
              to="/horarios"
              className="w-full h-full flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="size-16"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </Link>
          </div>
        </div>
        <div className="space-y-1">
          <p className="font-semibold">Perfil</p>
          <div className="border border-black rounded-lg h-[7rem] w-[10rem]">
            <Link
              to="/"
              className="w-full h-full flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="size-16"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeskDash;
