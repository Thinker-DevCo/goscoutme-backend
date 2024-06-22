import { Controller, Post, Get, Put, Delete } from "../../decorators";
import { NextFunction, Request, Response } from "express";
import { ICreateScoutsnotesDto, UpdateScoutsnotesDto } from "./dto";
import { Authenticated } from "../../decorators/Security.decorator";
import { ScoutsnotesUseCase } from "./scoutsnotes.service";

@Controller('/scoutsnotes', '1')
export class ScoutsnotesController {
  @Authenticated()
  @Post("/create")
  async handleCreatescoutsnotes(request: Request<{}, {}, ICreateScoutsnotesDto>, response: Response, next: NextFunction) {
    try{  
      const user = request.user.data.user.id
      const data = await new ScoutsnotesUseCase().executeCreateScoutsnotes(user, request.body)
      return response.status(201).json(data)
    }catch(err){
      next(err)
    }
  }
  @Authenticated()
  @Get("/get_scout_note")
  async handleReadScoutsnotes(request: Request, response: Response, next: NextFunction) {
    try{  
      const user = request.user.data.user.id
      const { athlete_id } = request.query
      const data = await new ScoutsnotesUseCase().executeReadScoutsnotes(user,String(athlete_id))
      return response.status(200).json(data)
    }catch(err){
      next(err)
    }
  }
  @Authenticated()
  @Get("/get_all_scout_note")
  async handleReadAllScoutsnotes(request: Request, response: Response, next: NextFunction) {
    try{  
      const user = request.user.data.user.id
      const data = await new ScoutsnotesUseCase().executeReadAllScoutsNotes(user)
      return response.status(200).json(data)
    }catch(err){
      next(err)
    }
  }

  @Put("/:id")
  async handleUpdateScoutsnotes(request: Request<{id: string}, {}, UpdateScoutsnotesDto>, response: Response) {
    // Handle updating a resource by ID
    return response.json({ message: "Update scoutsnotes" });
  }

  @Delete("/:id")
  async handleDeleteScoutsnotes(request: Request<{id: string}>, response: Response) {
    // Handle deleting a resource by ID
    return response.json({ message: "Delete scoutsnotes" });
  }
}
