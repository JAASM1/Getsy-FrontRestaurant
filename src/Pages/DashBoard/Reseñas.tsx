import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface Restaurant {
  id: string;
}

interface client {
  id: string;
  name: string;
}

interface review {
  id: string;
  restaurantId: string;
  userId: string;
  rating: number;
  description: string;
}

const Reseñas = () => {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [clients, setClients] = useState<client[]>([]);
  const [reviews, setReviews] = useState<review[]>([]);
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

  const fetchClientsData = async (review: review[]) => {
    try {
      const clientResponses = await Promise.all(
        review.map((res) =>
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

      const reviewData: review[] = await fetchData(
        `http://localhost:3000/getsy-back/reviews/restaurant/${restaurant.id}`,
        {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      );
      setReviews(reviewData);
      const clientsData = await fetchClientsData(reviewData);
      setClients(clientsData);
    } catch {}
  };

  useEffect(() => {
    loadReservations();
  }, []);
  if (error) return <p>Error: {error}</p>;
  return (
    <div className="font-Poppins px-6 w-full flex flex-col items-center pb-5">
      <div className="w-full mb-4 md:mb-12 flex items-center justify-between md:justify-normal space-x-9">
        <Link to="/dashboard" className="hover:bg-gray-100 rounded-full p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
        <h1 className="text-2xl font-bold">Reseñas</h1>
      </div>
      <div className="w-full max-md:space-y-4 md:grid grid-cols-2 items-stretch gap-3 md:px-[13rem]">
        {reviews.length === 0 ? (
          <p>No hay reseñas para mostrar</p>
        ) : (
          reviews.map((res) => {
            const clientData = clients.find((cli) => cli.id === res.userId);
            return (
              <div
                key={res.id}
                className="border border-primary rounded-lg shadow-md w-full flex flex-col p-2 space-y-1"
              >
                <p className="font-semibold">{clientData?.name}</p>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className={`size-4 ${
                        i < res.rating ? "text-primary" : "text-gray-400"
                      }`}
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
                <p className="text-xs">{res.description}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Reseñas;
