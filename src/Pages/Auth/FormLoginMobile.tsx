import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { Label, Button, Input, ErrorMessage } from "../../Components/Ui";
import { useAuth } from "../../Context/AuthProvider";
import { LoginValidationSchema } from "../../Validation/LoginValidationScheme";

import Logo from "../../Assets/Logo.jpeg";

export default function FormLoginMobile() {
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
    <div className="bg-white flex flex-col justify-between items-center h-screen font-Poppins p-10">
      <img
        src={Logo}
        alt="GetsyRestaurants"
        className="w-[18.75rem] h-[18.75rem]"
      />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full justify-center items-center space-y-3 mt-5"
      >
        {error && (
          <p className="text-red-500 font-semibold text-sm text-left">
            {error}
          </p>
        )}
        <div className="flex flex-col w-full max-w-xs space-y-1">
          <Label htmlFor="email">Correo</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
          />
          <ErrorMessage>{fielErrors["email"]}</ErrorMessage>
        </div>
        <div className="flex flex-col w-full max-w-xs">
          <Label htmlFor="password">Contraseña</Label>
          <Input
            type="password"
            name="password"
            id="password"
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
        <Link
          to="/register"
          className="text-black font-semibold text-sm text-center"
        >
          Crear cuenta
        </Link>
      </form>
    </div>
  );
}
