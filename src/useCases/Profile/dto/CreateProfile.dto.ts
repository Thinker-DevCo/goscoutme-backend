import { UserSexOptions, CountriesOptions, Profiles, UserAthleteProfile, UserScoutProfile, UserOrganization, UserCareerStatistics } from '@prisma/client';
import { IsDateString, IsEmail, IsEnum, IsMobilePhone, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from 'class-validator';


export type ICreateProfileDto = Profiles & UserAthleteProfile & UserScoutProfile & UserOrganization & UserCareerStatistics &{
  userType: 'ATHLETE' | 'SCOUT'
}