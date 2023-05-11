"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputIdrProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const InputIdr: React.FC<InputIdrProps> = ({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  register,
  required,
  errors,
}) => {
  return (
    <label className="input-group">
      <span className="bg-info text-secondary">RP.</span>
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={type}
        className={`
            input
            input-info
            peer
            w-full
            p-4
            pt-6
            font-light 
            bg-background
            rounded-md
            outline-none
            transition
            disabled:bg-secondary
            disabled:cursor-not-allowed
            relative
            ${formatPrice ? "pl-9" : "pl-4"}
            ${errors[id] ? "border-rose-500" : ""}
            ${errors[id] ? "focus:border-rose-500" : ""}
          `}
      />
    </label>
  );
};

export default InputIdr;
