import { Controller, Post, Get, Put, Delete } from "../../decorators";
import { NextFunction, Request, Response } from "express";
import { CreateSportsDto, UpdateSportsDto } from "./dto";
import { SportsUseCase } from "./sports.service";

@Controller('/sports', '1')
export class SportsController {


  @Get("/get_sports_position")
  async handleReadSports(request: Request, response: Response, next: NextFunction) {
    try{
      const {sport_id} = request.query
      const data = await new SportsUseCase().executeReadSportsPositions(Number(sport_id))
      response.status(200).json(data)
    }catch(err){
      next(err)
    }

  }
}
