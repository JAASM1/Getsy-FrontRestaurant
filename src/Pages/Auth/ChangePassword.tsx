import Logo from "../../Assets/GetsyRestaurants.png";
import ButtonLogin from "../../Components/Ui/Button";

export default function ChangePassword() {
  return (
    <div className="flex flex-col h-screen justify-between items-center bg-white font-Poppins p-10">
      <img
        src={Logo}
        alt="GetsyRestaurants"
        className="w-[18.75rem] h-[18.75rem]"
      />
      <form className="flex flex-col w-full justify-center items-center space-y-4">
        <p className="text-center">
          Ingresa tu correo electronico para recibir un codgio de confirmacion
        </p>
        <div className="flex flex-col w-full max-w-xs">
          <label htmlFor="email" className="text-label">
            Correo
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full h-12 rounded-lg border border-black outline-primary px-2 py-3"
          />
        </div>
        <ButtonLogin>Enviar codigo</ButtonLogin>
      </form>
    </div>
  );
}
