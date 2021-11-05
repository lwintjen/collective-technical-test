package services

import (
	"collective-technical-test/server/config"
	"time"

	"encoding/json"
	"net/http"

	"github.com/patrickmn/go-cache"
	logger "github.com/rs/zerolog/log"
)

type CoinCapURIResponseFields struct {
	id                string
	rank              string
	symbol            string
	name              string
	supply            string
	maxSupply         string
	marketCapUsd      string
	volumeUsd24Hr     string
	priceUsd          string
	changePercent24Hr string
	vwap24Hr          string
	explorer          string
}

type CoinCapURIResponse struct {
	Data []CoinCapURIResponseFields
}

func StartPolling(c cache.Cache, config config.Config) {
	for {
		FetchTopRankedCrypto(c, config.CoinCapURI+"assets?limit=150")
		<-time.After(10 * time.Second)
	}
}

func FetchTopRankedCrypto(c cache.Cache, coinCapURI string) {
	var responseJSON CoinCapURIResponse
	res, err := http.Get(coinCapURI)
	if err != nil {
		logger.Error().Msg("An error occured in FetchTopRankedCrypto")
		return
	}

	defer res.Body.Close()
	err = json.NewDecoder(res.Body).Decode(&responseJSON)
	if err != nil {
		logger.Error().Msg(err.Error())
		logger.Error().Msg("An error occured in FetchTopRankedCrypto")
		return
	}
	c.Set("TopCryptos", &responseJSON, cache.DefaultExpiration)
}
