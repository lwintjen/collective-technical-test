import express from "express";
import { initConfig } from "./config/config";
import { startPolling } from "./services/services";
const NodeCache = require("node-cache");
const app = express();

const cfg = initConfig();

const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

// fetch crypto-currencies every 10s
setInterval(startPolling, 10000, cache, cfg);

app.get("/fetch-cryptos", (req, res) => {
    const cachedCryptos = cache.get("cryptoCurrencies");
    // send a 200 even if there isn't anything in cache, we send an empty object 
    res.send(cachedCryptos);
});

app.get("/search", (req, res) => {
    const cachedCryptos = cache.get("cryptoCurrencies");
    const filters = req.query;
    let filteredCryptos;
    if (cachedCryptos) {
        filteredCryptos = cachedCryptos.filter(crypto => {
            let isValid = true;
            for (const key in req.query) {
                isValid = isValid && crypto[key].toLowerCase() === filters[key]?.toString().toLowerCase();
            };
            return isValid;
        });
    }
    res.send(filteredCryptos);
});

app.listen(cfg.port, () => console.log(`⚡Server is running here 👉 https://localhost:${cfg.port}`));