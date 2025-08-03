type Props = {
    name: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: string;
  };
  
  export function InputField({ name, value, onChange, placeholder, type = "text" }: Props) {
    return (
      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
      />
    );
  }
  