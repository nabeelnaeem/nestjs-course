import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class PostsService {
  /**
   * Injecting user service
   */
  constructor(private readonly usersService: UsersService) {}

  public findAll(userId: string) {
    //Users service
    //Find a user
    //return posts

    const user = this.usersService.findOneById(userId);

    return [
      {
        user,
        title: 'Test Title 1',
        content: 'Test Content 1',
      },
      {
        user,
        title: 'Test Title 2',
        content: 'Test Content 2',
      },
    ];
  }
}
