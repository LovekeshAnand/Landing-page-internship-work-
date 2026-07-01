import React, { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      leftIcon,
      rightIcon,
      className = "",
      containerClassName = "",
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <div className={`flex flex-col gap-1.5 w-full ${containerClassName}`}>
        {label && (
          <label
            htmlFor={id}
            className={`text-[10px] font-bold tracking-wider uppercase select-none ${
              disabled ? "text-slate-400" : "text-slate-550"
            }`}
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-slate-400 select-none">
              {leftIcon}
            </div>
          )}
          <input
            id={id}
            disabled={disabled}
            className={`
              w-full rounded-xl bg-white border font-sans text-sm transition-all duration-200
              placeholder:text-slate-400 focus:outline-none focus:ring-2
              ${leftIcon ? "pl-10" : "pl-4"}
              ${rightIcon ? "pr-10" : "pr-4"}
              ${
                disabled
                  ? "bg-slate-50 border-slate-200 text-slate-500 cursor-not-allowed font-medium"
                  : error
                  ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                  : "border-slate-200 hover:border-slate-300 focus:border-brand-blue focus:ring-brand-blue/10"
              }
              ${disabled ? "py-3 text-slate-400" : "py-3"}
              ${className}
            `}
            ref={ref}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 flex items-center text-slate-400">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <span className="text-xs font-medium text-red-500">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
