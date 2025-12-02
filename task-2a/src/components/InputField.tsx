interface InputFieldProps {
  label: string;
  type: 'number';
  value: number | undefined;
  onChange: (value: number | undefined) => void;
  min?: number;
  max?: number;
  placeholder?: string;
  helperText?: string;
}

export function InputField({
  label,
  type,
  value,
  onChange,
  min,
  max,
  placeholder,
  helperText
}: InputFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (inputValue === '') {
      onChange(undefined);
    } else {
      const parsed = parseInt(inputValue, 10);
      if (!isNaN(parsed)) {
        onChange(parsed);
      }
    }
  };

  // Validate current value against constraints
  const isInvalid = value !== undefined && (
    value < 0 ||
    (min !== undefined && value < min) ||
    (max !== undefined && value > max)
  );

  // Generate error message
  let errorMessage = '';
  if (isInvalid) {
    if (value < 0) {
      errorMessage = 'Number must be positive';
    } else if (min !== undefined && max !== undefined) {
      errorMessage = `Number must be within range ${min}–${max}`;
    } else if (min !== undefined) {
      errorMessage = `Number must be at least ${min}`;
    } else if (max !== undefined) {
      errorMessage = `Number must be at most ${max}`;
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-ui-text-secondary mb-2">
        {label}
      </label>
      <input
        type={type}
        min={min}
        max={max}
        value={value ?? ''}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded-lg text-ui-text-secondary focus:outline-none focus:ring-2 ${
          isInvalid
            ? 'border-red-500 focus:ring-red-500'
            : 'border-ui-border focus:ring-ui-primary'
        }`}
      />
      {isInvalid && errorMessage && (
        <p className="text-xs text-red-500 mt-1">{errorMessage}</p>
      )}
      {!isInvalid && helperText && (
        <p className="text-xs text-ui-text-muted mt-1">{helperText}</p>
      )}
    </div>
  );
}