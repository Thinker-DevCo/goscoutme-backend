import { Controller, Post, Get, Put, Delete, Patch } from "../../decorators";
import { NextFunction, Request, Response } from "express";
import { ICreateProfileDto, UpdateProfileDto } from "./dto";
import { ProfileUseCase } from "./profile.service";
import { Authenticated} from "../../decorators/Security.decorator";
import { supabase } from "../../providers/supabase/supabase";
import { BaseError, HttpStatusCode } from "../../providers/errorProvider";
import { AthleteStatusOptions, CountriesOptions, UserSexOptions } from "@prisma/client";


@Controller('/profile', '1')
export class ProfileController {
  @Authenticated()
  @Post("/create_profile")
  async handleCreateprofile(request: Request<{}, {}, ICreateProfileDto>, response: Response, next: NextFunction) {
    try{
      const user_id = request.user.data.user.id
      const data = await new ProfileUseCase().executeCreateProfile(request.body, user_id)
      return response.json(data);
    }catch(err){
      next(err)
    }
  }
  
  @Get("/get_athletes")
  @Authenticated()
  async handleFilterAthletes(request: Request, response: Response, next: NextFunction) {
    try {
      const { sex, ageMin, ageMax, status, country, page, items, position, id, sport } = request.query;
      const data = await new ProfileUseCase().filterAthletes({
        sex: sex as UserSexOptions,
        id: id as string,
        positions: position as string,
        ageMin: parseInt(ageMin as string),
        ageMax: parseInt(ageMax as string),
        status: status as AthleteStatusOptions,
        country: country as CountriesOptions,
        page: parseInt(page as string),
        items: parseInt(items as string),
        sport: parseInt(sport as string)
      });
      return response.json(data);
    } catch (err) {
      next(err);
    }
  }

  @Get("/get_all_athletes")
  @Authenticated()
  async handleReadAthletes(request: Request, response: Response, next: NextFunction) {
    try{
      const { page, items } = request.query;
      const data = await new ProfileUseCase().executeReadAthletes(parseInt(page as string), parseInt(items as string))
      return response.json(data);
    }catch(err) {
      next(err);
    }
  }
  @Get("/get_athlete_by_id")
  @Authenticated()
  async handleReadAthlete(request: Request<{},{}, {}, {id: string}>, response: Response, next: NextFunction) {
    try{
      const {id} = request.query;
      const data = await new ProfileUseCase().executeReadAthlete(id)
      return response.json(data);
    }catch(err) {
      next(err);
    }
  }


  @Patch("/update_profile/")
  @Authenticated()
  async handleUpdateProfile(request: Request<{id: string}, {}, UpdateProfileDto>, response: Response) {
    const user = request.user
    const data = await new ProfileUseCase().executeUpdateProfile(user.data.user.id, request.body )
    return response.json(data);
  }

  @Get("/get_subscription")
  @Authenticated()
  async handleGetSubscription(request: Request<{},{}>, response: Response, next: NextFunction){
    const user = request.user
    const data = await new ProfileUseCase().executeGetSubscription(user.data.user.id)
    return response.json(data);
  }
}
