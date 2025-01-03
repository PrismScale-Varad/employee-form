import React from "react";

export default function Button({ type = "button", onClick, children, disabled, className }) {
  return (
    <div className={`relative group ${className}
        ${disabled
            ? "cursor-not-allowed group-hover:cursor-not-allowed grayscale"
        : ""}
    `}>
      {/* Gradient Border */}
      <div className="flex items-center justify-center p-[1px] opacity-90 rounded-full bg-gradient-to-l from-[#CFC704] via-[#B32468] to-[#542989]">
        <button
          type={type}
          onClick={onClick}
          disabled={disabled}
          className={`group-hover:bg-[#252525]/90 text-white bg-[#252525] backdrop-blur-md rounded-full transition-all duration-500 monument-extended py-4 w-36 lg:w-56 md:w-44
            ${disabled
              ? "cursor-not-allowed grayscale"
              : ""}
            `}
        >
          {children}
        </button>
      </div>
      {/* Gradient Image */}
      <div>
        <img
          className="absolute top-0 opacity-20 h-full w-full scale-[110%] group-hover:opacity-30 group-hover:blur transition-all duration-300 z-[-1] blur-lg"
          src="/button_gradient.svg"
        />
      </div>
    </div>
  );
}
