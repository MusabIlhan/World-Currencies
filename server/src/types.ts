export type Currency = {
  name: string;
  rate: number;
};

export type CountryData = {
  name: {common: string};
  population: number;
  currencies: Currency[];
};
