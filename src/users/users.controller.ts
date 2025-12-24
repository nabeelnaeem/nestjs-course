import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Body,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import type { Request } from 'express';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
  // @Get('{/:id}') if we want to keep it optional
  // This is the newer syntax of making a param optional in nest
  @Get('{/:id}')
  // public getUsers(@Param() params: any, @Query() query: any) {
  // Below we are only extracting id and name
  public getUsers(
    @Param('id', ParseIntPipe) id: number | undefined,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    console.log(id);
    console.log('id', typeof id);
    console.log(limit);
    console.log('limit', typeof limit);
    console.log(page);
    console.log('page', typeof page);
    return 'You send a get request to users endpoint';
  }

  @Post()
  // public createUsers(@Body() requestBody: any) {
  // Above is how we grab request body in nest js
  // Below is how we grab request body in express js
  // Only use express version when modifying req is not possible inside nest js
  // public createUsers(
  //   @Req() request: Request,
  public createUsers(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto instanceof CreateUserDto);
    return 'You send a post request to users endpoint';
  }
}
