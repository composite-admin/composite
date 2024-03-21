import React from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { Input } from "../../ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { Textarea } from "@/components/ui/textarea";
  
  interface FormSelectProps<TFormValues extends FieldValues> {
    label: string;
    name: Path<TFormValues>;
    register: UseFormRegister<TFormValues>;
    errors: Partial<Record<Path<TFormValues>, any>>;
    options: { label: string; value: string }[];
    placeholder?: string;
  }
  

interface FormInputProps<TFormValues extends FieldValues> {
  label: string;
  name: Path<TFormValues>;
  type?: string;
  placeholder?: string;
  register?: UseFormRegister<TFormValues>;
  errors?: Partial<Record<Path<TFormValues>, any>>;
  autoComplete?: string;
}

const InputComponent = <TFormValues extends FieldValues>({
  label,
  name,
  placeholder,
  type = "text",
  register,
  errors,
  autoComplete,
}: FormInputProps<TFormValues>) => {
  return (
    <div className="sm:col-span-3">
      <label
        htmlFor={String(name)}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <Input
          type={type}
          id={String(name)}
          withIcon={false}
          {...register(name)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
        />
        {errors[name]?.message && (
          <p className="mt-2 text-sm text-red-400">{errors[name]?.message}</p>
        )}
      </div>
    </div>
  );
};

export default InputComponent;



  const FormSelect = <TFormValues extends FieldValues>({
    label,
    name,
    register,
    errors,
    options,
    placeholder,
  }: FormSelectProps<TFormValues>) => {
    return (
      <div className="sm:col-span-3">
        <label
          htmlFor={String(name)}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
        <div className="mt-2">
          <Select
            {...register(name)}
            defaultValue={placeholder}
            onValueChange={(value) => {
              register(name).onChange({ target: { value } });
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors[name]?.message && (
            <p className="mt-2 text-sm text-red-400">{errors[name]?.message}</p>
          )}
        </div>
      </div>
    );
  };
  
  interface FormTextareaProps<TFormValues extends FieldValues> {
    label: string;
    name: Path<TFormValues>;
    register: UseFormRegister<TFormValues>;
    errors: Partial<Record<Path<TFormValues>, any>>;
    placeholder?: string;
  }
  
  const FormTextarea = <TFormValues extends FieldValues>({
    label,
    name,
    register,
    errors,
    placeholder,
  }: FormTextareaProps<TFormValues>) => {
    return (
      <div className="sm:col-span-3">
        <label
          htmlFor={String(name)}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
        <div className="mt-2">
          <Textarea
            {...register(name)}
            placeholder={placeholder}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
          />
          {errors[name]?.message && (
            <p className="mt-2 text-sm text-red-400">{errors[name]?.message}</p>
          )}
        </div>
      </div>
    );
  };
  
  export { FormSelect, FormTextarea };