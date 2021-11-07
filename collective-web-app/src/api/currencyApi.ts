import axios from "axios";
import { CoinCapURIResponse } from "../types/currency";
import { apiConfig } from "../utils/config";

const { baseApiUri } = apiConfig;

class CurrencyApi {
  async fetchCurrencies(): Promise<CoinCapURIResponse[]> {
    const res = await axios.get(`${baseApiUri}/fetch-cryptos`);

    return Promise.resolve(res.data);
  }

  async searchCurrencies(filter: string): Promise<CoinCapURIResponse[]> {
    const res = await axios.get(`${baseApiUri}/search?name=${filter}`);

    return Promise.resolve(res.data);
  }
}

export const currencyApi = new CurrencyApi();
