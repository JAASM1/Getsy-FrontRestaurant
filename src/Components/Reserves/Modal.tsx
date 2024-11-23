import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import { FechaFormateada, HoraFormateada, Label } from "../Ui";

interface ModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string | null;
}

interface reserve {
  id: number;
  userId: number;
  eventId: number;
  date: string;
  time: string;
  pax: number;
  status: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}
interface client {
  name: string;
}
interface event {
  name: string;
}

const Modal: React.FC<ModalProps> = ({ userId, setShowModal }) => {
  const [reservationData, setReservationData] = useState<reserve[]>([]);
  const [client, setClient] = useState<client | null>(null);
  const [event, setEvent] = useState<event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

  const fetchReservas = (userId: string) =>
    axios.get(`http://localhost:3000/getsy-back/${userId}/reservations`, {
      headers: { "Content-Type": "application/json" },
    });

  const fetchCliente = (userId: string) =>
    axios.get(`http://localhost:3000/getsy-back/get-user/${userId}`, {
      headers: { "Content-Type": "application/json" },
    });

  const fetchEvento = (eventId: string) =>
    axios.get(`http://localhost:3000/getsy-back/event/${eventId}`, {
      headers: { "Content-Type": "application/json" },
    });

  const updateReservationStatus = async (
    reservationId: number,
    newStatus: string
  ) => {
    try {
      setUpdating(true);
      if (!userId) {
        throw new Error("Usuario no identificado");
      }
      const response = await axios.patch(
        `http://localhost:3000/getsy-back/reservations/${reservationId}/update-status`,
        { status: newStatus , userId: userId },
        { headers: { "Content-Type": "application/json" } }
      );

      setReservationData(prevData =>
        prevData.map(reserve =>
          reserve.id === reservationId
            ? { ...response.data }
            : reserve
        )
      );
      await Swal.fire({
        icon: "success",
        title:
          newStatus === "confirmed" ? "Reserva aceptada" : "Reserva cancelada",
        text:
          newStatus === "confirmed"
            ? "La reserva ha sido aceptada exitosamente"
            : "La reserva ha sido cancelada exitosamente",
        confirmButtonColor: "#3085d6",
      });
      setShowModal(false);
    } catch (error: any) {
      let errorMessage = "Error al actualizar el estado de la reserva";
      if (error.response) {
        errorMessage = error.response.data.error || errorMessage;
      } else if (error.message) {
        errorMessage = error.message;
      }
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
        confirmButtonColor: '#3085d6',
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleAccept = async (reservationId: number) => {
    const result = await Swal.fire({
      title: "¿Aceptar esta reserva?",
      text: "¿Estás seguro de que deseas aceptar esta reserva?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, aceptar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      await updateReservationStatus(reservationId, "confirmed");
    }
  };

  const handleCancel = async (reservationId: number) => {
    const result = await Swal.fire({
      title: "¿Cancelar esta reserva?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, cancelar reserva",
      cancelButtonText: "No, mantener reserva",
    });

    if (result.isConfirmed) {
      await updateReservationStatus(reservationId, "cancelled");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;

      try {
        setLoading(true);
        const [reservasResponse, clienteResponse] = await Promise.all([
          fetchReservas(userId),
          fetchCliente(userId),
        ]);

        const reservas = reservasResponse.data;
        setReservationData(reservas);
        setClient(clienteResponse.data.user);

        if (reservas.length && reservas[0]?.eventId) {
          const eventoResponse = await fetchEvento(reservas[0].eventId);
          setEvent(eventoResponse.data);
        }
      } catch (error: any) {
        console.error(error);
        setError(error.message || "Error al obtener los datos");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div className="fixed inset-0 max-md:px-2 bg-black bg-opacity-50 flex items-center justify-center z-50 font-Poppins">
      <div className="flex flex-col items-center bg-white p-5 rounded-lg shadow-xl md:w-1/4">
        {loading ? (
          <p>Cargando datos...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : reservationData.length > 0 ? (
          <div className="flex flex-col space-y-2 w-full">
            {reservationData.map((reserve) => (
              <div key={reserve.id} className="w-full space-y-10">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-lg">{client?.name}</h2>
                    <button
                      onClick={() => setShowModal(false)}
                      className="hover:text-red-600"
                    >
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
                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="flex space-x-2 text-sm text-gray-600 w-full justify-between">
                    <div className="flex space-x-1">
                      <p>Día:</p>
                      <span className="text-black">
                        <FechaFormateada fecha={reserve.date} />
                      </span>
                    </div>
                    <div className="flex space-x-1">
                      <p>Hora:</p>
                      <span className="text-black">
                        <HoraFormateada hora={reserve.time} />
                      </span>
                    </div>
                    <div className="flex space-x-1">
                      <p>Personas:</p>
                      <span className="text-black">{reserve.pax}</span>
                    </div>
                  </div>
                  <div className="flex space-x-1 text-gray-600 text-sm">
                    <Label>Tipo de reservación:</Label>
                    <p className="text-black">{event?.name}</p>
                  </div>
                  <div className="flex space-x-1 text-gray-600 text-sm">
                    <Label>Estado:</Label>
                    <span className="text-black">{reserve.status}</span>
                  </div>
                  <div className="text-sm">
                    <Label>Detalles adicionales</Label>
                    <div className="border border-primary rounded-lg p-1 ">
                      <p className="">{reserve.notes}</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between w-full">
                  <button
                    onClick={() => handleAccept(reserve.id)}
                    className="px-3 py-1 bg-primary rounded"
                  >
                    Aceptar
                  </button>
                  <button
                    onClick={() => handleCancel(reserve.id)}
                    className="px-3 py-1 bg-gray-400 rounded hover:bg-red-600"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No se encontraron reservas</p>
        )}
      </div>
    </div>
  );
};

export default Modal;
