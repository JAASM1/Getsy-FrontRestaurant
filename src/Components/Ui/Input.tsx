import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}
export default function Input(props: Props) {
  return (
    <input
      className="w-full h-10 rounded-lg border border-black outline-primary px-3 py-2 placeholder:text-gray-600"
      {...props}
    />
  );
}
