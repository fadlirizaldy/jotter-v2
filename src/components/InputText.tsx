interface InputTextProps {
  id?: string;
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  className?: string;
  register: any;
  validation: {
    required?: {
      value: boolean;
      message: string;
    };
    pattern?: {
      value: RegExp | string;
      message: string;
    };
  };
  errors?: {
    type?: string;
    message?: string;
  };
}

const InputText = (props: InputTextProps) => {
  const {
    id,
    label,
    name,
    placeholder,
    type = "text",
    className,
    register,
    validation,
    errors,
  } = props;

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={label}
        className="block text-xs text-muted-foreground mb-1.5 uppercase tracking-wider"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        className={`w-full bg-input-background border rounded-lg px-4 py-3 text-black text-sm focus:outline-none focus:border-primary transition-colors ${
          errors && errors.type !== "apiResponse"
            ? "border-red-500"
            : "border-slate-200 focus:ring-emerald-200"
        } rounded-lg bg-stone-50 focus:ring focus:outline-none ${className}`}
        {...register(name, validation)}
      />
      {errors && <p className="text-sm text-red-500">{errors.message}</p>}
    </div>
  );
};

export default InputText;
