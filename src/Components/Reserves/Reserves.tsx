import { useState, useEffect } from "react";
import { FechaFormateada, HoraFormateada } from "../Ui";
import axios from "axios";

interface Restaurant {
  id: string;
  name: string;
}

interface ReservacionProps {
  id: string;
  date: string;
  time: string;
  pax: string;
  status: string;
  userId: string;
}

interface client {
  id: string;
  name: string;
  email: string;
  phone: string;
}

const Reserves = () => {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [reservations, setReservations] = useState<ReservacionProps[]>([]);
  const [client, setClient] = useState<client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      const adminId = localStorage.getItem("adminId");

      if (!adminId) {
        setError("No se encontró ID de administrador");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:3000/getsy-back/restaurants/admin/${adminId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setRestaurant(response.data[0]);
      } catch (error) {
        console.error(error);
        setError("Hubo un error al cargar el restaurante");
      }
    };
    fetchRestaurant();
  }, []);

  useEffect(() => {
    const fetchReservations = async () => {
      if (!restaurant) return;
      try {
        const response = await axios.get(
          `http://localhost:3000/getsy-back/${restaurant?.id}/reservations-restaurant`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const pendingReservations = response.data.filter(
          (reservation: ReservacionProps) => reservation.status === "confirmed"
        );
        setReservations(pendingReservations);
      } catch (error) {
        console.error(error);
        setError("Hubo un error al cargar las reservaciones");
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, [restaurant]);

  useEffect(() => {
    const fetchClients = async () => {
      if (reservations.length === 0) return;

      try {
        const clientResponses = await Promise.all(
          reservations.map((res) =>
            axios.get(
              `http://localhost:3000/getsy-back/get-user/${res.userId}`,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
          )
        );
        const clientsData = clientResponses.map((res) => res.data.user);
        setClient(clientsData);
        console.log(clientsData);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Error al obtener los datos de los clientes");
      }
    };

    fetchClients();
  }, [reservations]);

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="space-y-3">
      {reservations.map((res) => {
        const clientData = client.find((cli) => cli.id === res.userId);
        console.log(clientData);

        return (
          <div
            key={res.id}
            className="border border-primary p-2 rounded-lg shadow-md flex justify-between items-center bg-white"
          >
            {" "}
            <div className="text-sm text-gray-600">
              <p className="text-base font-semibold text-black">
                {clientData?.name}
              </p>
              <div className="flex space-x-2">
                <div className="flex space-x-1">
                  <p>Día:</p>
                  <div>
                    <FechaFormateada fecha={res.date} />
                  </div>
                </div>
                <div className="flex space-x-1">
                  <p>Hora:</p>
                  <div>
                    <HoraFormateada hora={res.time} />
                  </div>
                </div>
              </div>
              <p>Personas: {res.pax}</p>
            </div>
            <button className="text-sm bg-primary mt-2 rounded px-3 py-1 font-semibold">
              Ver más
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Reserves;
