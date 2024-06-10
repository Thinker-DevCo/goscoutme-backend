import { Controller, Post, Get, Put, Delete } from "../../decorators";
import { NextFunction, Request, Response } from "express";
import { CreateMediaDto, UpdateMediaDto } from "./dto";
import { Authenticated } from "../../decorators/Security.decorator";
import { MediaUseCase } from "./Media.service";

@Controller('/Media', '1')
export class MediaController {
  @Authenticated()
  @Post("/storeMedia")
  async handleCreateMedia(request: Request<{}, {}, CreateMediaDto>, response: Response, next: NextFunction){
    try{
      const user_id = request.user.data.user.id
      const media = await new MediaUseCase().executeCreateMedia(request.body, user_id)
      return response.status(201).json(media);
    }catch(err){
      next(err)
    }
  }

  @Authenticated()
  @Post("/create_presigned_url")
  async handleCreatePresignedUrl(request: Request, response: Response, next: NextFunction) {
    try{
      const {file_name, file_type} = request.body
      const user_id = request.user.data.user.id
      const presignedUrl = await new MediaUseCase().executeCreatePresignedUser(user_id,file_name, file_type)
      return response.status(201).json({url:presignedUrl});
    }catch(err){
      next(err)
    }
  }

  @Authenticated()
  @Get("/get")
  async handleReadMedia(request: Request, response: Response, next: NextFunction) {
    try{
      const {athlete_id} = request.query
      const presignedUrl = await new MediaUseCase().executeReadMedia(Number(athlete_id))
      return response.status(201).json({url:presignedUrl});
    }catch(err){
      next(err)
    }
  }

  @Put("/:id")
  async handleUpdateMedia(request: Request<{id: string}, {}, UpdateMediaDto>, response: Response) {
    // Handle updating a resource by ID
    return response.json({ message: "Update Media" });
  }

  @Delete("/:id")
  async handleDeleteMedia(request: Request<{id: string}>, response: Response) {
    // Handle deleting a resource by ID
    return response.json({ message: "Delete Media" });
  }
}
