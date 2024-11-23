import { MobileDash } from "../../Components/Dashboard/MobileDash";
import DeskDash from "../../Components/Dashboard/DeskDash";

export default function Dashboard() {
  return (
    <div className="flex flex-col justify-center items-center w-full px-6 md:px-10 font-Poppins">
      <h1 className="text-2xl font-bold w-full mb-4 md:mb-16">Bienvenido a tu Dashboard</h1>
      <MobileDash/>
      <DeskDash/>
    </div>
  );
}
