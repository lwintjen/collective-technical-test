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
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchTopRankedCrypto = exports.startPolling = void 0;
const axios = require('axios');
function startPolling(cache, config) {
    fetchTopRankedCrypto(cache, config.coinCapURI + "assets?limit=150");
}
exports.startPolling = startPolling;
;
function fetchTopRankedCrypto(cache, coinCapURI) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield axios.get(coinCapURI);
            if ((_a = res.data) === null || _a === void 0 ? void 0 : _a.data)
                cache.set("cryptoCurrencies", res.data.data);
        }
        catch (e) {
            console.error(e);
        }
    });
}
exports.fetchTopRankedCrypto = fetchTopRankedCrypto;
;
