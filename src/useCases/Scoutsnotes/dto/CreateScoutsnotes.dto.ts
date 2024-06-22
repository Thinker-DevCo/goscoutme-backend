import { ScoutNotes } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export type ICreateScoutsnotesDto =Omit<ScoutNotes,'scout_id' | 'athlete_id'>& {
  athlete_id: string
}
