import React from "react";
import { useField } from "formik";

export default function TextField({ label, name, placeholder, className, maxLength, pattern }) {
  const [field, meta] = useField(name);

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block font-medium mb-2">
          {label}
        </label>
      )}
      <input
        {...field}
        id={name}
        placeholder={placeholder}
        maxLength={maxLength}
        pattern={pattern}
        className={`w-full p-4 bg-zinc-200 bg-opacity-[20%] backdrop-blur-md border border-gray-300 rounded-xl hover:shadow-zinc-400/20 shadow-lg focus:shadow-zinc-200/20 focus:shadow-xl hover:bg-opacity-[25%] focus:bg-opacity-[30%] focus:outline-none transition-all ease-in-out duration-300 ${
          meta.touched && meta.error
            ? "ring-red-400 border-red-400 ring-1"
            : "focus:ring-gray-300 focus:ring-2"
        } ${className}`}
      />
      {meta.touched && meta.error && (
        <div className="text-red-400 text-sm mt-1">{meta.error}</div>
      )}
    </div>
  );
}
