import { UserSexOptions, CountriesOptions } from '@prisma/client';
import { IsDateString, IsEmail, IsEnum, IsMobilePhone, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from 'class-validator';


export class ICreateAuthDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  age: number;

  @IsEnum(UserSexOptions)
  sex: UserSexOptions
  
  @IsEnum(CountriesOptions)
  nationality: CountriesOptions;

  @IsEnum(CountriesOptions)
  citzenship: CountriesOptions;

  @IsDateString()
  date: Date;

  @IsOptional()
  @IsPhoneNumber()
  phone?: string

  @IsOptional()
  @IsMobilePhone()
  mobile?: string

  @IsOptional()
  @IsString()
  address?: string
}

export class ISignIn{
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}