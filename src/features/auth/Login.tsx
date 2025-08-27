import { Link } from "react-router-dom";
import { LoginForm } from "./LoginForm";
import registerAnimation from "../../assets/Animation.json";
import Lottie from "lottie-react";
export default function Login() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden lg:block">
              <Lottie
                animationData={registerAnimation}
                loop={true}
                className="absolute inset-0 h-full w-full object-cover brightness-90"
              />
            </div>

      <div className="flex flex-col gap-4 p-6 md:p-10 justify-center">
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground">Login to access your dashboard</p>
        </div>

        <LoginForm />

        <div className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="underline text-primary">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
