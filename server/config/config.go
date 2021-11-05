package config

type Config struct {
	Port       string `validate:"required"`
	CoinCapURI string `validate:"required"`
}

func InitConfig() Config {
	config := Config{
		Port:       "8080",
		CoinCapURI: "https://api.coincap.io/v2/",
	}

	return config
}
