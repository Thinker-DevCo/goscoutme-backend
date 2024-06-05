import { UserSexOptions, CountriesOptions, Profiles, UserAthleteProfile, UserScoutProfile } from '@prisma/client';
import { IsDateString, IsEmail, IsEnum, IsMobilePhone, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from 'class-validator';


export type ICreateProfileDto = Profiles & UserAthleteProfile & UserScoutProfile & {
  userType: 'ATHLETE' | 'SCOUT'
}