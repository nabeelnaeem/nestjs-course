import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// Partial type is taking all properties of CreateUserDto and making them optional
// This is useful as there is no repitition of code, DRY principle
export class PatchUserDto extends PartialType(CreateUserDto) {}
