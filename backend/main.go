package main

import (
	"context"
	"log"
	"net/http"
	"os"

	firebase "firebase.google.com/go"
	"firebase.google.com/go/auth"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	url := os.Getenv("FRONTEND_URL")

	// see: https://github.com/gin-contrib/cors
	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{url},
		AllowMethods: []string{"GET", "POST"},
		AllowHeaders: []string{"Authorization"},
	}))

	r.GET("/", func(c *gin.Context) {
		ctx := context.Background()
		app, err := firebase.NewApp(ctx, nil)
		if err != nil {
			log.Fatalf("error initializing app: %v\n", err)
		}

		// fetch token from header
		// see: https://stackoverflow.com/questions/39518237/how-to-extract-and-verify-token-sent-from-frontend-in-golang
		const BEARER_SCHEMA = "Bearer "
		authHeader := c.Request.Header.Get("Authorization")
		idToken := authHeader[len(BEARER_SCHEMA):]

		token := verifyIDToken(ctx, app, idToken)
		log.Printf("Verified ID token: %v\n", token)

		// get user info
		// - DisplayName
		// - Email
		// - PhoneNumber
		// - PhotoURL
		// - UID
		// - ProviderID
		user := getUser(ctx, app, token.UID)
		log.Printf("Successfully fetched user data: %v\n", user)

		c.String(http.StatusOK, user.UID)
	})

	r.Run()
}

// see: https://firebase.google.com/docs/auth/admin/verify-id-tokens
func verifyIDToken(ctx context.Context, app *firebase.App, idToken string) *auth.Token {
	client, err := app.Auth(ctx)
	if err != nil {
		log.Fatalf("error getting Auth client: %v\n", err)
	}

	token, err := client.VerifyIDToken(ctx, idToken)
	if err != nil {
		log.Fatalf("error verifying ID token: %v\n", err)
	}

	return token
}

// see: https://firebase.google.com/docs/auth/admin/manage-users
func getUser(ctx context.Context, app *firebase.App, uid string) *auth.UserRecord {

	client, err := app.Auth(ctx)
	if err != nil {
		log.Fatalf("error getting Auth client: %v\n", err)
	}

	user, err := client.GetUser(ctx, uid)
	if err != nil {
		log.Fatalf("error getting user %s: %v\n", uid, err)
	}

	return user
}
