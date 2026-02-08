export interface Country {
    id: number;
    name: string;
    code: string;
}
export interface CountriesState {
  list: Country[];
  loading: boolean;
}