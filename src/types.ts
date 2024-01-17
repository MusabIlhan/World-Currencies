type Currency = {
  name: string;
  rate: number;
};

export type Country = {
  name: string;
  population: number;
  currencies: Currency[];
  exchangeRate: number;
};
