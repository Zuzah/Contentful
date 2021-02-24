# About

Using the Contentful CLI, you can perform data operations such as exporting and importing.

See the following references

1. https://github.com/contentful/contentful-export
2. https://www.contentful.com/developers/docs/tutorials/cli/import-and-export/


# Exporting vs Importing

## 1. Exporting data from Contentful to a json file

Create an <u>export</u> .json file with details of the Contentful environment you are exporting from:

i.e: <b>export</b>-XXX-config.json:

```json
{
    "spaceId": "YOUR-SPACE",
    "environmentId": "YOUR-ENVIRONMENT",
    "managementToken": "YOUR-TOKEN",
    "skipContent": false,
    "maxAllowedLimit": 500
    }   
```
Then, run the following Contentful CLI command:

```bash
contentful space export --config "export-XXX-config.json"
```

Once done, it will output a .json file to your local folder

## 2. Importing data from local .json to Contentful

Create an <u>import</u> .json file with details of the Contentful environment you are importing to:


i.e: <b>import</b>-XXX-config.json:

```json
{
    "spaceId": "YOUR-SPACE",
    "environmentId": "YOUR-ENVIRONMENT",
    "managementToken": "YOUR-MANAGEMENT-TOKEN",
    "contentFile": "YOUR-IMPORT-FILE.json",
    "skipContentModel": false
}
```
Then, run the following Contentful CLI command:

```bash
contentful space import --config import-XXX-config.json
```

