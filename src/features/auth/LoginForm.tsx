/* eslint-disable @typescript-eslint/no-explicit-any */
// src/features/auth/LoginForm.tsx
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
import type { ILoginResponse, ILoginData } from "@/types/auth";

const loginSchema = z.object({
  email: z.email() ? (z as any).email("Invalid email address") : z.string().email("Invalid email address"),
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

  // Type-guard: দেখে নিই result পুরো response নাকি শুধু data
  const isFullResponse = (r: any): r is ILoginResponse => {
    return !!r && typeof r === "object" && ("statusCode" in r || "success" in r) && "data" in r;
  };

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      const result = await loginUser(data).unwrap();
      console.log("API Response:", result);

      // যদি API ইতোমধ্যে .data-কে সরিয়ে দিয়ে দেয় (i.e. endpoint returns ILoginData),
      // তখন result নিজেই data হবে। নইলে result.data ব্যবহার করবো।
      const payload: ILoginData | null = isFullResponse(result) ? result.data : (result as ILoginData);

      // যদি wrapper দিয়ে আসে এবং success=false হলে রিটার্ন করো
      if (isFullResponse(result) && result.success === false) {
        toast.error(result.message || "Login failed");
        return;
      }

      if (!payload || !payload.user) {
        toast.error("Login failed: invalid server response");
        return;
      }
localStorage.removeItem("parcelgo_tour_completed");
      // Redux এ পাঠানো payload — authSlice পরিবর্তন না করে কাজ করবে (তোমার authSlice expects {user, token, refreshToken})
      dispatch(
        setCredentials({
          user: payload.user,
          token: payload.accessToken,
          refreshToken: payload.refreshToken,
        })
      );

      toast.success("Login successful!");

      // রোল অনুযায়ী রিডায়রেক্ট
      switch (payload.user.role) {
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
      }
    } catch (error) {
      // prettier error handling
      const errMsg =
        (error as any)?.data?.message || (error as any)?.message || "Login failed. Check credentials.";
      toast.error(errMsg);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-sm mx-auto">
      <div>
        <Input placeholder="Email" {...form.register("email")} disabled={isLoading} />
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
