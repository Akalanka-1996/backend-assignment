import {ApiProperty} from '@nestjs/swagger';
import {User as DbUser} from '@prisma/client';
import {IsNotEmpty, IsString, Matches, MaxLength, MinLength} from 'class-validator';

export class User implements DbUser {
  id: number;

  @ApiProperty({
    example: 'johndoe@gmail.com',
    description: 'The email of the user',
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2, {message: 'First Name must be at least 2 characters long'})
  @MaxLength(25, {message: 'First Name must be at most 25 characters long'})
  @Matches(/^[A-Za-z\s'-]+$/, {
    message: 'First name must contain only letters, spaces, hyphens, and apostrophes',
  })
  first_name: string;

  @ApiProperty({
    example: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2, {message: 'First Name must be at least 2 characters long'})
  @MaxLength(25, {message: 'First Name must be at most 25 characters long'})
  @Matches(/^[A-Za-z\s'-]+$/, {
    message: 'Last name must contain only letters, spaces, hyphens, and apostrophes',
  })
  last_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(8, {message: 'Password must be at least 8 characters long'})
  @MaxLength(16, {message: 'Password must be at most 16 characters long'})
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,16}$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character from @.#$!%*?&^',
  })
  password: string;

  createdAt: Date;
  updatedAt: Date;
}
