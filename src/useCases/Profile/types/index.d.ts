export interface IFilterAthletesParams {
  sex?: UserSexOptions;
  position?: String
  ageMin?: number;
  ageMax?: number;
  status?: AthleteStatusOptions;
  country?: CountriesOptions;
  page: number;
  items?: number;
}