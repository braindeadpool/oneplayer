# oneplayer

## Setting up

[Install npm](https://www.npmjs.com/get-npm)

Install typescript

```bash
npm install -g typescript
```

Now you can build libSAMP which is the backend pure-typescript library that abstracts out multiple media players into a single API.

### libSAMP

```bash
cd libsamp/
npm install
npm run build
cd ../
```

Optionally, if you want to use this local version of libSAMP for building the web-app in the next section, you will have to symlink it as:

```
cd libsamp/
npm link
cd ../web-app-ts
npm link libsamp
cd ../
```

### Web App

To build the web-app, simply run the following after libSAMP is built:

```bash
cd web-app-ts/
npm install
npm start
```
