// src/app/pgr/formulario/components/TextInput.tsx
import React from 'react';

interface TextInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string; // e.g., text, number, email
  maxLength?: number;
  pattern?: string;
  inputMode?: 'text' | 'email' | 'tel' | 'numeric' | 'decimal' | 'search' | 'url';
  helperText?: string;
  mask?: 'phone';
}

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits ? `(${digits}` : '';
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

const TextInput: React.FC<TextInputProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  type = 'text',
  maxLength,
  pattern,
  inputMode,
  helperText,
  mask,
}) => {
  const handleChange = (rawValue: string) => {
    onChange(mask === 'phone' ? formatPhone(rawValue) : rawValue);
  };

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        pattern={pattern}
        inputMode={inputMode}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gold focus:border-gold sm:text-sm"
      />
      {helperText && <p className="mt-1 text-xs text-gray-500">{helperText}</p>}
    </div>
  );
};

export default TextInput;
