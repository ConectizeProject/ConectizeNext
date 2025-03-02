import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forwardRef } from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor={props.id}>{label}</Label>
        <Input
          ref={ref}
          className={className}
          {...props}
          aria-invalid={!!error}
          aria-errormessage={`${props.id}-error`}
        />
        {error && (
          <p
            id={`${props.id}-error`}
            className="text-sm text-red-500 dark:text-red-400"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);
