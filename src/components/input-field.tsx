interface InputFieldProps {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField({
  label,
  type,
  placeholder,
  value,
  onChange,
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={label} className="font-semibold">
        {label}
      </label>
      <input
        type={type}
        name={label}
        id={label}
        className="py-3 px-6 rounded-lg border-2"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
