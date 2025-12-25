import { Injectable } from '@nestjs/common';
import { GetUsersParamsDto } from '../dtos/get-users-params.dto';

@Injectable() //As soon as we have this decorator, now this class became provider
export class UsersService {
  public findAll(
    getUsersParamsDto: GetUsersParamsDto,
    limit: number,
    page: number,
  ) {
    return {
      users: [
        {
          firstName: 'John',
          email: 'john@doe.com',
        },
        {
          firstName: 'Alice',
          email: 'alice@doe.com',
        },
      ],
      page,
      limit,
    };
  }
}
