import { ICreateProfileDto } from "./CreateProfile.dto";

type CreateProfileDtoPartial = Partial<ICreateProfileDto>
export class UpdateProfileDto implements CreateProfileDtoPartial {}
