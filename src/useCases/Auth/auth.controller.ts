import { Controller, Post, Get, Put, Delete } from "../../decorators";
import { NextFunction, Request, Response } from "express";
import { ICreateAuthDto, UpdateAuthDto } from "./dto";
import { AuthUseCase } from "./auth.service";
import { ISignIn } from "./dto/CreateAuth.dto";
import { Token } from "../../decorators/token.decorator";

@Controller('auth', '1')
export class AuthController {
  @Post("sign_up")
  async handleCreateauth(request: Request<{}, {}, ICreateAuthDto>, response: Response, next: NextFunction) {
    try{
      const data = await new AuthUseCase().executeSignUp(request.body)
      return response.json(data);
    }catch(err){
      next(err);
    }
  }

  @Post("sign_in")
  async handleSignIn(request: Request<{}, {}, ISignIn>, response: Response, next: NextFunction) {
    try{
      const data = await new AuthUseCase().executeSignIn(request.body)
      return response.json(data);
    }catch(err){
      next(err);
    }
  }


 

  @Get("/refresh_token")
  async handleRefreshToken(request: Request<{id: string}>, response: Response,next: NextFunction, @Token() token: string) {
    try{
      const data = await new AuthUseCase().executeRefreshToken(token)
      return response.status(200).json(data);
    }catch(err){
      next(err);
    }
  }
}
