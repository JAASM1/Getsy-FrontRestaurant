import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import Reserves from "../Components/Reserves/Reserves";
import NewReserves from "../Components/Reserves/NewReserves";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"reserves" | "newReserves">(
    "reserves"
  );

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <div className="flex flex-col justify-center items-center px-6 md:px-[6.25rem] w-full font-Poppins">
      <div className="w-full md:flex items-center">
        <h1 className="text-2xl font-bold w-full mb-3">Bienvenido</h1>
        <div className="w-full md:flex justify-end">
          <div className="flex w-full items-center space-x-5 mb-3 md:hidden">
            <button
              onClick={() => setActiveTab("reserves")}
              className={`font-semibold text-sm rounded-md px-3 py-1 ${
                activeTab === "reserves" ? "bg-Am4" : "bg-white"
              }`}
            >
              Reservas
            </button>
            <button
              onClick={() => setActiveTab("newReserves")}
              className={`font-semibold text-sm rounded-md px-3 py-1 ${
                activeTab === "newReserves" ? "bg-Am4" : "bg-white"
              }`}
            >
              Nuevas reservas
            </button>
          </div>
          <div className="border border-black bg-white flex items-center w-full px-1 rounded-md mb-4 md:mb-7 md:w-2/3">
            <input type="text" className="w-full p-1 outline-none" />
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>
      {isMobile ? (
        <div className=" static">
          {activeTab === "reserves" && (
            <div className="w-full space-y-3">
              <Reserves />
            </div>
          )}
          {activeTab === "newReserves" && (
            <div className="w-full space-y-3">
              <NewReserves />
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="w-full flex space-x-10">
            <div className="w-full p-4 rounded-lg">
              <p className="font-semibold text-lg mb-1">Reservas</p>
              <div className="space-y-3">
                <Reserves />
              </div>
            </div>
            <div className="w-full bg-[#fff4c6] p-4 rounded-xl">
              <p className="font-semibold text-lg mb-1">Nuevas reservas</p>
              <div className="space-y-3">
                <NewReserves />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
