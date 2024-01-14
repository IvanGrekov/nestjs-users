import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Query,
  Param,
  Body,
  NotFoundException,
  BadRequestException,
  ParseUUIDPipe,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { TUserId } from './types/user.types';
import { CreateUserDto } from './dto/createUser.dto';
import { EditUserDto } from './dto/editUser.dto';
import { ObjectValidationPipe } from '../pipes/objectValidation.pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll(@Query('limit') limit: number) {
    const users = this.usersService.getAll(limit);

    return {
      users,
    };
  }

  @Get(':id')
  getOne(
    @Param('id', ParseUUIDPipe)
    id: TUserId,
  ) {
    const user = this.usersService.getOne(id);

    if (!user) {
      throw new NotFoundException();
    }

    return {
      user,
    };
  }

  @Post()
  @UsePipes(ObjectValidationPipe)
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
  deleteOne(@Param('id', ParseUUIDPipe) id: TUserId) {
    const isRemoved = this.usersService.deleteOne(id);

    if (!isRemoved) {
      throw new NotFoundException();
    }

    return {
      isRemoved,
    };
  }

  @Patch(':id')
  editOne(
    @Param('id', ParseUUIDPipe) id: TUserId,
    @Body('user', ObjectValidationPipe) data: EditUserDto,
  ) {
    const user = this.usersService.editOne(id, data);

    if (!user) {
      throw new NotFoundException();
    }

    return {
      user,
    };
  }
}
