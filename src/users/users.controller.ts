import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Body,
  ParseIntPipe,
  DefaultValuePipe,
  Patch,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamsDto } from './dtos/get-users-params.dto';
import { PatchUserDto } from './dtos/ptach-user.dto';
import { UsersService } from './providers/users.service';

@Controller('users')
export class UsersController {
  // Injecting user service
  constructor(private readonly usersService: UsersService) {}
  // @Get('{/:id}') if we want to keep it optional
  // This is the newer syntax of making a param optional in nest
  @Get('{/:id}')
  // public getUsers(@Param() params: any, @Query() query: any) {
  // Below we are only extracting id and name
  public getUsers(
    @Param() getUsersParamsDto: GetUsersParamsDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.usersService.findAll(getUsersParamsDto, limit, page);
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

  @Patch()
  public patchUser(@Body() patchUserDto: PatchUserDto) {
    console.log(patchUserDto instanceof PatchUserDto);
    console.log(patchUserDto);
    return 'You send a patch request to users endpoint';
  }
}
