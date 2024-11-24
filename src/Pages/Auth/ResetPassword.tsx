import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../../Assets/GetsyRestaurants.png";
import ButtonLogin from "../../Components/Ui/Button";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const location = useLocation();
  const email = location.state?.email;

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrors(["Passwords do not match"]);
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/getsy-back/user/recovery-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword: password }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/login");
      } else {
        setErrors([
          data.message ||
            "An unexpected error occurred. Please try again later.",
        ]);
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setErrors(["An unexpected error occurred. Please try again later."]);
    }
  };

  return (
    <div className="flex flex-col h-screen justify-between items-center bg-white font-Poppins p-10">
      <img
        src={Logo}
        alt="GetsyRestaurants"
        className="w-[18.75rem] h-[18.75rem]"
      />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full justify-center items-center space-y-4"
      >
        <div className="password-input font-rubik text-xs mb-10">
          <div className="label mb-2 flex">
            <p className="font-rubik mr-1">Password</p>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 rounded-lg border border-black outline-primary px-2 py-3"
              required
            />
            {showPassword ? (
              <div
                className="hover:cursor-pointer absolute top-2 right-2"
                onClick={() => setShowPassword(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-eye-closed"
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#9e9e9e"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M21 9c-2.4 2.667 -5.4 4 -9 4c-3.6 0 -6.6 -1.333 -9 -4" />
                  <path d="M3 15l2.5 -3.8" />
                  <path d="M21 14.976l-2.492 -3.776" />
                  <path d="M9 17l.5 -4" />
                  <path d="M15 17l-.5 -4" />
                </svg>
              </div>
            ) : (
              <div
                className="hover:cursor-pointer absolute top-2 right-2"
                onClick={() => setShowPassword(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-eye"
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#9e9e9e"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                  <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                </svg>
              </div>
            )}
          </div>
        </div>
        <div className="password-input font-rubik text-xs mb-6">
          <div className="label mb-2 flex">
            <p className="font-rubik mr-1">Confirm password</p>
          </div>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full h-12 rounded-lg border border-black outline-primary px-2 py-3"
              required
            />
            {showConfirmPassword ? (
              <div
                className="hover:cursor-pointer absolute top-2 right-2"
                onClick={() => setShowConfirmPassword(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-eye-closed"
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#9e9e9e"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M21 9c-2.4 2.667 -5.4 4 -9 4c-3.6 0 -6.6 -1.333 -9 -4" />
                  <path d="M3 15l2.5 -3.8" />
                  <path d="M21 14.976l-2.492 -3.776" />
                  <path d="M9 17l.5 -4" />
                  <path d="M15 17l-.5 -4" />
                </svg>
              </div>
            ) : (
              <div
                className="hover:cursor-pointer absolute top-2 right-2"
                onClick={() => setShowConfirmPassword(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-eye"
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#9e9e9e"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                  <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                </svg>
              </div>
            )}
          </div>
        </div>
        {errors.length > 0 && (
          <div className="errors text-red-500 text-xs text-center">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
        <div className="flex justify-center mt-10">
          <ButtonLogin
            type="submit"
          >
            Reset Password
          </ButtonLogin>
        </div>
      </form>
    </div>
  );
}
