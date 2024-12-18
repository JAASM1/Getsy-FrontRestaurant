import React, { useState, useEffect } from "react";
import axios from "axios";
import { FechaFormateada, HoraFormateada } from "../Ui";
import Modal from "./Modal";

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

const Reserves: React.FC<{ searchName: string }> = ({ searchName }) => {
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
      const confirmedReservations = reservationsData.filter(
        (reservation) => reservation.status === "confirmed"
      );
      setReservations(confirmedReservations);

      const clientsData = await fetchClientsData(confirmedReservations);
      setClients(clientsData);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReservations();
  }, []);

  const handleReservationUpdate = () => {
    loadReservations();
  };

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="space-y-3 max-md:pb-5">
        {reservations.length === 0 ? (
          <p className="text-gray-500 text-xl font-semibold">
            No hay reservas por completar
          </p>
        ) : (
          // Filtrar las reservas por el nombre de búsqueda
          (() => {
            const filteredReservations = reservations.filter((res) => {
              const clientData = clients.find((cli) => cli.id === res.userId);
              return clientData?.name
                .toLowerCase()
                .includes(searchName.toLowerCase());
            });

            if (filteredReservations.length === 0) {
              return (
                <p className="text-gray-500 text-xl font-semibold">
                  Cliente no encontrado
                </p>
              );
            }

            return filteredReservations.map((res) => {
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
                    <p>Personas: {res.pax}</p>
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
          })()
        )}
      </div>
      {showModal && (
        <Modal
          userId={selectedUserId}
          setShowModal={setShowModal}
          option={option}
          onReservationUpdate={handleReservationUpdate}
        />
      )}
    </>
  );
};

export default Reserves;
