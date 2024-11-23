import { Link } from "react-router-dom";
import Logo from "../../../Assets/GetsyRestaurants.png";

export const LoginMobile = () => {
  return (
    <div className="flex flex-col items-center justify-between h-screen p-10 max-md:bg-gradient-to-b from-white via-primary/10 to-primary font-Poppins">
      <img src={Logo} alt="GetsyRestaurants" />
      <div className="space-y-10 w-full">
        <Link to="/login-m" className="btn-primary">
          Iniciar sesión
        </Link>
        <div className="space-y-2">
          <p className="text-center font-light">¿No tienes una cuenta?</p>
          <Link
            to="/register"
            className="bg-white text-F49731 border-2 border-primary font-Poppins font-semibold text-xl w-full max-w-xs h-12 flex justify-center items-center rounded-full"
          >
            Crear cuenta
          </Link>
        </div>
      </div>
    </div>
  );
};
