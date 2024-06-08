export interface IFilterAthletesParams {
  sex?: UserSexOptions;
  position?: Number
  ageMin?: number;
  ageMax?: number;
  status?: AthleteStatusOptions;
  country?: CountriesOptions;
  page: number;
  items?: number;
}