interface InputProps {
    id ?: string;
    label: string;
    lableIcon?: React.ReactNode;
    type: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
    accept?:string;
}
const Input: React.FC<InputProps> = ({id, label, lableIcon, type, value, onChange, placeholder, required, accept }) => {
    return (
        <div>
            <label className="flex text-sm font-medium text-gray-700 items-center gap-2"> {lableIcon} {label}</label>
            <input
                id={id}
                type={type}
                accept={accept}
                className="text-gray-800 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-gray-900"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
            />
        </div>
    );
}
export default Input;