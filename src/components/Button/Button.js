import React from "react";
import '@/components/Button/Button.css';

export default function Button({ type = "button", onClick, children, disabled, className }) {
  return (
    <div className={`relative group ${className}
        ${disabled
            ? "disabled"
        : ""}
    `}>
      {/* Gradient Border */}
      <div className="gradient_border">
        <button
          type={type}
          onClick={onClick}
          disabled={disabled}
          className={`custom_button monument-extended
            ${disabled
              ? "disabled"
              : ""}
            `}
        >
          {children}
        </button>
      </div>
      {/* Gradient Image */}
      <div>
        <img
          className="gradient_image"
          src="/button_gradient.svg"
        />
      </div>
    </div>
  );
}
