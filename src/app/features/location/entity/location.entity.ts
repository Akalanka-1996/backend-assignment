import {ApiProperty} from '@nestjs/swagger';
import {Location as DbLocation, LocationStatus} from '@prisma/client';
import {IsEnum, IsNotEmpty, IsString} from 'class-validator';

export class Location implements DbLocation {
  id: number;
  @ApiProperty({
    example: 'Title A',
    description: 'The title of the location',
  })
  @IsString()
  @IsNotEmpty()
  title: string;
  @ApiProperty({
    example: 'Address A, Sample City',
    description: 'The address of the location',
  })
  @IsString()
  @IsNotEmpty()
  address: string;
  @ApiProperty({
    example: 'Active',
    description: 'The status of the location',
  })
  @IsEnum(LocationStatus)
  status: LocationStatus;
  createdAt: Date;
  updatedAt: Date;
}
