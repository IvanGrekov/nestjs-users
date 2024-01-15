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
  DefaultValuePipe,
  ParseIntPipe,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { TUserId } from './types/user.types';
import { CreateUserDto } from './dto/createUser.dto';
import { EditUserDto } from './dto/editUser.dto';
import { ObjectValidationPipe } from '../pipes/objectValidation.pipe';
import { AuthGuard } from '../guards/auth.guard';
import { Roles } from '../decorators/roles.decorator';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll(@Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number) {
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
  @Roles(['admin'])
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
