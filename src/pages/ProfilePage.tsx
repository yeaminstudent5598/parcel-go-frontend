// src/pages/ProfilePage.tsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import type { RootState } from "@/app/store";
import { useResetPasswordMutation, useUpdateProfileMutation } from "@/api/authApi";
import { logout } from "@/features/auth/authSlice";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, LogOut } from "lucide-react";

// Zod schema for password change form
const passwordSchema = z
  .object({
    oldPassword: z.string().min(6, "Old password is required."),
    newPassword: z.string().min(6, "New password must be at least 6 characters."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type PasswordFormData = z.infer<typeof passwordSchema>;

const ProfilePage: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [updateProfile, { isLoading: updatingProfile }] = useUpdateProfileMutation();
  const [resetPassword, { isLoading: changingPassword }] = useResetPasswordMutation();

  const [editMode, setEditMode] = useState(false);

  const profileForm = useForm({
    defaultValues: {
      name: user?.name || "",
      phoneNumber: user?.phoneNumber || "",
    },
  });

  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { oldPassword: "", newPassword: "", confirmPassword: "" },
  });

  if (!user) {
    return <div className="p-6 text-center">Loading profile...</div>;
  }

  const handleProfileUpdate = async (data: { name: string; phoneNumber: string }) => {
    try {
      await updateProfile(data).unwrap();
      toast.success("Profile updated successfully!");
      setEditMode(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update profile.");
    }
  };

  const handlePasswordChange = async (data: PasswordFormData) => {
    try {
      await resetPassword({ oldPassword: data.oldPassword, newPassword: data.newPassword }).unwrap();
      toast.success("Password changed successfully!");
      passwordForm.reset();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to change password.");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen p-4 md:p-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: User Info */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg">
              <CardHeader className="items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} />
                  <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-2xl">{user.name}</CardTitle>
                <CardDescription className="capitalize">{user.role.toLowerCase()}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-slate-500" />
                  <span className="text-slate-700 dark:text-slate-300">{user.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-slate-500" />
                  {editMode ? (
                    <Form {...profileForm}>
                      <form
                        onSubmit={profileForm.handleSubmit(handleProfileUpdate)}
                        className="flex gap-2 items-center"
                      >
                        <FormField
                          control={profileForm.control}
                          name="phoneNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" size="sm" disabled={updatingProfile}>
                          Save
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          onClick={() => setEditMode(false)}
                        >
                          Cancel
                        </Button>
                      </form>
                    </Form>
                  ) : (
                    <>
                      <span className="text-slate-700 dark:text-slate-300">{user.phoneNumber}</span>
                      <Button size="sm" variant="outline" onClick={() => setEditMode(true)}>
                        Edit
                      </Button>
                    </>
                  )}
                </div>
                <Button
                  variant="destructive"
                  className="w-full mt-2 flex items-center justify-center gap-2"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" /> Logout
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Password Change */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your password here. Make sure it's a strong one.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...passwordForm}>
                  <form
                    onSubmit={passwordForm.handleSubmit(handlePasswordChange)}
                    className="space-y-4"
                  >
                    <FormField
                      control={passwordForm.control}
                      name="oldPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Old Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={passwordForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={passwordForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm New Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={changingPassword} className="w-full">
                      {changingPassword ? "Updating..." : "Update Password"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
