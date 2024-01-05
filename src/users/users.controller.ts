import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Res,
  HttpStatus,
  Param,
  Body,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { TCreateUser, TUserId, TEditUser } from './dto/user';

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
  getOne(@Res({ passthrough: true }) res: Response, @Param('id') id: TUserId) {
    const user = this.usersService.getOne(id);

    if (!user) {
      res.status(HttpStatus.NOT_FOUND);
    }

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
  deleteOne(
    @Res({ passthrough: true }) res: Response,
    @Param('id') id: TUserId,
  ) {
    const isRemoved = this.usersService.deleteOne(id);

    if (!isRemoved) {
      res.status(HttpStatus.NOT_FOUND);
    }

    return {
      isRemoved,
    };
  }

  @Patch(':id')
  editOne(
    @Res({ passthrough: true }) res: Response,
    @Param('id') id: TUserId,
    @Body('user') data: TEditUser,
  ) {
    const user = this.usersService.editOne(id, data);

    if (!user) {
      res.status(HttpStatus.NOT_FOUND);
    }

    return {
      user,
    };
  }
}
