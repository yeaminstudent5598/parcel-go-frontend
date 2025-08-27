// src/features/users/UserList.tsx
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { RootState } from "@/app/store";
import type { IUser } from "@/types/user";

const UserList: React.FC = () => {
  const users = useSelector((state: RootState) => state.users.users);
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto mt-10 space-y-4">
      {users.map((user: IUser) => (
        <Card key={user._id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex justify-between items-center">
            <CardTitle>{user.name}</CardTitle>
            <Button size="sm" onClick={() => navigate(`/users/${user._id}`)}>
              View Details
            </Button>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div><strong>Email:</strong> {user.email}</div>
            <div><strong>Phone:</strong> {user.phoneNumber}</div>
            <div><strong>Role:</strong> {user.role}</div>
            <div><strong>Status:</strong> {user.isBlocked ? "Blocked" : "Active"}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UserList;
