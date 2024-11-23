import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function InputDate({ className = "", ...props }: Props) {
  return (
    <input
      className={`border border-black rounded-lg w-auto h-10 text-center text-sm outline-primary ${className}`}
      type="time"
      {...props}
    />
  );
}
