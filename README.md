# js-go-gae-firebase-example

TODO: not yet written

![gopher](https://raw.githubusercontent.com/ashleymcnamara/gophers/master/This_is_Fine_Gopher.png)

## Run Locally

Caution: Not working ritht now becuse `dev_appserver.py` does not support go1.12+ versions.

```bash
dev_appserver.py frontend/app.yaml backend/app.yaml
```

According to the below doc, you can just use `go run`...

see: [Testing and Deploying your Application](https://cloud.google.com/appengine/docs/standard/go/testing-and-deploying-your-app)

## Deploy

```bash
gcloud config set project [Your Project ID]
```

## References

- [Firenotes: Firebase Authentication on Google App Engine](https://github.com/GoogleCloudPlatform/python-docs-samples/tree/master/appengine/standard/firebase/firenotes)
