import type { FC } from "react";

interface PlainInputProps {
  label?: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  optional?: boolean
}
const PlainInput: FC<PlainInputProps> = ({ label, name, value, onChange, type, placeholder, required, className, optional }) => {
  return (
    <div className='flex gap-2 w-full'>
      <label className="w-[30%] text-nowrap text-sm font-semibold text-gray-700 flex items-center text-center">{label} {optional ? <p className="text-sm font-normal ml-1">(Optional)</p> : <span className="text-red-500 text-lg ml-1">*</span>}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={className}
      />

    </div>
  )
}

export default PlainInput
