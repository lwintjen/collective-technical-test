package config

type Config struct {
	Port string `validate:"required"`
}

func InitConfig() Config {
	config := Config{
		Port: "8080",
	}

	return config
}
