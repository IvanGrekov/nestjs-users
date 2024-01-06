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
import { User } from './entities/user.entity';
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
  getOne(
    @Res({ passthrough: true }) res: Response,
    @Param('id') id: User['id'],
  ) {
    const user = this.usersService.getOne(id);

    if (!user) {
      res.status(HttpStatus.NOT_FOUND);
    }

    return {
      user,
    };
  }

  @Post()
  createOne(
    @Res({ passthrough: true }) res: Response,
    @Body('user') data: CreateUserDto,
  ) {
    const user = this.usersService.createOne(data);

    if (!user) {
      res.status(HttpStatus.BAD_REQUEST);
    }

    return {
      user,
    };
  }

  @Delete(':id')
  deleteOne(
    @Res({ passthrough: true }) res: Response,
    @Param('id') id: User['id'],
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
    @Param('id') id: User['id'],
    @Body('user') data: EditUserDto,
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
