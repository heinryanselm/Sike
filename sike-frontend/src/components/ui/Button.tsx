import { ButtonHTMLAttributes } from "react";
import { motion } from "framer-motion";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export const Button = ({
  children,
  variant = "primary",
  ...props
}: ButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-6 py-3 rounded-lg font-semibold text-white transition-colors
        ${
          variant === "primary"
            ? "bg-indigo-600 hover:bg-indigo-700"
            : "bg-gray-600 hover:bg-gray-700"
        }`}
      {...props}
    >
      {children}
    </motion.button>
  );
};
