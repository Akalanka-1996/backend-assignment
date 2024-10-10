import {ApiProperty} from '@nestjs/swagger';
import {Device as DbDevice, DeviceStatus, DeviceType} from '@prisma/client';
import {IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, Matches} from 'class-validator';

export class Device implements DbDevice {
  id: number;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(/^\S*$/, {message: 'serialNumber should not contain spaces'})
  serialNumber: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string | null;
  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  imageUrl: string;
  @ApiProperty()
  @IsEnum(DeviceStatus)
  status: DeviceStatus;
  @ApiProperty()
  @IsEnum(DeviceType)
  type: DeviceType;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  locationId: number;
  createdAt: Date;
  updatedAt: Date;
}
