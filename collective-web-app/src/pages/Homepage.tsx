import { useState } from "react";
import { Box } from "@mui/material";
import { currencyApi } from "../api/currencyApi";
import LoadingScreen from "../components/LoadingScreen";
import Header from "../components/Header";
import Tabs from "../components/Tabs";
import { CoinCapURIResponse } from "../types/currency";
import { useEffect } from "react";

const Homepage = () => {
  const [coins, setCoins] = useState<CoinCapURIResponse[] | undefined>();

  useEffect(() => {
    (async () => {
      const coins = await currencyApi.fetchCurrencies();
      setCoins(coins);
    })();
  }, []);

  return coins ? (
    <Box sx={{ flexGrow: 1 }}>
      <Header setCoins={setCoins} />
      <Tabs coins={coins} setCoins={setCoins} />
    </Box>
  ) : (
    <LoadingScreen />
  );
};

export default Homepage;
