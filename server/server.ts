import express from "express";
import { initConfig } from "./config/config";
import { startPolling, fetchTopRankedCrypto } from "./services/services";
const NodeCache = require('node-cache');
const app = express();


// //parse application/json and look for raw text
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.text());
// app.use(bodyParser.json({ type: 'application/json' }));

const cfg = initConfig();

const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

// fetch crypto-currencies every 10s
setInterval(startPolling, 10000, cache, cfg);

app.get('/', (req, res) => {
    res.send('Welcome to the server dedicated to Collective technical test web-app');
});

app.get("/api/fetch-cryptos", async (req, res) => {
    let cachedCryptos = cache.get("cryptoCurrencies");
    if (!cachedCryptos) {
        await fetchTopRankedCrypto(cache, cfg.coinCapURI + "assets?limit=150");
        cachedCryptos = cache.get("cryptoCurrencies");
        console.log(cachedCryptos);
    }
    // send a 200 even if there isn't anything in cache, we send an empty object 
    res.send(cachedCryptos);
});

app.get("/api/search", (req, res) => {
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