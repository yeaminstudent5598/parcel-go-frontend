// src/features/auth/Register.tsx
import { Link } from "react-router-dom";
import { RegisterForm } from "./RegisterForm";
import { ArrowLeft } from "lucide-react";

export default function Register() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left side image */}
      <div className="relative hidden lg:block">
        <img
          src="src/assets/images/png.png" // এখানে তোমার ইমেজ path দাও
          alt="Register background"
          className="absolute inset-0 h-full w-full object-cover brightness-90"
        />
      </div>

      {/* Right side form */}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        {/* Back link */}
        <div className="flex justify-center gap-2 md:justify-start">
          <Link to="/" className="flex items-center gap-2 font-medium">
            <ArrowLeft /> Back
          </Link>
        </div>

        {/* Form */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}
