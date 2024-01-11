import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Res,
  Param,
  Body,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { TUserId } from './types/user.types';
import { CreateUserDto } from './dto/createUser.dto';
import { EditUserDto } from './dto/editUser.dto';

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

    if (!user) {
      throw new NotFoundException();
    }

    return {
      user,
    };
  }

  @Post()
  createOne(@Body('user') data: CreateUserDto) {
    const user = this.usersService.createOne(data);

    if (!user) {
      throw new BadRequestException();
    }

    return {
      user,
    };
  }

  @Delete(':id')
  deleteOne(
    @Res({ passthrough: true }) res: Response,
    @Param('id') id: TUserId,
  ) {
    const isRemoved = this.usersService.deleteOne(id);

    if (!isRemoved) {
      throw new NotFoundException();
    }

    return {
      isRemoved,
    };
  }

  @Patch(':id')
  editOne(@Param('id') id: TUserId, @Body('user') data: EditUserDto) {
    const user = this.usersService.editOne(id, data);

    if (!user) {
      throw new NotFoundException();
    }

    return {
      user,
    };
  }
}
