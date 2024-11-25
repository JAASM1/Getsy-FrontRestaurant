import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

interface Restaurant {
  id: string;
}

interface ReservacionProps {
  id: string;
  date: string;
  time: string;
  pax: string;
  status: string;
  userId: string;
}

const ReservationCounter = () => {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [reservations, setReservations] = useState<ReservacionProps[]>([]);
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

      const reservationsData: ReservacionProps[] = await fetchData(
        `http://localhost:3000/getsy-back/${restaurant.id}/reservations-restaurant`,
        {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      );
      setReservations(reservationsData);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReservations();
  }, []);
  console.log(reservations);
  

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>Error: {error}</p>;

  const getCurrentDate = () => {
    const today = new Date();
    today.setHours(today.getHours() - 5);
    return today.toISOString().split('T')[0];
  };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };
  const currentDate = getCurrentDate();

  const todayReservations = reservations.filter((r) => {
    const reservationDate = formatDate(r.date);
    return reservationDate === currentDate;
  });

  const totalReservations = todayReservations.length;
  const confirmedReservations = todayReservations.filter(
    (res) => res.status === "confirmed"
  ).length;
  const canceledReservations = todayReservations.filter(
    (res) => res.status === "cancelled"
  ).length;

  console.log(confirmedReservations, canceledReservations);
  

  return (
    <div className="w-1/3 space-y-1">
      <p className="font-semibold">Reservas confirmadas/canceladas del día</p>
      <div className="flex flex-col border justify-between border-black rounded-lg bg-white px-7 py-3 w-full h-[9.5rem]">
        <div className="flex justify-between">
          <div className="flex flex-col items-center">
            <p className="font-medium">Total</p>
            <div className="text-2xl font-bold rounded-lg border border-black flex items-center justify-center w-20 h-14">
              <p>{totalReservations}</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <p className="font-medium">Confirmadas</p>
            <div className="text-2xl font-bold rounded-lg border border-black flex items-center justify-center w-20 h-14">
              <p>{confirmedReservations}</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <p className="font-medium">Canceladas</p>
            <div className="text-2xl font-bold rounded-lg border border-black flex items-center justify-center w-20 h-14">
              <p>{canceledReservations}</p>
            </div>
          </div>
        </div>
        <Link
          to="/dashboard/total-daily-bookings"
          className="bg-gray-300 block text-center rounded-lg text-xs py-1"
        >
          Ver más
        </Link>
      </div>
    </div>
  );
};

export default ReservationCounter;
