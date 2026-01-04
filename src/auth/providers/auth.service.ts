import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class AuthService {
  constructor(
    // Injecting UserService
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}
  public login(email: string, password: string, id: string) {
    // Check user exists in database
    const user = this.userService.findOneById(1234);
    // login --assume successful login
    // generate token
    return 'SAMPLE_TOKEN';
  }
  public isAuth() {
    return true;
  }
}
