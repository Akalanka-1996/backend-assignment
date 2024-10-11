import {ApiProperty} from '@nestjs/swagger';
import {Device as DbDevice, DeviceStatus, DeviceType} from '@prisma/client';
import {IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, Matches} from 'class-validator';

export class Device implements DbDevice {
  id: number;
  @ApiProperty({
    example: 'Device A',
    description: 'The name of the device',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({
    example: 'DEVICE_A',
    description: 'The serial number of the device',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\S*$/, {message: 'serialNumber should not contain spaces'})
  serialNumber: string;
  @ApiProperty({
    example: 'sample description',
    description: 'The description the device',
  })
  @IsString()
  @IsOptional()
  description: string | null;
  @ApiProperty({
    example: 'https://via.placeholder.com/300',
    description: 'The image url the device',
  })
  @IsUrl()
  @IsNotEmpty()
  imageUrl: string;
  @ApiProperty({
    example: 'Active',
    description: 'The status of the device',
  })
  @IsEnum(DeviceStatus)
  status: DeviceStatus;
  @ApiProperty({
    example: 'pos',
    description: 'The type of the device',
  })
  @IsEnum(DeviceType)
  type: DeviceType;
  @ApiProperty({
    example: '1',
    description: 'The location to which the device is added',
  })
  @IsNumber()
  @IsNotEmpty()
  locationId: number;
  createdAt: Date;
  updatedAt: Date;
}
