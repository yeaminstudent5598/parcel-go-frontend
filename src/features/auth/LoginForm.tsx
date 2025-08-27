import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "@/api/authApi";
import Password from "@/components/Password";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password too short"),
});


export function LoginForm() {
  const [loginUser, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

// D:\...\src\features\auth\LoginForm.tsx

const onSubmit = async (data: z.infer<typeof loginSchema>) => {
  try {
    const result = await loginUser(data).unwrap();
    console.log("API Response:", result); // ডিবাগিং এর জন্য এটি রাখতে পারেন

    // রেসপন্স থেকে success এবং data আছে কিনা চেক করুন
    if (result.success && result.data) {
      // 1. Redux state এ সঠিক ডেটা সেভ করুন
      dispatch(
        setCredentials({
          user: result.data.user,
          token: result.data.accessToken, // 'result.token' এর বদলে 'result.data.accessToken'
          refreshToken: result.data.refreshToken,
        })
      );

      // 2. সফল বার্তা দেখান
      toast.success("Login successful!");

      // 3. Role অনুযায়ী Redirect করুন
      switch (result.data.user.role) { // 'result.user.role' এর বদলে 'result.data.user.role'
        case "SENDER":
          navigate("/dashboard/sender");
          break;
        case "RECEIVER":
          navigate("/dashboard/receiver");
          break;
        case "ADMIN":
          navigate("/dashboard/admin");
          break;
        default:
          navigate("/");
          break;
      }
    } else {
      // যদি success: false আসে বা data না থাকে
      toast.error(result.message || "Login failed due to an unexpected response.");
    }
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const errMsg = (error as any)?.data?.message || "Login failed. Check credentials.";
    toast.error(errMsg);
  }
};

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full max-w-sm mx-auto"
    >
      <div>
        <Input
          placeholder="Email"
          {...form.register("email")}
          disabled={isLoading}
        />
      </div>
      <div>
        <Password {...form.register("password")} />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
