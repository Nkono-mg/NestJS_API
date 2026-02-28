import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Query,
  Headers,
  ParseIntPipe,
  ValidationPipe,
  DefaultValuePipe,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users') //pour dire à la documention, tout ce qui concerne users est groupé dans Users
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @HttpCode(201)
  @ApiResponse({
    //pour la documentation swagger
    status: 201,
    description: 'User successfully created',
  })
  public createUser(@Body(new ValidationPipe()) dataForm: UserDTO) {
    console.log(typeof dataForm);
    return this.userService.createUser(dataForm);
  }
  @Get('all')
  getAllUser(
    @Query('limit', new DefaultValuePipe(3), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.userService.getAllUser(limit, page);
  }
  @Get([':id', ':id/:optional'])
  getUser(
    @Query('page', ParseIntPipe) page: number,
    @Param('id', ParseIntPipe) id: number,
    @Param('optional') Optional?: string,
  ) {
    return this.userService.getUser(id, page);
  }
}
