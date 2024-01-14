import { Injectable } from '@nestjs/common';
import { TUser, TUserId } from './types/user.types';
import { TCreateUserDto } from './dto/createUser.dto';
import { TEditUserDto } from './dto/editUser.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class UsersService {
  private users: TUser[] = [
    { id: '24826020-59e0-4fad-8217-7eb1eff3dae7', name: 'John' },
    { id: 'e35ac92a-6b66-475d-9b75-b5a274829e5a', name: 'Doe' },
  ];

  getAll(limit: number): TUser[] {
    return this.users.slice(0, limit);
  }

  getOne(id: TUserId): TUser | null {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      return null;
    }

    return user;
  }

  createOne(data: TCreateUserDto): TUser | null {
    if (!data.name) {
      return null;
    }

    const id = randomUUID();
    const user = {
      ...data,
      id,
    };
    this.users.push(user);

    return user;
  }

  deleteOne(id: TUserId): boolean {
    let isRemoved = false;
    this.users = this.users.filter((user) => {
      if (user.id === id) {
        isRemoved = true;

        return false;
      }

      return true;
    });

    return isRemoved;
  }

  editOne(id: TUserId, data: TEditUserDto): TUser | null {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return null;
    }

    this.users[userIndex] = {
      ...this.users[userIndex],
      ...data,
    };

    return this.users[userIndex];
  }
}
