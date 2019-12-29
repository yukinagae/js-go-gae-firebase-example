build: 
	go build ./...

dev: 
	dev_appserver.py ./app/app.yaml
	
prepare: 
	go mod download

deploy-backend: 
	gcloud app deploy --project $PROJECT_ID --version 1 ./app/app.yaml

# deploy-frontend:
	# TODO: not yet
