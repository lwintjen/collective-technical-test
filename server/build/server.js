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
const express_1 = __importDefault(require("express"));
const config_1 = require("./config/config");
const services_1 = require("./services/services");
const NodeCache = require("node-cache");
const app = (0, express_1.default)();
// //parse application/json and look for raw text
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.text());
// app.use(bodyParser.json({ type: 'application/json' }));
const cfg = (0, config_1.initConfig)();
const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });
// fetch crypto-currencies every 10s
setInterval(services_1.startPolling, 10000, cache, cfg);
app.get("/api/fetch-cryptos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cachedCryptos = cache.get("cryptoCurrencies");
    if (!cachedCryptos) {
        yield (0, services_1.fetchTopRankedCrypto)(cache, cfg.coinCapURI + "assets?limit=150");
        cachedCryptos = cache.get("cryptoCurrencies");
        console.log(cachedCryptos);
    }
    // send a 200 even if there isn't anything in cache, we send an empty object 
    res.send(cachedCryptos);
}));
app.get("/api/search", (req, res) => {
    const cachedCryptos = cache.get("cryptoCurrencies");
    const filters = req.query;
    let filteredCryptos;
    if (cachedCryptos) {
        filteredCryptos = cachedCryptos.filter(crypto => {
            var _a;
            let isValid = true;
            for (const key in req.query) {
                isValid = isValid && crypto[key].toLowerCase() === ((_a = filters[key]) === null || _a === void 0 ? void 0 : _a.toString().toLowerCase());
            }
            ;
            return isValid;
        });
    }
    res.send(filteredCryptos);
});
app.listen(cfg.port, () => console.log(`⚡Server is running here 👉 https://localhost:${cfg.port}`));
