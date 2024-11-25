import { Link } from "react-router-dom";

import EditHorarios from "../../Components/Dashboard/EditHorarios";
import Holydays from "../../Components/Dashboard/Holydays";

const Schedules = () => {
  return (
    <div className="font-Poppins px-6 pb-5 w-full flex flex-col items-center">
      <div className="w-full mb-4 md:mb-12 flex items-center justify-between md:justify-normal md:space-x-9">
        <Link to="/dashboard" className="hover:bg-gray-100 rounded-full p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
              clipRule="evenodd"
            />
          </svg>
        </Link>

        <h1 className="text-xl md:text-2xl font-bold">
          Horarios y días especiales
        </h1>
      </div>
      <div className="flex max-md:flex-col max-md:space-y-10 w-full md:justify-center md:px-[13rem]">
        <EditHorarios />
        <Holydays />
      </div>
    </div>
  );
};

export default Schedules;
