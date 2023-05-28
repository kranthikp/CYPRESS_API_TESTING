const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseURL: 'https://reqres.in//api/',
    screenshotOnRunFailure: false,
    video: false,
  },
});
