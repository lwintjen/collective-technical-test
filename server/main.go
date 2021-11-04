package main

import (
	"net/http"
	"time"

	"collective-technical-test/server/config"

	"github.com/getsentry/sentry-go"

	"github.com/darahayes/go-boom"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/rs/zerolog"
	logger "github.com/rs/zerolog/log"
	"github.com/unrolled/secure"
)

func main() {
	configuration := config.InitConfig()

	// UNIX Time is faster and smaller than most timestamps
	zerolog.TimeFieldFormat = zerolog.TimeFormatUnix

	err := sentry.Init(sentry.ClientOptions{
		Dsn: "https://092fde06087742cabbb40c9be1fde7e9@o1049065.ingest.sentry.io/6030396",
	})
	if err != nil {
		logger.Panic().Err(err).Msg("sentry initialization failed")
	}

	r := chi.NewRouter()
	r.Group(func(r chi.Router) {
		secureMiddleware := secure.New(secure.Options{
			FrameDeny:   true,
			SSLRedirect: false,
		})
		r.Use(middleware.RequestID)
		r.Use(middleware.RealIP)
		r.Use(middleware.Logger)
		r.Use(middleware.Recoverer)
		r.Use(middleware.Timeout(30 * time.Second))
		r.Use(secureMiddleware.Handler)
		r.Use(cors.Handler(cors.Options{
			AllowedOrigins:   []string{"http://localhost:3000"},
			AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
			AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type"},
			ExposedHeaders:   []string{"Link"},
			AllowCredentials: false,
			MaxAge:           300,
		}))

		r.NotFound(func(w http.ResponseWriter, r *http.Request) {
			boom.NotFound(w, "Content not found.")
		})

		r.MethodNotAllowed(func(w http.ResponseWriter, r *http.Request) {
			boom.NotFound(w, "Method not allowed.")
		})

		r.Route("/test", func(r chi.Router) {
			r.Get("/", func(w http.ResponseWriter, r *http.Request) {
				logger.Info().Msg("Testing server cfg")
			})
		})

	})

	logger.Info().Msg("Server listening on port: " + configuration.Port)

	err = http.ListenAndServe(":"+configuration.Port, r)
	if err != nil {
		logger.Panic().Err(err).Msg("An error happen in http server")
	}
}
