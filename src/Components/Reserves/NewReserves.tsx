import { useState, useEffect } from "react";
import { FechaFormateada, HoraFormateada } from "../Ui";
import axios from "axios";
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

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface NewReservesProps {
  onReservationUpdate: () => void;
  searchName: string;
}

const NewReserves: React.FC<NewReservesProps> = ({
  onReservationUpdate,
  searchName,
}) => {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [reservations, setReservations] = useState<ReservacionProps[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [option, setOption] = useState("");

  // Reutilizable: Manejo de errores
  const handleError = (error: any, defaultMessage: string) => {
    console.error(error);
    setError(error?.message || defaultMessage);
  };

  // Reutilizable: Fetch general para obtener datos
  const fetchData = async (url: string, headers?: object) => {
    try {
      const response = await axios.get(url, { headers });
      return response.data;
    } catch (error) {
      handleError(error, `Error al obtener datos de ${url}`);
      throw error;
    }
  };

  // Reutilizable: Cargar clientes
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

  useEffect(() => {
    const loadAllData = async () => {
      try {
        const adminId = localStorage.getItem("adminId");
        if (!adminId) {
          setError("No se encontró ID de administrador");
          setLoading(false);
          return;
        }

        // Cargar datos del restaurante
        const restaurantData: Restaurant[] = await fetchData(
          `http://localhost:3000/getsy-back/restaurants/admin/${adminId}`,
          {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        );
        const restaurant = restaurantData[0];
        setRestaurant(restaurant);

        // Cargar reservaciones
        const reservationsData: ReservacionProps[] = await fetchData(
          `http://localhost:3000/getsy-back/${restaurant.id}/reservations-restaurant`,
          {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        );
        const pendingReservations = reservationsData.filter(
          (reservation) => reservation.status === "pending"
        );
        setReservations(pendingReservations);

        // Cargar clientes en base a reservaciones pendientes
        const clientsData = await fetchClientsData(pendingReservations);
        setClients(clientsData);
      } catch {
        // Los errores ya están manejados en las funciones reutilizables
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, []);

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="space-y-3 max-md:pb-5 bg-[#fff4c6] p-4 rounded-md">
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
                      setOption("NewReservation");
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
          onReservationUpdate={onReservationUpdate}
        />
      )}
    </>
  );
};

export default NewReserves;
