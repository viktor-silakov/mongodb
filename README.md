# MongoDB Test Automation Framework

## Install

1. Setup node version 22.13.0, it is preferred to use nvm: [windows](https://github.com/coreybutler/nvm-windows), [mac](https://github.com/nvm-sh/nvm)

```shell
nvm install 22.13.0
```
2. Install [MongoDB community edition](https://www.mongodb.com/docs/manual/administration/install-community/)

3. Install dependencies

```shell
npm install
```

## Run tests

Before running tests, make sure that MongoDB and Syngrisi is running.

To run Syngrisi, use the following command in separate terminal:

```shell
npx sy
```

To run all tests
```shell
npm test
```

To run custom feature
```shell
npx bddgen && npx playwright test ./features/demo/outline.feature 
```

You can also use --grep argument:
```shell
npx bddgen && npx playwright test "./features/demo/demo.feature" --grep "Demo MongoDB Atlas for free" --headed
```

## Report

```shell
npm run report
```

## Extension

To enhance your experience while developing tests, you can install the VS Code extension from [extension](./extension) folder


