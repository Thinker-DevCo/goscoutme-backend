import { Controller, Post, Get, Put, Delete } from "../../decorators";
import { NextFunction, Request, Response } from "express";
import { ICreateProfileDto, UpdateProfileDto } from "./dto";
import { ProfileUseCase } from "./profile.service";
import { Secure } from "../../decorators/Security.decorator";
import { supabase } from "../../providers/supabase/supabase";
import { BaseError, HttpStatusCode } from "../../providers/errorProvider";

@Controller('/profile', '1')
export class ProfileController {
  @Secure()
  @Post("/create_profile")
  async handleCreateprofile(request: Request<{}, {}, ICreateProfileDto>, response: Response, next: NextFunction) {
    try{
      const accessToken = request.headers.authorization?.split(' ')[1];
      const user= await supabase.auth.getUser(accessToken);
      console.log(user)
      if(!user.data.user) throw new BaseError('FORBIDDEN', HttpStatusCode.FORBIDDEN, false, 'User UnAuthenticated')
      const data = await new ProfileUseCase().executeCreateProfile(request.body)
      return response.json(data);
    }catch(err){
      next(err)
    }

  }

  @Get("")
  async handleReadProfile(request: Request, response: Response) {
    // Handle reading a resource
    return response.json({ message: "Read profile" });
  }

  @Put("/:id")
  async handleUpdateProfile(request: Request<{id: string}, {}, UpdateProfileDto>, response: Response) {
    // Handle updating a resource by ID
    return response.json({ message: "Update profile" });
  }

  @Delete("/:id")
  async handleDeleteProfile(request: Request<{id: string}>, response: Response) {
    // Handle deleting a resource by ID
    return response.json({ message: "Delete profile" });
  }
}
