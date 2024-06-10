import { UserAppointments } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export type CreateAppointmentsDto = Omit<UserAppointments,'scout_id'>
