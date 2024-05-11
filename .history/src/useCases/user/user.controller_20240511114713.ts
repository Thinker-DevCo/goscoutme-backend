import { Controller, Post, Get, Put, Delete } from "../../decorators";
import { Request, Response } from "express";

@Controller('/user', '1')
export class userController {
  @Post("")
  async handleCreateuser(request: Request, response: Response) {
    // Handle creation of a new resource
    return response.json({ message: "Create user" });
  }

  @Get("")
  async handleReaduser(request: Request, response: Response) {
    // Handle reading a resource
    return response.json({ message: "Read user" });
  }

  @Put("/:id")
  async handleUpdateuser(request: Request, response: Response) {
    // Handle updating a resource by ID
    return response.json({ message: "Update user" });
  }

  @Delete("/:id")
  async handleDeleteuser(request: Request, response: Response) {
    // Handle deleting a resource by ID
    return response.json({ message: "Delete user" });
  }
}
