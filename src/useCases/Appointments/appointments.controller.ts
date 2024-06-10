import { Controller, Post, Get, Put, Delete } from "../../decorators";
import { NextFunction, Request, Response } from "express";
import { CreateAppointmentsDto, UpdateAppointmentsDto } from "./dto";
import { Authenticated } from "../../decorators/Security.decorator";
import { AppointmentsUseCase } from "./appointments.service";

@Controller('/appointments', '1')
export class AppointmentsController {
  @Authenticated()
  @Post("/create")
  async handleCreateappointments(request: Request<{}, {}, CreateAppointmentsDto>, response: Response, next: NextFunction) {
    try{  
      const user = request.user.data.user.id
      const data = await new AppointmentsUseCase().executeCreateAppointments(user, request.body)
      return response.status(201).json(data)
    }catch(err){
      next(err)
    }
  }

  @Authenticated()
  @Get("/get_user_appointments")
  async handleReadAppointments(request: Request, response: Response, next: NextFunction) {
    try{  
      const user = request.user.data.user.id
      const data = await new AppointmentsUseCase().executeReadAppointments(user)
      return response.status(200).json(data)
    }catch(err){
      next(err)
    }
  }

  @Put("/:id")
  async handleUpdateAppointments(request: Request<{id: string}, {}, UpdateAppointmentsDto>, response: Response) {
    // Handle updating a resource by ID
    return response.json({ message: "Update appointments" });
  }

  @Delete("/:id")
  async handleDeleteAppointments(request: Request<{id: string}>, response: Response) {
    // Handle deleting a resource by ID
    return response.json({ message: "Delete appointments" });
  }
}
