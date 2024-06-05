import { CreateUserDto } from "./createUser.dto";

type CreateUserDtoPartial = Partial<CreateUserDto>
export class UpdateUserDto implements CreateUserDtoPartial{
}