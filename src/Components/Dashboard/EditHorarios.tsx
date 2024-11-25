import React, { useState, useEffect } from "react";
import Horarios from "../Horarios";
import axios from "axios";
import Swal from "sweetalert2";

interface Restaurant {
  id: string;
  name: string;
}

interface Schedule {
  id: string;
  restaurantId: string;
  working_days: Record<string, { abre: string; cierra: string }>;
}

const EditHorarios = () => {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [schedules, setSchedules] = useState<Schedule | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [option, setOption] = useState("");
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    nameRestaurant: "",
    horarios: {},
  });

  const handleHorariosChange = (
    nuevosHorarios: Record<string, { abre: string; cierra: string }>
  ) => {
    setFormData((prevData) => ({ ...prevData, horarios: nuevosHorarios }));
  };

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

      const schedulesData = await fetchData(
        `http://localhost:3000/getsy-back/schedules/${restaurant.id}`,
        {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      );

      setSchedules(schedulesData[0]);

      // Actualizar formData con los horarios existentes
      if (schedulesData[0]?.working_days) {
        setFormData((prevData) => ({
          ...prevData,
          horarios: schedulesData[0].working_days,
        }));
      }
    } catch (error) {
      handleError(error, "Error al cargar los datos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReservations();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!restaurant?.id) return;

    setSaving(true);
    try {
      const response = await axios.put(
        `http://localhost:3000/getsy-back/update-restaurant/${restaurant.id}`,
        {
          working_days: formData.horarios,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        await Swal.fire({
          icon: "success",
          title: "¡Éxito!",
          text: "Horarios actualizados exitosamente",
          confirmButtonText: "Aceptar",
        });
        loadReservations();
      }
    } catch (error) {
      handleError(error, "Error al actualizar los horarios");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <form onSubmit={handleSubmit} className="font-Poppins md:px-6 pb-5 w-full">
      <div className="flex flex-col gap-4">
        <div className="flex">
          <div className="flex text-xl font-semibold space-x-2">
            <p>Horarios de</p>
            <p className=" underline">{restaurant?.name}</p>
          </div>
        </div>

        <Horarios
          onChange={handleHorariosChange}
          editable={true}
          initialHorarios={formData.horarios}
        />
        <div className="mt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-3 py-1 text-white hover:text-black bg-primary rounded-lg text-sm flex items-center space-x-1"
          >
            <p>{saving ? "Guardando..." : "Guardar"}</p>
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
                d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
              />
            </svg>
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditHorarios;
