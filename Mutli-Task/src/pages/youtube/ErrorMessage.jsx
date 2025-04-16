import React from "react";

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <p className="text-red-500 text-sm font-semibold mt-4">{message}</p>
  );
};

export default ErrorMessage;
