export interface IFilterAthletesParams {
  sex?: UserSexOptions;
  ageMin?: number;
  ageMax?: number;
  status?: AthleteStatusOptions;
  country?: CountriesOptions;
  page: number;
  items?: number;
}