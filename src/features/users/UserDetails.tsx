// src/features/users/UserDetails.tsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { RootState } from "@/app/store";
import type { IUserRegister } from "@/types/user";

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Get user from Redux store
  const user = useSelector((state: RootState) =>
    state.users.users.find((u: IUserRegister) => u._id === id)
  );

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-16 text-center">
        <p className="text-red-500 font-semibold">User not found.</p>
        <Button className="mt-4" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <Card className="p-6">
        <CardHeader>
          <CardTitle>User Details</CardTitle>
          <CardDescription>Information about the user</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <strong>Name:</strong> {user.name}
          </div>
          <div>
            <strong>Email:</strong> {user.email}
          </div>
          <div>
            <strong>Phone:</strong> {user.phoneNumber}
          </div>
          <div>
            <strong>Role:</strong> {user.role}
          </div>
          <div>
            <strong>Status:</strong> {user.isBlocked ? "Blocked" : "Active"}
          </div>
          <div>
            <strong>Created At:</strong> {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-"}
          </div>
        </CardContent>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default UserDetails;
