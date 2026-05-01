// src/app/pgr/formulario/components/CheckboxGroup.tsx
import React from 'react';

interface CheckboxOption {
  value: string;
  label: string;
}

interface CheckboxGroupProps {
  id: string;
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  options: CheckboxOption[];
  required?: boolean;
  exclusiveValues?: string[];
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  id,
  label,
  values = [],
  onChange,
  options,
  required = false,
  exclusiveValues = [],
}) => {
  const handleChange = (value: string, checked: boolean) => {
    if (checked) {
      if (exclusiveValues.includes(value)) {
        onChange([value]);
      } else {
        onChange([...values.filter((v) => !exclusiveValues.includes(v)), value]);
      }
    } else {
      onChange(values.filter((v) => v !== value));
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-1 space-y-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              type="checkbox"
              id={`${id}-${option.value}`}
              name={`${id}-${option.value}`}
              value={option.value}
              checked={values.includes(option.value)}
              onChange={(e) => handleChange(option.value, e.target.checked)}
              className="focus:ring-gold h-4 w-4 text-gold border-gray-300 rounded"
            />
            <label htmlFor={`${id}-${option.value}`} className="ml-2 block text-sm text-gray-900">
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckboxGroup;
