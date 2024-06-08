export interface IFilterAthletesParams {
  sex?: UserSexOptions;
  positions?: string;
  ageMin?: number;
  ageMax?: number;
  status?: AthleteStatusOptions;
  country?: CountriesOptions;
  page: number;
  items?: number;
}