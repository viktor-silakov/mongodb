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

To view Allure reports, you need to install Java 17:
```shell
winget install --id Microsoft.OpenJDK.17 -e
```

To generate and open HTML report:
```shell
npm run report
```

To generate and open Allure report:
```shell
npm run report:allure
```

## Extension

To enhance your experience while developing tests, you can install the VS Code extension from [extension](./extension) folder

## Login State Sharing

The framework implements a login state sharing mechanism between tests to optimize performance. Key features:

- Authentication state is stored in `tests/playwright/.auth/user.json`
- The authentication file age is checked when running tests:
  - If the file exists and is less than 8 hours old, stored credentials are used
  - If the file is missing or expired, new authentication is performed
- Implementation can be found in `tests/setup/share-login-info.test.ts`
- Saves browser cookies and storage state

## Additional Commands

### Testing and Authentication

- `npm run test:native` - Runs Playwright tests using the native configuration file (`playwright-native.config.ts`). This is useful when you need to execute tests with specific native settings.

- `npm run clear:auth` - Removes the authentication state stored in the `playwright/.auth` directory. Use this command when you need to reset or clear saved authentication data.

- `npm run sy` - Launches Syngrisi visual testing tool without authentication requirement. The `SYNGRISI_AUTH=false` flag disables authentication for the Syngrisi session.

## Localization Tests

The framework includes tests for verifying application localization functionality. These tests check how the application behaves with different browser languages and localization settings.

### Running Localization Tests

To run localization tests in Chrome with UI:
```shell
npx cross-env TEST_ENV=stage npx playwright test -c playwright-native.config.ts tests/regression/localization/localization-browser-language.test.ts --headed --project=chrome
```

To update visual snapshots for localization tests:
```shell
npx cross-env TEST_ENV=stage npx playwright test -c playwright-native.config.ts tests/regression/localization/localization-browser-language.test.ts --headed --update-snapshots
```

You can use `--workers` parameter to run tests in parallel:
```shell
npx cross-env TEST_ENV=stage npx playwright test -c playwright-native.config.ts tests/regression/localization/localization-browser-language.test.ts --headed --update-snapshots --workers=5
```