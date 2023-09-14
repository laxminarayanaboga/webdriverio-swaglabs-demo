# webdriverio-swaglabs-demo

This is a demo project for UI test automation. 

- Test Application - https://the-internet.herokuapp.com/login

## TechStack
- WebDriverIO v8
- Cucumber BDD style
- JavaScript
- NodeJs
- Cucumber Reports

## How to run locally
- Run `npm run wdio-e2 run test/configs/wdio.e2.conf.js --cucumberOpts.tagExpression=not @skip and not @defect and @regression`
- Reports - Refer to `reports/cucumber-html/index.html`

## Environments
- e1
- e2
- e3