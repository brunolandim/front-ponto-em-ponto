"use client";
import React from "react";
import { Spinner } from "phosphor-react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  disabled = false,
  isLoading = false,
  onClick,
  className = "",
  children,
  icon,
  iconPosition = "left",
}) => {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`w-full flex items-center justify-center gap-2 py-3 text-white font-bold rounded-full transition ${
        disabled || isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
      } ${className}`}
    >
      {isLoading ? (
        <Spinner className="animate-spin" size={24} />
      ) : (
        <>
          {icon && iconPosition === "left" && <span className="flex items-center">{icon}</span>}
          <span>{children}</span>
          {icon && iconPosition === "right" && <span className="flex items-center">{icon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
