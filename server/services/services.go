package services

import (
	"collective-technical-test/server/config"
	"time"

	"encoding/json"
	"net/http"

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

func StartPolling(config config.Config) {
	for {
		go FetchTopRankedCrypto(config.CoinCapURI + "assets?limit=150")
		<-time.After(10 * time.Second)
	}
}

func FetchTopRankedCrypto(coinCapURI string) (CoinCapURIResponse, error) {
	var responseJSON CoinCapURIResponse
	res, err := http.Get(coinCapURI)
	if err != nil {
		logger.Error().Msg("An error occured in FetchTopRankedCrypto")
		return responseJSON, err
	}

	defer res.Body.Close()
	err = json.NewDecoder(res.Body).Decode(&responseJSON)
	if err != nil {
		logger.Error().Msg(err.Error())
		logger.Error().Msg("An error occured in FetchTopRankedCrypto")
		return responseJSON, err
	}
	return responseJSON, err
}
