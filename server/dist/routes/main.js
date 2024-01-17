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
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const utils_1 = require("../utils");
const router = (0, express_1.Router)();
router.post("/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sessionToken = req.headers.authorization;
        jsonwebtoken_1.default.verify(sessionToken, process.env.SECRET_KEY);
        const { input } = req.body;
        const countries = yield fetch(`https://restcountries.com/v3.1/name/${input}?fullText=false`);
        const countriesData = yield countries.json();
        const filteredCountries = yield (0, utils_1.getFilteredCountries)(countriesData);
        res.status(201).json({
            countries: filteredCountries,
            baseCurrency: {
                name: "EUR",
                rate: yield (0, utils_1.getCurrencyRate)("EUR"),
            },
            sekCurrency: {
                name: "SEK",
                rate: yield (0, utils_1.getCurrencyRate)("SEK"),
            },
        });
    }
    catch (error) {
        res.status(500).json({ error: "Failed", message: error });
    }
}));
exports.default = router;
//# sourceMappingURL=main.js.map