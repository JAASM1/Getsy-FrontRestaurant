import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { FechaFormateada, HoraFormateada } from "../../Components/Ui";

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
const ReservationHistory = () => {
  const [searchName, setSearchName] = useState("");
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [reservations, setReservations] = useState<ReservacionProps[]>([]);
  const [clients, setClients] = useState<client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [option, setOption] = useState("");

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

  const fetchClientsData = async (reservations: ReservacionProps[]) => {
    try {
      const clientResponses = await Promise.all(
        reservations.map((res) =>
          fetchData(`http://localhost:3000/getsy-back/get-user/${res.userId}`, {
            "Content-Type": "application/json",
          })
        )
      );
      return clientResponses.map((res) => res.user);
    } catch (error) {
      handleError(error, "Error al cargar datos de clientes");
      return [];
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
      const clientsData = await fetchClientsData(reservationsData);
      setClients(clientsData);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReservations();
  }, []);

  const filterReservationsByName = (
    reservations: ReservacionProps[],
    clients: client[],
    searchName: string
  ) => {
    if (!searchName) return reservations;

    return reservations.filter((res) => {
      const clientData = clients.find((cli) => cli.id === res.userId);
      return clientData?.name.toLowerCase().includes(searchName.toLowerCase());
    });
  };
  return (
    <div className="flex flex-col justify-center items-center px-6 md:px-[3rem] w-full font-Poppins">
      <div className="flex justify-between md:justify-normal w-full items-center mb-3 md:space-x-8">
        <Link to="/dashboard" className="hover:bg-slate-200 rounded-full p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </Link>
        <h1 className="text-2xl font-bold">Historial de reservas</h1>
      </div>
      <div className="w-full md:flex items-center md:px-[4.5rem] mb-5">
        <div className="w-full md:flex justify-end items-end max-md:space-y-1">
          <div className="border border-black bg-white flex items-center w-full px-1 rounded-md md:w-2/5">
            <input
              type="text"
              className="w-full p-1 outline-none text-base"
              placeholder="Buscar por el nombre del cliente"
              onChange={(e) => setSearchName(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="w-full md:px-[4.5rem]">
        <div className="space-y-3 max-md:pb-5">
          {(() => {
            if (reservations.length === 0) {
              return (
                <p className="text-gray-500 text-xl font-semibold">
                  No hay reservas para el día de hoy
                </p>
              );
            }
            const filteredReservations = filterReservationsByName(
              reservations,
              clients,
              searchName
            );
            if (filteredReservations.length === 0) {
              return (
                <p className="text-gray-500 text-xl font-semibold">
                  No se encontraron reservas que coincidan con la búsqueda
                </p>
              );
            }
            const sortedReservations = filteredReservations.sort((a, b) =>
              a.time.localeCompare(b.time)
            );

            return sortedReservations.map((res) => {
              const clientData = clients.find((cli) => cli.id === res.userId);
              return (
                <div
                  key={res.id}
                  className="border border-primary p-2 rounded-lg shadow-md flex space-x-3 justify-between items-center bg-white"
                >
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
                    <div className="flex space-x-2">
                      <p>Personas: {res.pax}</p>
                      <p>
                        Estado:{" "}
                        <span
                          className={`font-medium ${
                            res.status === "confirmed"
                              ? "text-green-600"
                              : res.status === "cancelled"
                              ? "text-red-600"
                              : "text-yellow-600"
                          }`}
                        >
                          {res.status === "confirmed"
                            ? "Confirmada"
                            : res.status === "cancelled"
                            ? "Cancelada"
                            : "Pendiente"}
                        </span>
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setShowModal(true);
                      setSelectedUserId(res.userId);
                      setOption("reservation");
                    }}
                    className="text-sm bg-primary mt-2 rounded px-3 py-1 font-semibold"
                  >
                    Ver más
                  </button>
                </div>
              );
            });
          })()}
        </div>
      </div>
    </div>
  );
};

export default ReservationHistory;
