import {Router} from "express";
import jwt from "jsonwebtoken";
import {getCurrencyRate, getFilteredCountries} from "../utils";

const router = Router();

router.post("/search", async (req, res) => {
  try {
    const sessionToken = req.headers.authorization;
    jwt.verify(sessionToken, process.env.SECRET_KEY);
    const {input} = req.body;

    const countries = await fetch(
      `https://restcountries.com/v3.1/name/${input}?fullText=false`
    );

    const countriesData = await countries.json();

    const filteredCountries = await getFilteredCountries(countriesData);

    res.status(201).json({
      countries: filteredCountries,
      baseCurrency: {
        name: "EUR",
        rate: await getCurrencyRate("EUR"),
      },
      sekCurrency: {
        name: "SEK",
        rate: await getCurrencyRate("SEK"),
      },
    });
  } catch (error) {
    res.status(500).json({error: "Failed", message: error});
  }
});

export default router;
