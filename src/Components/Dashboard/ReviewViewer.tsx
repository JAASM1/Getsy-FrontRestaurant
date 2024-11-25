import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

interface Restaurant {
  id: string;
}

interface Client {
  id: string;
  name: string;
}

interface Review {
  id: string;
  restaurantId: string;
  userId: string;
  rating: number;
  description: string;
  createdAt: string; // Asumiendo que las reseñas tienen una fecha de creación
}

const ReviewViewer = () => {
  const [latestReview, setLatestReview] = useState<Review | null>(null);
  const [client, setClient] = useState<Client | null>(null);
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

  const getTimeDifference = (reviewDate: string) => {
    const now = new Date();
    const review = new Date(reviewDate);
    return Math.abs(now.getTime() - review.getTime());
  };

  const loadLatestReview = async () => {
    try {
      const adminId = localStorage.getItem("adminId");
      if (!adminId) {
        setError("No se encontró ID de administrador");
        return;
      }

      // Obtener el restaurante
      const restaurantData: Restaurant[] = await fetchData(
        `http://localhost:3000/getsy-back/restaurants/admin/${adminId}`,
        {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      );
      const restaurant = restaurantData[0];

      // Obtener todas las reseñas
      const reviews: Review[] = await fetchData(
        `http://localhost:3000/getsy-back/reviews/restaurant/${restaurant.id}`,
        {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      );

      // Obtener la reseña más reciente comparando con la fecha actual
      const latest = reviews.reduce((closest, current) => {
        const closestDiff = getTimeDifference(closest.createdAt);
        const currentDiff = getTimeDifference(current.createdAt);
        return currentDiff < closestDiff ? current : closest;
      }, reviews[0]);

      if (latest) {
        setLatestReview(latest);
        // Obtener datos del cliente
        const clientData = await fetchData(
          `http://localhost:3000/getsy-back/get-user/${latest.userId}`,
          {
            "Content-Type": "application/json",
          }
        );
        setClient(clientData.user);
      }
    } catch (error) {
      handleError(error, "Error al cargar la última reseña");
    }
  };

  const getRelativeTime = (date: string) => {
    const now = new Date();
    const reviewDate = new Date(date);
    const diffInSeconds = Math.floor(
      (now.getTime() - reviewDate.getTime()) / 1000
    );

    if (diffInSeconds < 60) return "hace unos segundos";

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `hace ${diffInMinutes} minutos`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `hace ${diffInHours} horas`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `hace ${diffInDays} días`;

    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) return `hace ${diffInWeeks} semanas`;

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) return `hace ${diffInMonths} meses`;

    const diffInYears = Math.floor(diffInDays / 365);
    return `hace ${diffInYears} años`;
  };

  useEffect(() => {
    loadLatestReview();

    const interval = setInterval(() => {
      if (latestReview) {
        loadLatestReview();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  if (error) return null;
  if (!latestReview || !client) return null;
  return (
    <div className="w-2/3 space-y-1">
      <p className="font-semibold">Reseñas</p>
      <div className="border border-black rounded-lg p-3 h-[9.5rem] flex flex-col items-start justify-between">
        <div className="bg-gray-100 py-2 px-3 rounded-lg space-y-1 mb-2 w-full">
          <div className="flex justify-between items-center">
            <p className="font-semibold capitalize text-sm">{client.name}</p>
            <span className="text-xs text-gray-500">
              {getRelativeTime(latestReview.createdAt)}
            </span>
          </div>
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                fill={i < latestReview.rating ? "currentColor" : "none"}
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
            ))}
          </div>
          <p className="text-xs line-clamp-2">{latestReview.description}</p>
        </div>
        <Link
          to="/dashboard/reseñas"
          className="bg-gray-300 px-7 py-1 rounded-lg text-xs"
        >
          Ver más
        </Link>
      </div>
    </div>
  );
};

export default ReviewViewer;
