import { Control } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import React from "react";

interface CustomFormFieldProps extends React.HTMLProps<HTMLInputElement> {
  name: string;
  placeholder?: string;
  control: Control<any>;
  withIcon?: boolean;
  label?: string;
  type?: string;
  icon?: React.ReactNode;
}

interface CustomFormSelectProps extends React.HTMLProps<HTMLSelectElement> {
  name: string;
  control: Control<any>;
  placeholder?: string;
  items: string[];
  labelText?: string;
}

export function CustomFormField({
  name,
  control,
  placeholder,
  withIcon,
  icon,
  label,
  type,
  ...props
}: CustomFormFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize">{label}</FormLabel>
          <FormControl>
            <Input
              type={type}
              {...field}
              placeholder={placeholder}
              withIcon={withIcon}
              icon={icon}
              {...props}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

interface CustomFormTextareaFieldProps
  extends React.HTMLProps<HTMLTextAreaElement> {
  name: string;
  control?: Control<any>;
  placeholder?: string;
}

export function CustomFormTextareaField({
  name,
  control,
  placeholder,
  ...props
}: CustomFormTextareaFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize">{name}</FormLabel>
          <FormControl>
            <Textarea {...field} {...props} placeholder={placeholder} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function CustomFormSelect({
  name,
  control,
  items,
  labelText,
  ...props
}: CustomFormSelectProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-textColor capitalize">
            {labelText || name}
          </FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            value={field.value}
            disabled={props.disabled}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue {...props} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {items.map((item) => (
                <SelectItem key={item} value={item} className="text-textColor">
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
