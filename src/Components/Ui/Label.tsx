import React from "react";

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export default function Label({ children, ...props }: Props) {
  return (
    <label className="text-label" {...props}>
      {children}
    </label>
  );
}
