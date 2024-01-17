import NodeCache from "node-cache";
import {Currency, CountryData} from "./types";
const myCache = new NodeCache();

export const getCurrencyRate = async (currency) => {
  const cached = myCache.get(currency);

  if (cached) {
    return cached;
  } else {
    const currencyRates = await fetch(
      `http://data.fixer.io/api/latest?access_key=${process.env.FIXER_API_KEY}`
    );
    const currencyRatesData = await currencyRates.json();
    const rates = currencyRatesData.rates;
    for (const [key, value] of Object.entries(rates)) {
      myCache.set(key, value, 86400);
    }
    return rates[currency];
  }
};

const getCurrencies = async (country: any): Promise<Currency[]> => {
  const currencyKeys = Object.keys(country.currencies);

  const currencies: Currency[] = await Promise.all(
    currencyKeys.map(async (key) => {
      return {
        name: key,
        rate: await getCurrencyRate(key),
      };
    })
  );

  return currencies;
};

export async function getFilteredCountries(countriesData: CountryData[]) {
  const promises = [];

  const filteredCountries = countriesData.map((country) => {
    promises.push(getCurrencies(country));
    return {
      name: country.name.common,
      population: country.population,
      currencies: country.currencies,
    };
  });
  const currencies = await Promise.all(promises);
  filteredCountries.forEach((country, index) => {
    country.currencies = currencies[index];
  });
  return filteredCountries.reverse();
}
