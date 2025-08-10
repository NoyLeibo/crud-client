interface FormFieldProps {
  label?: string;
  name: string;
  value: string | number | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  max?: string;
  min?: string;
}

export function FormField({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  type = "text",
  required = false,
  max,
  min,
}: FormFieldProps) {
  return (
    <div className="flex column">
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        required={required}
        max={max}
        min={min}
      />
    </div>
  );
}
