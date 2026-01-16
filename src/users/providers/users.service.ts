import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { GetUsersParamsDto } from '../dtos/get-users-params.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ConfigService } from '@nestjs/config';

/**
 * Service for user domain operations; delegates auth-aware checks to AuthService.
 */
@Injectable() //As soon as we have this decorator, now this class became provider
export class UsersService {
  /**
   * Injects AuthService (forwardRef to break circular dependency) and usersRepository
   */
  constructor(
    // Injecting authService
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    /**
     * Injecting config service
     */
    private readonly configService: ConfigService,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    // Check if users already exists with same email
    const existingUser = await this.usersRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    // Handle exception
    // We will handle exceptions later
    if (existingUser) return 'User email already exists';

    // Create a new User
    // We can do any modification with this newUser before saving it to database
    let newUser = this.usersRepository.create(createUserDto);
    newUser = await this.usersRepository.save(newUser);
    return newUser;
  }

  /**
   * Returns a list of users filtered/paginated by the supplied params; currently stubbed with sample data after an auth check.
   */
  public findAll(
    getUsersParamsDto: GetUsersParamsDto,
    limit: number,
    page: number,
  ) {
    const environment = this.configService.get('S3_BUCKET');
    console.log('environment', environment);

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
  public async findOneById(id: number) {
    return await this.usersRepository.findOneBy({ id });
  }
}
