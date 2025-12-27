import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { GetUsersParamsDto } from '../dtos/get-users-params.dto';
import { AuthService } from 'src/auth/providers/auth.service';

/**
 * Service for user domain operations; delegates auth-aware checks to AuthService.
 */
@Injectable() //As soon as we have this decorator, now this class became provider
export class UsersService {
  /**
   * Injects AuthService (forwardRef to break circular dependency).
   */
  constructor(
    // Injecting authService
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  /**
   * Returns a list of users filtered/paginated by the supplied params; currently stubbed with sample data after an auth check.
   */
  public findAll(
    getUsersParamsDto: GetUsersParamsDto,
    limit: number,
    page: number,
  ) {
    const isAuth = this.authService.isAuth();
    console.log(isAuth);
    return [
      {
        firstName: 'John',
        email: 'john@doe.com',
      },
      {
        firstName: 'Alice',
        email: 'alice@doe.com',
      },
    ];
  }

  /**
   * Retrieves a single user by ID; currently returns a static stub.
   */
  public findOneById(id: string) {
    return {
      id,
      firstName: 'John',
      email: 'john@doe.com',
    };
  }
}
