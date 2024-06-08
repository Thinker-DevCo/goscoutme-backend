export interface IFilterAthletesParams {
  sex?: UserSexOptions;
  positions?: Number[]
  ageMin?: number;
  ageMax?: number;
  status?: AthleteStatusOptions;
  country?: CountriesOptions;
  page: number;
  items?: number;
}