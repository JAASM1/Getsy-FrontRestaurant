import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

// Mapeo de días de la semana para traducir fechas
const dayMap: { [key: number]: string } = {
  0: 'Domingo',
  1: 'Lunes', 
  2: 'Martes',
  3: 'Miércoles', 
  4: 'Jueves', 
  5: 'Viernes', 
  6: 'Sábado'
};

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

const DailyReservationsBar = () => {
  const [reservations, setReservations] = useState<ReservacionProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Función para manejar errores
  const handleError = (error: any, defaultMessage: string) => {
    console.error(error);
    setError(error?.message || defaultMessage);
    setLoading(false);
  };

  // Función genérica para fetch de datos
  const fetchData = async (url: string, headers?: object) => {
    try {
      const response = await axios.get(url, { headers });
      return response.data;
    } catch (error) {
      handleError(error, `Error al obtener datos de ${url}`);
      throw error;
    }
  };

  // Cargar reservaciones
  const loadReservations = async () => {
    try {
      const adminId = localStorage.getItem("adminId");
      if (!adminId) {
        setError("No se encontró ID de administrador");
        setLoading(false);
        return;
      }

      // Obtener restaurantes del admin
      const restaurantData: Restaurant[] = await fetchData(
        `http://localhost:3000/getsy-back/restaurants/admin/${adminId}`,
        {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      );

      // Obtener reservaciones del primer restaurante
      const restaurant = restaurantData[0];
      const reservationsData: ReservacionProps[] = await fetchData(
        `http://localhost:3000/getsy-back/${restaurant.id}/reservations-restaurant`,
        {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      );

      setReservations(reservationsData);
    } catch (error) {
      handleError(error, "Error al cargar reservaciones");
    } finally {
      setLoading(false);
    }
  };

  // Procesar reservas por día
  const weeklyReservationsData = useMemo(() => {
    // Inicializar un objeto para contar reservas por día
    const reservationsByDay: { [key: string]: { aceptadas: number; canceladas: number } } = {
      'Lunes': { aceptadas: 0, canceladas: 0 },
      'Martes': { aceptadas: 0, canceladas: 0 },
      'Miércoles': { aceptadas: 0, canceladas: 0 },
      'Jueves': { aceptadas: 0, canceladas: 0 },
      'Viernes': { aceptadas: 0, canceladas: 0 },
      'Sábado': { aceptadas: 0, canceladas: 0 },
      'Domingo': { aceptadas: 0, canceladas: 0 }
    };

    // Procesar cada reserva
    reservations.forEach(reservation => {
      // Convertir la fecha de la reserva a un objeto Date
      const reservationDate = new Date(reservation.date);
      const dayName = dayMap[reservationDate.getDay()];

      // Incrementar el conteo según el estado de la reserva
      if (reservation.status === 'completed') {
        reservationsByDay[dayName].aceptadas++;
      } else if (reservation.status === 'cancelled') {
        reservationsByDay[dayName].canceladas++;
      }
    });

    // Convertir el objeto a un array para recharts
    return Object.entries(reservationsByDay).map(([day, data]) => ({
      day,
      aceptadas: data.aceptadas,
      canceladas: data.canceladas
    }));
  }, [reservations]);

  // Cargar reservaciones al montar el componente
  useEffect(() => {
    loadReservations();
  }, []);

  // Mostrar estado de carga
  if (loading) {
    return <div>Cargando reservaciones...</div>;
  }

  // Mostrar error si existe
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={weeklyReservationsData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="aceptadas" name="Reservas Completadas" fill="#FFC01D" />
        <Bar dataKey="canceladas" name="Reservas Canceladas" fill="#FF8042" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DailyReservationsBar;