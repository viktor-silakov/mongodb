# check
npx cross-env TEST_ENV=stage npx playwright test -c playwright-native.config.ts tests/regression/localization/localization-browser-language.test.ts
# update snapshots
npx cross-env TEST_ENV=stage npx playwright test -c playwright-native.config.ts tests/regression/localization/localization-browser-language.test.ts --update-snapshots
