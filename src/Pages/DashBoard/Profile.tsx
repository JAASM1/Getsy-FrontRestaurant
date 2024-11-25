import { Button, Label, Input, ErrorMessage } from "../../Components/Ui";
import { UpdatedValidationSchema } from "../../Validation/UpdatedValidationSchema";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";

const foodCategories: string[] = [
  "Entradas",
  "Sopas y Caldos",
  "Ensaladas",
  "Carnes",
  "Aves",
  "Mariscos",
  "Pasta",
  "Pizza",
  "Comida Rápida",
  "Comida Vegana",
  "Comida Vegetariana",
  "Postres",
  "Bebidas Calientes",
  "Bebidas Frías",
  "Cócteles",
  "Especialidades de la Casa",
  "Comida Internacional",
  "Comida Mexicana",
  "Comida Italiana",
  "Comida China",
  "Comida Japonesa",
  "Comida Mediterránea",
  "Comida India",
  "Buffet",
  "Parrilladas",
  "Desayunos",
  "Snacks",
];
const Profile = () => {
  const { id } = useParams(); // Para obtener el ID del restaurante si es una edición
  const [events, setEvents] = useState<string[]>([]);
  const [fielErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const [isCheck, setIsCheck] = useState("");

  const [restaurantData, setRestaurantData] = useState({
    nameRestaurant: "",
    phoneRestaurant: "",
    restaurantEmail: "",
    address: "",
    zipCode: "",
    description: "",
    minPrice: 0,
    maxPrice: 0,
    foodTypes: [] as string[],
    eventReservations: [] as string[],
    capacity: 0,
    logo: "",
    banner: "",
  });

  const handleRestaurantChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setRestaurantData((prevData) => ({ ...prevData, [name]: value }));
  };

  const fetchRestaurantData = async () => {
    try {
      const restaurantResponse = await axios.get(
        `http://localhost:3000/getsy-back/get-restaurant/${id}`
      );
      const restaurant = restaurantResponse.data;

      setRestaurantData({
        nameRestaurant: restaurant.name,
        phoneRestaurant: restaurant.phoneNumber.toString(),
        restaurantEmail: restaurant.email,
        address: restaurant.address,
        zipCode: restaurant.zipCode,
        description: restaurant.description,
        minPrice: restaurant.minPrice,
        maxPrice: restaurant.maxPrice,
        foodTypes: restaurant.category || [],
        eventReservations: restaurant.events
          ? restaurant.events.map(String)
          : [],
        capacity: restaurant.capacity,
        logo: restaurant.logo,
        banner: restaurant.banner,
      });

      setIsCheck(
        restaurant.events && restaurant.events.length > 0 ? "Si" : "No"
      );
    } catch (error) {
      console.error("Error al cargar los datos del restaurante", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudieron cargar los datos del restaurante",
      });
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/getsy-back/event"
        );
        setEvents(response.data);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    fetchEvents();

    if (id) {
      fetchRestaurantData();
    }
  }, [id]);

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "logo" | "banner"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "Jesus1");

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/dweohxys9/image/upload`,
          formData
        );

        setRestaurantData((prevData) => ({
          ...prevData,
          [field]: response.data.secure_url,
        }));
      } catch (error) {
        console.error("Image upload error", error);
      }
    }
  };

  const handleTypeFoodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFood = e.target.value;
    setRestaurantData((prev) => {
      const updatedFoodTypes = prev.foodTypes.includes(selectedFood)
        ? prev.foodTypes
        : [...prev.foodTypes, selectedFood].filter(Boolean);

      return { ...prev, foodTypes: updatedFoodTypes };
    });
  };

  const handleCheckbox = (value: any) => {
    setIsCheck(value === isCheck ? "" : value);
    if (value === "No") {
      setRestaurantData((prev) => ({ ...prev, eventReservations: [] }));
    }
  };

  const handleEventReservationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const eventType = e.target.value;

    setRestaurantData((prev) => {
      if (isCheck === "Si") {
        const updatedEvents = e.target.checked
          ? [...(prev.eventReservations || []), eventType]
          : (prev.eventReservations || []).filter(
              (event) => event !== eventType
            );

        return { ...prev, eventReservations: updatedEvents };
      }
      return { ...prev, eventReservations: [] };
    });
  };

  const validateForm = () => {
    // Función para verificar si todos los campos de un objeto están vacíos
    const isObjectEmpty = (obj: Record<string, any>) => {
      return Object.values(obj).every((value) => {
        // Si es un string, verifica que no esté vacío
        if (typeof value === "string") return value.trim() === "";
        // Si es un objeto (ej. horarios), verifica que tenga claves
        if (typeof value === "object" && value !== null) {
          return Object.keys(value).length === 0;
        }
        return false;
      });
    };
    return true;
  };

  const prepareRestaurantData = () => {
    return {
      name: restaurantData.nameRestaurant,
      phoneNumber: Number(restaurantData.phoneRestaurant),
      email: restaurantData.restaurantEmail,
      description: restaurantData.description,
      address: restaurantData.address,
      minPrice: Number(restaurantData.minPrice),
      maxPrice: Number(restaurantData.maxPrice),
      zipCode: restaurantData.zipCode,
      capacity: Number(restaurantData.capacity),
      category: restaurantData.foodTypes,
      logo: restaurantData.logo,
      banner: restaurantData.banner,
    };
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/getsy-back/event"
        );
        setEvents(response.data);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    fetchEvents();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!validateForm()) return; // Verifica si el formulario es válido.
  
    try {
      // Validar con Yup.
      const combinedData = {
        ...restaurantData,
        isCheck,
      };
  
      await UpdatedValidationSchema.validate(combinedData, {
        abortEarly: false,
      });
  
      setFieldErrors({}); // Limpia errores si la validación pasa.
  
      // Prepara datos para enviar al backend.
      const restaurant = {
        ...prepareRestaurantData(),
        eventIds: restaurantData.eventReservations.map(Number),
      };
  
      const response = await axios.put(
        `http://localhost:3000/getsy-back/update-restaurant/${id}`,
        restaurant,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
  
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Actualización Exitosa",
          text: "Los datos se actualizaron correctamente.",
        });
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        // Maneja errores de Yup.
        const errors: { [key: string]: string } = {};
        error.inner.forEach((err) => {
          if (err.path) errors[err.path] = err.message;
        });
        setFieldErrors(errors);
      } else if (axios.isAxiosError(error)) {
        // Maneja errores de Axios.
        console.error("Error en la actualización o creación:", error.message);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al guardar los datos. Por favor, inténtelo de nuevo.",
        });
      } else {
        // Maneja errores desconocidos.
        console.error("Error desconocido:", error);
        Swal.fire({
          icon: "error",
          title: "Error inesperado",
          text: "Ha ocurrido un error inesperado. Intente nuevamente.",
        });
      }
    }
  };
  
  return (
    <div className="font-Poppins px-6 w-full flex flex-col items-center pb-5">
      <div className="w-full mb-4 md:mb-12 flex items-center justify-between md:justify-normal space-x-9">
        <Link to="/dashboard" className="hover:bg-slate-200 rounded-full p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
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
        <h2 className="text-2xl font-bold">Perfil y datos</h2>
      </div>
      <h2 className="text-xl w-full mb-3">
        A continuación llena todos los campos
      </h2>
      <form
        noValidate
        onSubmit={handleSubmit}
        className="w-full flex max-md:flex-col justify-center max-md:space-y-4 md:justify-between items-center md:items-start md:gap-x-28"
      >
        <div className="flex flex-col w-full space-y-4">
          {/*Datos del restaurante */}
          <div className="flex flex-col w-full">
            <Label htmlFor="nameRestaurant">Nombre de restaurante</Label>
            <Input
              type="text"
              id="nameRestaurant"
              name="nameRestaurant"
              value={restaurantData.nameRestaurant}
              onChange={handleRestaurantChange}
            />
            <ErrorMessage>{fielErrors["nameRestaurant"]}</ErrorMessage>
          </div>
          <div className="flex flex-col w-full">
            <Label htmlFor="phoneRestaurant">Numero de contacto</Label>
            <Input
              type="text"
              id="phoneRestaurant"
              name="phoneRestaurant"
              value={restaurantData.phoneRestaurant}
              onChange={handleRestaurantChange}
            />
            <ErrorMessage>{fielErrors["phoneRestaurant"]}</ErrorMessage>
          </div>
          <div className="flex flex-col w-full">
            <Label htmlFor="emailRestaurant">Correo electronico</Label>
            <Input
              type="email"
              id="restaurantEmail"
              name="restaurantEmail"
              value={restaurantData.restaurantEmail}
              onChange={handleRestaurantChange}
            />
            <ErrorMessage>{fielErrors["restaurantEmail"]}</ErrorMessage>
          </div>
          <div className="flex flex-col w-full">
            <Label htmlFor="description">
              Descripción
              <span className="text-xs font-normal">
                (Los clientes podran ver la)
              </span>
            </Label>
            <textarea
              name="description"
              id="description"
              rows={4}
              cols={50}
              className="border border-black outline-primary rounded-lg p-2 text-sm"
              value={restaurantData.description}
              onChange={handleRestaurantChange}
            ></textarea>
            <ErrorMessage>{fielErrors["description"]}</ErrorMessage>
          </div>
        </div>

        <div className="flex flex-col w-full space-y-4">
          <div className="flex flex-col w-full">
            <Label htmlFor="address">
              Dirección <span className="text-xs font-normal">(Ubicación)</span>
            </Label>
            <Input
              type="text"
              id="address"
              name="address"
              value={restaurantData.address}
              onChange={handleRestaurantChange}
            />
            <ErrorMessage>{fielErrors["address"]}</ErrorMessage>
          </div>
          <div className="flex flex-col w-full">
            <Label htmlFor="zipCode">Código Postal</Label>
            <Input
              type="text"
              id="zipCode"
              name="zipCode"
              value={restaurantData.zipCode}
              onChange={handleRestaurantChange}
            />
            <ErrorMessage>{fielErrors["zipCode"]}</ErrorMessage>
          </div>
        </div>
        <div className="flex flex-col w-full space-y-4">
          <div className="flex flex-col w-full space-y-2">
            <Label>Rango de precios</Label>
            <div className="flex items-center space-x-5">
              <input
                type="number"
                id="minPrice"
                name="minPrice"
                value={restaurantData.minPrice}
                onChange={handleRestaurantChange}
                className="border border-black outline-primary rounded-lg w-28 h-10 p-2"
              />
              <span>-</span>
              <input
                type="number"
                id="maxPrice"
                name="maxPrice"
                value={restaurantData.maxPrice}
                onChange={handleRestaurantChange}
                className="border border-black outline-primary rounded-lg w-28 h-10 p-2"
              />
            </div>
            <ErrorMessage>{fielErrors["minPrice"]}</ErrorMessage>
            <ErrorMessage>{fielErrors["maxPrice"]}</ErrorMessage>
          </div>
          <div className="flex flex-col w-full gap-y-2">
            <Label>Tipo de comida</Label>
            <select
              name="foodTypes"
              id="foodTypes"
              onChange={handleTypeFoodChange}
              className="border border-black rounded-lg h-10 outline-primary"
            >
              <option value="">Selecciona un tipo</option>
              {foodCategories.map((category, index: any) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {/* Display selected food types */}
            {restaurantData.foodTypes.length > 0 && (
              <div className="flex flex-wrap w-full gap-2">
                {restaurantData.foodTypes.map((type) => (
                  <span key={type} className="bg-gray-200 px-2 rounded">
                    {type}
                    <button
                      onClick={() =>
                        setRestaurantData((prev) => ({
                          ...prev,
                          foodTypes: prev.foodTypes.filter((t) => t !== type),
                        }))
                      }
                      className="ml-2"
                    >
                      × {/* Remove button */}
                    </button>
                  </span>
                ))}
              </div>
            )}
            <ErrorMessage>{fielErrors["foodTypes"]}</ErrorMessage>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold text-[#888]">
              ¿Desea ofrecer opciones de reserva especial para eventos como
              cumpleaños, cenas románticas, y más?
            </p>
            <div className="flex gap-x-10 items-center">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-semibold capitalize">Si</label>
                <input
                  id="eventReservations"
                  type="checkbox"
                  value="Si"
                  checked={isCheck === "Si"}
                  onChange={() => handleCheckbox("Si")}
                  className="border border-black w-8 h-8 focus:ring-2 focus:ring-primary rounded"
                />
              </div>
              <div className="flex items-center space-x-2">
                <label className="text-sm font-semibold capitalize">no</label>
                <input
                  id="eventReservations"
                  type="checkbox"
                  value="No"
                  checked={isCheck === "No"}
                  onChange={() => handleCheckbox("No")}
                  className="border border-black w-8 h-8"
                />
              </div>
            </div>
            <ErrorMessage>{fielErrors["isCheck"]}</ErrorMessage>
            {isCheck === "Si" && (
              <div className="flex flex-col space-y-1">
                <Label>Marca los eventos que gustes ofrecer</Label>
                <div>
                  {events.map((event: any) => (
                    <label
                      key={event.id}
                      className="capitalize flex items-center"
                    >
                      {event.name}
                      <input
                        type="checkbox"
                        value={event.id}
                        checked={restaurantData.eventReservations?.includes(
                          String(event.id)
                        )}
                        onChange={handleEventReservationChange}
                        className="w-4 h-4 ml-1"
                      />
                    </label>
                  ))}
                </div>
              </div>
            )}
            <ErrorMessage>{fielErrors["eventReservations"]}</ErrorMessage>
          </div>
          <div className="flex flex-col w-full">
            <Label htmlFor="ability">
              Capacidad de comensales del resturante
            </Label>
            <input
              type="text"
              id="capacity"
              name="capacity"
              value={restaurantData.capacity}
              onChange={handleRestaurantChange}
              className="border border-black rounded-lg w-1/4 h-10 px-2"
            />
            <ErrorMessage>{fielErrors["capacity"]}</ErrorMessage>
          </div>
          <div className="flex flex-col w-full">
            <Label htmlFor="logo">Logo</Label>
            <label
              htmlFor="logo"
              className="border-2 border-dashed border-black w-20 h-20 p-1 cursor-pointer flex justify-center items-center rounded-lg"
            >
              {restaurantData.logo ? (
                <img
                  src={restaurantData.logo}
                  alt="Logo Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
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
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              )}
              <input
                type="file"
                className="hidden"
                id="logo"
                name="logo"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "logo")}
              />
            </label>
            <ErrorMessage>{fielErrors["logo"]}</ErrorMessage>
          </div>
          <div className="flex flex-col w-full">
            <Label htmlFor="banner">Banner</Label>
            <label
              htmlFor="banner"
              className="border-2 border-dashed border-black w-52 h-32 p-1 cursor-pointer flex justify-center items-center rounded-lg"
            >
              {restaurantData.banner ? (
                <img
                  src={restaurantData.banner}
                  alt="Banner Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
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
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              )}
              <input
                type="file"
                className="hidden"
                id="banner"
                name="logo"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "banner")}
              />
            </label>
            <ErrorMessage>{fielErrors["banner"]}</ErrorMessage>
          </div>
          <div className=" flex flex-col items-center">
            <Button>Guardar datos</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
