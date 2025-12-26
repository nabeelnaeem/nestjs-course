import { Controller } from '@nestjs/common';
import { AuthService } from './providers/auth.service';

@Controller('auth')
export class AuthController {
  /**
   * Injecting auth service
   */
  constructor(private readonly authService: AuthService) {}
}
