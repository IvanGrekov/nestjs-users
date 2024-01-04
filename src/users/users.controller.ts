import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Param,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { TCreateUser, TUserId, TEditUser } from './types/user.types';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll() {
    const users = this.usersService.getAll();

    return {
      users,
    };
  }

  @Get(':id')
  getOne(@Param('id') id: TUserId) {
    const user = this.usersService.getOne(id);

    return {
      user,
    };
  }

  @Post()
  createOne(@Body('user') data: TCreateUser) {
    const user = this.usersService.createOne(data);

    return {
      user,
    };
  }

  @Delete(':id')
  deleteOne(@Param('id') id: TUserId) {
    const isRemoved = this.usersService.deleteOne(id);

    return {
      isRemoved,
    };
  }

  @Patch(':id')
  editOne(@Param('id') id: TUserId, @Body('user') data: TEditUser) {
    const user = this.usersService.editOne(id, data);

    return {
      user,
    };
  }
}
