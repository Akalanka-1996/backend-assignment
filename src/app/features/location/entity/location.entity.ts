import {ApiProperty} from '@nestjs/swagger';
import {Location as DbLocation} from '@prisma/client';
import {IsEnum, IsNotEmpty, IsString} from 'class-validator';
import {LocationStatus} from '@features/location/model/location-constants';

export class Location implements DbLocation {
  id: number;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;
  @ApiProperty()
  @IsEnum(LocationStatus)
  status: LocationStatus;
  createdAt: Date;
  updatedAt: Date;
}
