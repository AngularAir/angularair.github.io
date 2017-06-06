// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
export { AppModule } from '../app/app.module';
export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDNCSRryCj-4FfKK1EYdaUFdN4k7LNDfEY",
    authDomain: "angularair-64789.firebaseapp.com",
    databaseURL: "https://angularair-64789.firebaseio.com",
    projectId: "angularair-64789",
    storageBucket: "angularair-64789.appspot.com",
    messagingSenderId: "1072096352795"
  }
};
