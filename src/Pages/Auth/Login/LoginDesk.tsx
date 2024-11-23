import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { Label, Button, Input, ErrorMessage } from "../../../Components/Ui";
import { useAuth } from "../../../Context/AuthProvider";
import { LoginValidationSchema } from "../../../Validation/LoginValidationScheme";

import imgLoginDesk from "../../../assets/imgLoginDesk.jpg";
import Logo from "../../../assets/Logo.jpeg";

export const LoginDesk = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string>("");
  const [fielErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await LoginValidationSchema.validate(formData, { abortEarly: false });
      setFieldErrors({});
      try {
        await login(formData.email, formData.password);
        navigate("/");
      } catch (error: any) {
        if (error) {
          setError("Usuario no encontrado");
        } else {
          setError("Error de conexion");
        }
      }
    } catch (validationErrors) {
      if (validationErrors instanceof Yup.ValidationError) {
        const errors: { [key: string]: string } = {};
        validationErrors.inner.forEach((error) => {
          if (error.path) errors[error.path] = error.message;
        });
        setFieldErrors(errors);
      }
    }
  };

  return (
    <div className="w-full font-Poppins grid grid-cols-2 h-screen">
      <div className="px-16 py-28">
        <div className="flex items-center">
          <div className="mr-5">
            <p className="text-3xl font-light">Bienvenido a</p>
            <h2 className="text-4xl font-semibold uppercase">
              Getsy Restaurants
            </h2>
          </div>
          <img src={Logo} alt="Logo" className="w-24" />
        </div>
        <div className="flex flex-col h-full justify-around">
          <p className="text-3xl font-extrabold">Iniciar sesión</p>
          <form onSubmit={handleSubmit} className="w-1/2">
            {error && (
              <p className="text-red-500 font-semibold text-sm text-left mb-1">
                {error}
              </p>
            )}
            <div className="flex flex-col w-full mb-4">
              <Label htmlFor="email">Correo</Label>
              <Input
                type="email"
                placeholder="John@example.com"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <ErrorMessage>{fielErrors["email"]}</ErrorMessage>
            </div>
            <div className="flex flex-col w-full mb-8">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <div className="flex justify-between">
                <ErrorMessage>{fielErrors["password"]}</ErrorMessage>
                <Link
                  to="/change-password"
                  className="text-right font-bold text-xs text-[#555] mt-2"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
            </div>
            <Button type="submit">Iniciar sesión</Button>
          </form>
          <div>
            <p className="text-sm text-[#555]">¿No tienes cuenta aún?</p>
            <Link to="/register" className="text-primary font-bold">
              Crear Cuenta
            </Link>
          </div>
        </div>
      </div>
      <div className="relative h-full">
        <div className="absolute inset-0 z-10">
          <div className="absolute right-full inset-y-0 w-32 bg-gradient-to-l from-primary/40 to-white" />
        </div>
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={imgLoginDesk}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};
