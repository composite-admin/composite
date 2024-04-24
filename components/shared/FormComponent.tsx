import { Control, useController } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "../ui/input";
import React from "react";

import { CalendarIcon } from "@radix-ui/react-icons";
import { format, parseISO } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { Matcher } from "react-day-picker";

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
          <FormLabel className="capitalize">{props.label}</FormLabel>
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
          <FormLabel className="capitalize">{labelText || name}</FormLabel>
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

interface DatePickerProps {
  name: string;
  placeholder?: string;
  control: Control<any>;
  label?: string;
}

export function CustomDatePicker({
  name,
  control,
  label,
  placeholder,
}: DatePickerProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel> {label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "text-left font-normal h-[46px]",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "yyyy-MM-dd")
                  ) : (
                    <span>{placeholder || "Pick a date"}</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value?.toString()}
                onSelect={field.onChange}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
