import React from "react";

interface Props extends React.HTMLAttributes<HTMLParagraphElement> {}

export default function ErrorMessage({ children }: Props) {
  return <p className="text-xs text-red-600 font-semibold animate-pulse animate-duration-[200ms]">{children}</p>;
}
