"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilteredCountries = exports.getCurrencyRate = void 0;
const node_cache_1 = __importDefault(require("node-cache"));
const myCache = new node_cache_1.default();
const getCurrencyRate = (currency) => __awaiter(void 0, void 0, void 0, function* () {
    const cached = myCache.get(currency);
    if (cached) {
        return cached;
    }
    else {
        const currencyRates = yield fetch(`http://data.fixer.io/api/latest?access_key=${process.env.FIXER_API_KEY}`);
        const currencyRatesData = yield currencyRates.json();
        const rates = currencyRatesData.rates;
        for (const [key, value] of Object.entries(rates)) {
            myCache.set(key, value, 86400);
        }
        return rates[currency];
    }
});
exports.getCurrencyRate = getCurrencyRate;
const getCurrencies = (country) => __awaiter(void 0, void 0, void 0, function* () {
    const currencyKeys = Object.keys(country.currencies);
    const currencies = yield Promise.all(currencyKeys.map((key) => __awaiter(void 0, void 0, void 0, function* () {
        return {
            name: key,
            rate: yield (0, exports.getCurrencyRate)(key),
        };
    })));
    return currencies;
});
function getFilteredCountries(countriesData) {
    return __awaiter(this, void 0, void 0, function* () {
        const promises = [];
        const filteredCountries = countriesData.map((country) => {
            promises.push(getCurrencies(country));
            return {
                name: country.name.common,
                population: country.population,
                currencies: country.currencies,
            };
        });
        const currencies = yield Promise.all(promises);
        filteredCountries.forEach((country, index) => {
            country.currencies = currencies[index];
        });
        return filteredCountries.reverse();
    });
}
exports.getFilteredCountries = getFilteredCountries;
//# sourceMappingURL=utils.js.map