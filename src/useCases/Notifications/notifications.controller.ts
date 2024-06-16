import { Controller, Post, Get, Put, Delete } from "../../decorators";
import { Request, Response } from "express";
import { CreateNotificationsDto, UpdateNotificationsDto } from "./dto";

@Controller('/notifications', '1')
export class NotificationsController {
  @Post("")
  async handleCreatenotifications(request: Request<{}, {}, CreateNotificationsDto>, response: Response) {
    // Handle creation of a new resource
    return response.json({ message: "Create notifications" });
  }

  @Get("")
  async handleReadNotifications(request: Request, response: Response) {
    // Handle reading a resource
    return response.json({ message: "Read notifications" });
  }

  @Put("/:id")
  async handleUpdateNotifications(request: Request<{id: string}, {}, UpdateNotificationsDto>, response: Response) {
    // Handle updating a resource by ID
    return response.json({ message: "Update notifications" });
  }

  @Delete("/:id")
  async handleDeleteNotifications(request: Request<{id: string}>, response: Response) {
    // Handle deleting a resource by ID
    return response.json({ message: "Delete notifications" });
  }
}