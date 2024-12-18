import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../Assets/GetsyRestaurants.png";
import {Button} from "../../Components/Ui";

export default function ChangePassword() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", ""]);
  const [emailSent, setEmailSent] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let timer: number;
    if (emailSent && countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    } else if (countdown === 0) {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [emailSent, countdown]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/getsy-back/user/recovery-send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setEmailSent(true);
        setSuccessMessage("Email enviado. Por favor revisa tu correo.");
        setCountdown(30);
        setCanResend(false);
      } else {
        setErrors([
          data.message ||
            "Un error inesperado ha ocurrido. Intentalo de nuevo más tarde.",
        ]);
      }
    } catch (error) {
      console.error("Error sending recovery email:", error);
      setErrors(["Un error inesperado ha ocurrido. Intentalo de nuevo más tarde."]);
    }
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(email);
    const recoveryCode = code.join("");
    try {
      const response = await fetch("http://localhost:3000/getsy-back/user/recovery-validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, recovery_code: recoveryCode }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/reset-password", { state: { email } });
      } else {
        setErrors([data.message || "Código invalido. Por favor intenta de nuevo."]);
      }
    } catch (error) {
      console.error("Error validating recovery code:", error);
      setErrors(["Un error inesperado ha ocurrido. Intentalo de nuevo más tarde."]);
    }
  };

  const handleCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newCode = [...code];
    newCode[index] = e.target.value;
    setCode(newCode);
  };

  const handleResendCode = async () => {
    if (canResend) {
      try {
        const response = await fetch("http://localhost:3000/getsy-back/user/recovery-send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (response.ok) {
          setSuccessMessage("Nuevo código enviado! Por favor revisa tu email.");
          setCountdown(30);
          setCanResend(false);
        } else {
          setErrors([
            data.message ||
              "Un error inesperado ha ocurrido. Intentalo de nuevo más tarde.",
          ]);
        }
      } catch (error) {
        console.error("Error resending recovery code:", error);
        setErrors(["Un error inesperado ha ocurrido. Intentalo de nuevo más tarde."]);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen justify-between md:justify-normal items-center bg-white font-Poppins p-10">
      <img
        src={Logo}
        alt="GetsyRestaurants"
        className="w-[18.75rem] h-[18.75rem]"
      />
      {!emailSent ? (
        <form
          onSubmit={handleEmailSubmit}
          className="flex flex-col w-full justify-center items-center space-y-4"
        >
          <p className="text-center">
            Ingresa tu correo electronico para <br /> recibir un codgio de confirmacion
          </p>
          <div className="flex flex-col w-full max-w-xs">
            <label htmlFor="email" className="text-label">
              Correo
            </label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              name="email"
              className="w-full h-12 rounded-lg border border-black outline-primary px-2 py-3"
            />
          </div>
          {errors.length > 0 && (
            <div className="errors mt-4 text-red-500 text-xs text-center">
              {errors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
          <Button>Enviar codigo</Button>
        </form>
      ) : (
        <form className="flex flex-col w-full justify-center items-center space-y-4" onSubmit={handleCodeSubmit}>
          <p className="text-center">
            {successMessage}
          </p>
          <div className="flex justify-evenly w-full max-w-xs">
            {code.map((value, index) => (
              <input
                key={index}
                type="text"
                value={value}
                onChange={(e) => handleCodeChange(e, index)}
                className="p-2 border rounded-[5px] h-10 w-10 text-center border-gray-600"
              />
            ))}
          </div>
          {errors.length > 0 && (
            <div className="errors mt-4 text-red-500 text-xs text-center">
              {errors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
          <div className="flex justify-center mt-12 w-full">
            <Button>Confirmar</Button>
          </div>
          <div className="text-center mt-6">
            {canResend ? (
              <button
                onClick={handleResendCode}
                className="text-[#117ACD] text-sm"
              >
                Resend code
              </button>
            ) : (
              <p className="text-sm">
                Didn&apos;t receive it? You may request another in {countdown}{" "}
                seconds.
              </p>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
