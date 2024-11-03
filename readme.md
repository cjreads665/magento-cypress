### Magento Apparel Automation Testing using Cypress

Please run the following to set up the project:

1. Clone the repo on your machine
2. run the following command:
```bash
npm i
```
3. run the following to run the tests using Cypress CLI. This will run the tests on Chrome 
```
npm run cy:run
```

4. To run the GUI and see the testing step-by-step live, use the following:
```bash
npm run cy:open
```

If the tests fail, you can view them in "screenshots" directory.

The test cases are written using the cases in https://docs.google.com/spreadsheets/d/1D_KDrAJVAZBpS5BCjUpcsR1JeilCvdfYCLAIFb245o4/edit?usp=sharing 

The following is yet to be completed:
- [] Automation using cron
- [] Cross-browser testing