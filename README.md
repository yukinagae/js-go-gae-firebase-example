# js-go-gae-firebase-example

Example implementation of js(frontend) + firebase(auth) + go/GAE(backend)

![gopher](https://raw.githubusercontent.com/ashleymcnamara/gophers/master/This_is_Fine_Gopher.png)

## Pre-setupg

### Firebase Setting Checklist

- Authentication
  - Sign-in method
    - Enable Providers: Google, Facebook, Twitter, GitHub etc
  - Authorised domains
    - Add domain: [Your GAE domain such as [Your PROJECT ID].appspot.com]
- Database
  - Create a database
    - URL: https://[Your PROJECT ID].firebaseio.com
- Storage
  - Create a storage: [such as gs://[Your PROJECT ID].appspot.com]

### Configure backend/app.yaml

- FRONTEND_URL: https://[Your PROJECT ID].appspot.com

### Configure frontend/main.js

- backendHostUrl: https://backend-dot-[Your PROJECT ID].appspot.com
- apiKey: Firebase -> [Settings] -> [General] -> [Web API key]
- authDomain: [Your PROJECT ID].firebaseapp.com
- databaseURL: https://[Your PROJECT ID].firebaseio.com
- projectId: [Your PROJECT ID]
- storageBucket: gs://[Your PROJECT ID].appspot.com
- messagingSenderId: Firebase -> [Settings] -> [Cloud Messaging] -> [Sender ID]

## (Not working) Run Locally

Caution: Not working ritht now becuse `dev_appserver.py` does not support go1.12+ versions.

```bash
dev_appserver.py frontend/app.yaml backend/app.yaml
```

According to the below doc, you can just use `go run`...

see: [Testing and Deploying your Application](https://cloud.google.com/appengine/docs/standard/go/testing-and-deploying-your-app)

## Deploy

```bash
gcloud config set project [Your Project ID]
make deploy
```

## References

- [Authenticating Users on App Engine Using Firebase](https://cloud.google.com/appengine/docs/standard/python/authenticating-users-firebase-appengine)
- [Firenotes: Firebase Authentication on Google App Engine](https://github.com/GoogleCloudPlatform/python-docs-samples/tree/master/appengine/standard/firebase/firenotes)
