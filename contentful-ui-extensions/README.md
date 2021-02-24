# About

This section will house sample Contentful UI extensions for free use. As of writing, UI Extensions are being phased out in favour of Contentful's 'App Framework'. However, these should still be able to work

# Setup

Below are instructions for first-time setup. 

- Install the contentful create extension package if not already

    ```bash
    npm install -g create-contentful-extension
    ```

# Creating a Contentful UI Extension

Note: Develelopment of a Contentful UI Extension involves React component development.

## Generate a new Extension

1. Run the npx command with the name of your extension:
```bash
npx @contentful/create-contentful-extension your-extention-name
```

2. Select the appropriate option from command-line interface. The options available include:<br/>
    Type of Field Extension
    - Field
    - Sidebar
    - Page
    - Entry editor
    <br/>

    Type of Field
    - Object
    <br/>

    Programming Language
    - Javascript
    - Typescript

## Locally Run your extension in Contentful
 
 1. Install all the npm dependencies for your extension

    ```bash
    npm install
    ```

2. Connect to your Contentful environment via command-line and run your extension

 A. Login to connect to Contentful account. Paste the management token into the command-line once prompted.

```bash
contentful login
```

![image](/assets/command-line-images/contentful-login-command.png)

<b>B.</b> Access your specific contentful environment via command:

```bash
contentful space environment use --space-id "YOUR-Space" --environment-id "YOUR-Environment" 
```

<b>C. Optional:</b> To save on time, you can manually edit the local .contentfulrc file for faster access:

```json
{
  "managementToken": "XXXXXXXXXX (via Contentful Login)",
  "activeSpaceId": "YOUR-Space",
  "activeEnvironmentId": "YOUR-Environment",
  "host": "api.contentful.com"
}
```
<b>D.</b> Now, locally run your extension against your contentful environment:
   ```bash
   npm run start
   ``` 

<b>E.</b> Examine your extension inside Contentful via (Your Environment/Settings/Extensions)

![image](./assets/contentful-self-hosted-extension.png)


## Deploying extension to Contentful

There are 2 options to deploy

A. <b>Extension is size is LESS THAN 512KB</b>

Run the following command:
```bash
npm run deploy
```

B. <b>Extension is size is GREATER THAN 512KB</b>

There are two steps involved

1. Build your Extension
Run the following command:
```bash
npm run build
```

2. Upload the /build folder to a cloud storage

> i.e /YOUR-Extension/build/*

3. Configure the extension settings to point to your cloud hosted extension
