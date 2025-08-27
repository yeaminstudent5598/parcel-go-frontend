// src/components/Password.tsx
import { useId, useState, forwardRef } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PasswordProps extends React.ComponentPropsWithoutRef<typeof Input> {}

const Password = forwardRef<HTMLInputElement, PasswordProps>((props, ref) => {
  const id = useId();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  return (
    <div className="relative">
      <Input
        id={id}
        ref={ref}
        type={isVisible ? "text" : "password"}
        placeholder="Password"
        {...props} // allow passing extra props from react-hook-form or parent
        className={`pe-9 ${props.className || ""}`}
      />
      <button
        type="button"
        onClick={toggleVisibility}
        aria-label={isVisible ? "Hide password" : "Show password"}
        className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isVisible ? <EyeOffIcon size={16} aria-hidden="true" /> : <EyeIcon size={16} aria-hidden="true" />}
      </button>
    </div>
  );
});

Password.displayName = "Password";

export default Password;
