import { Controller, Get, Post, Param, Query, Body, Req } from '@nestjs/common';
import type { Request } from 'express';

@Controller('users')
export class UsersController {
  // @Get('{/:id}') if we want to keep it optional
  // This is the newer syntax of making a param optional in nest
  @Get('/:id{/:optional}')
  public getUsers(@Param() params: any, @Query() query: any) {
    console.log(params);
    console.log(query);
    return 'You send a get request to users endpoint';
  }

  @Post()
  // public createUsers(@Body() requestBody: any) {
  // Above is how we grab request body in nest js
  // Below is how we grab request body in express js
  // Only use express version when modifying req is not possible inside nest js
  public createUsers(@Req() request: Request) {
    console.log(request.body);
    return 'You send a post request to users endpoint';
  }
}
