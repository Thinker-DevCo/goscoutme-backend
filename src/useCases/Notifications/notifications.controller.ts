import { Controller, Post, Get, Put, Delete } from "../../decorators";
import { NextFunction, Request, Response } from "express";
import { CreateNotificationsDto, UpdateNotificationsDto } from "./dto";
import { NotificationsUseCase } from "./notifications.service";

@Controller('/notifications', '1')
export class NotificationsController {
  @Post("")
  async handleCreatenotifications(request: Request<{}, {}, CreateNotificationsDto>, response: Response) {
    // Handle creation of a new resource
    return response.json({ message: "Create notifications" });
  }

  @Get("/get_user_notifications")
  async handleReadNotifications(request: Request, response: Response, next: NextFunction) {
    try{
      const {id} = request.query
      const notifications = await new NotificationsUseCase().executeReadNotifications(+id)
      return response.status(200).json(notifications)
    }catch(err){
      next(err)
    }
  }

  @Put("/:id")
  async handleUpdateNotifications(request: Request<{id: string}, {}, UpdateNotificationsDto>, response: Response) {
    try{
      const {id} = request.params;
      await new NotificationsUseCase().executeUpdateNotifications(+id)
      return response.json({message: "updated notifications"})
    }catch(err){

    }

  
  }

  @Delete("/:id")
  async handleDeleteNotifications(request: Request<{id: string}>, response: Response) {
    // Handle deleting a resource by ID
    return response.json({ message: "Delete notifications" });
  }
}
