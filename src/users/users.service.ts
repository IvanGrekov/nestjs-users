import { Injectable } from '@nestjs/common';
import { TUser, TUserId } from './types/user.types';
import { CreateUserDto } from './dto/createUser.dto';
import { EditUserDto } from './dto/editUser.dto';

@Injectable()
export class UsersService {
  private users: TUser[] = [
    { id: '1', name: 'John' },
    { id: '2', name: 'Doe' },
  ];

  getAll(): TUser[] {
    return this.users;
  }

  getOne(id: TUserId): TUser | null {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      return null;
    }

    return user;
  }

  createOne(data: CreateUserDto): TUser | null {
    if (!data.name) {
      return null;
    }

    const id = (this.users.length + 1).toString();
    const user = {
      ...data,
      id,
    };
    this.users.push(user);

    return user;
  }

  deleteOne(id: TUserId): boolean {
    let isRemoved = false;
    this.users.filter((user) => {
      if (user.id === id) {
        isRemoved = true;

        return false;
      }

      return true;
    });

    return isRemoved;
  }

  editOne(id: TUserId, data: EditUserDto): TUser | null {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return null;
    }

    const user = this.users[userIndex];
    this.users[userIndex] = {
      ...user,
      ...data,
    };

    return user;
  }
}
