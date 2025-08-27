import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { IUserRegister } from '@/types/user';

interface UserTableProps {
  users: IUserRegister[];
  onBlock: (id: string, isBlocked: boolean) => void;
}

export const UserTable: React.FC<UserTableProps> = ({ users, onBlock }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user._id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>
              {user.isBlocked ? <Badge variant="destructive">Blocked</Badge> : <Badge>Active</Badge>}
            </TableCell>
            <TableCell>
              <Button
                variant={user.isBlocked ? "secondary" : "destructive"}
                size="sm"
                onClick={() => onBlock(user._id, !user.isBlocked)}
              >
                {user.isBlocked ? 'Unblock' : 'Block'}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};