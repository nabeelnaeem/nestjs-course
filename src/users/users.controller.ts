import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Body,
  Req,
  Headers,
  Ip,
  ParseIntPipe,
} from '@nestjs/common';
import type { Request } from 'express';

@Controller('users')
export class UsersController {
  // @Get('{/:id}') if we want to keep it optional
  // This is the newer syntax of making a param optional in nest
  @Get('{/:id}')
  // public getUsers(@Param() params: any, @Query() query: any) {
  // Below we are only extracting id and name
  public getUsers(
    @Param('id', ParseIntPipe) id: number | undefined,
    @Query('name') query: any,
  ) {
    console.log(id);
    console.log('id', typeof id);
    console.log(query);
    console.log('query', typeof query);
    return 'You send a get request to users endpoint';
  }

  @Post()
  // public createUsers(@Body() requestBody: any) {
  // Above is how we grab request body in nest js
  // Below is how we grab request body in express js
  // Only use express version when modifying req is not possible inside nest js
  public createUsers(
    @Req() request: Request,
    @Headers() headers: any,
    @Ip() ip: any,
  ) {
    console.log(request.body);
    console.log(headers);
    console.log(ip);
    return 'You send a post request to users endpoint';
  }
}
