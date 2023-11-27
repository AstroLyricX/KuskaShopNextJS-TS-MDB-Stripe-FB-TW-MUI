"use client";

import { useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface CustomCheckBoxProps {
  id: string;
  label: string;
  disabled?: boolean;
  register: UseFormRegister<FieldValues>;
}

export const CustomCheckBox: React.FC<CustomCheckBoxProps> = ({
  id,
  label,
  disabled,
  register,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="w-full flex flex-row gap-2 items-center">
      <input
        type="checkbox"
        id={id}
        disabled={disabled}
        {...register(id)}
        placeholder=""
        className="cursor-pointer"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <label
        htmlFor={id}
        className={`font-medium cursor-pointer ${
          isChecked ? "text-teal-400" : "text-rose-500"
        }`}
      >
        {label}
      </label>
    </div>
  );
};
