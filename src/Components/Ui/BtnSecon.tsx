import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function BtnSecon({ children, ...props }: Props) {
  return (
    <button
      className="bg-Am4 font-Poppins font-semibold text-sm w-full h-9 flex justify-center items-center rounded-xl"
      {...props}
    >
      {children}
    </button>
  );
}
