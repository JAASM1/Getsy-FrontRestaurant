import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import DailyReservationsBar from "./Graphics/DailyReservationsBar";
import ReservationTypesPie from "./Graphics/ReservationTypesPie";
import ReservationCounter from "./ReservationCounter";
import ReviewViewer from "./ReviewViewer";

import axios from "axios";
interface Restaurant {
  id: string;
  name: string;
}

const DeskDash = () => {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const handleError = (error: any, defaultMessage: string) => {
    console.error(error);
    setError(error?.message || defaultMessage);
  };

  const fetchData = async (url: string, headers?: object) => {
    try {
      const response = await axios.get(url, { headers });
      return response.data;
    } catch (error) {
      handleError(error, `Error al obtener datos de ${url}`);
      throw error;
    }
  };

  const loadReservations = async () => {
    try {
      const adminId = localStorage.getItem("adminId");
      if (!adminId) {
        setError("No se encontró ID de administrador");
        return;
      }

      const restaurantData: Restaurant[] = await fetchData(
        `http://localhost:3000/getsy-back/restaurants/admin/${adminId}`,
        {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      );
      const restaurant = restaurantData[0];
      setRestaurant(restaurant);
      console.log(restaurant);
      
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReservations();
  }, []);

  return (
    <div className="max-md:hidden flex flex-col w-full pb-10 space-y-10">
      <div className="flex w-full text-sm font-medium space-x-20">
        <div className="w-1/2 space-y-1 flex flex-col items-center">
          <p className="font-semibold text-base">
            Estadisticas de reservas por día
          </p>
          <DailyReservationsBar />
        </div>
        <div className="w-1/2 space-y-1 flex flex-col items-center">
          <p className="font-semibold text-base">
            Estadisticas de tipos de reservas
          </p>
          <ReservationTypesPie />
        </div>
      </div>
      <div className="w-full flex space-x-8">
        <ReservationCounter />
        <ReviewViewer />
      </div>
      <div className="flex w-full space-x-8">
        <div className="space-y-1">
          <p className="font-semibold">Historial de reservas</p>
          <div className="border border-black rounded-lg h-[7rem] w-[10rem]">
            <Link
              to="/dashboard/reservation-history"
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
              to="/dashboard/horarios"
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
              to={`/dashboard/perfil/${restaurant?.id}`}
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
