# Login and contact page with Angular14

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14

## The Code challenge

 ### Login page
  - email and password ( form validators required )
  - use predefined dummy data to Login
  ```
        {
          email: 'lala@lala.com',
          pass: '1234',
        },
        {
          email: 'me@user.com',
          pass: 'pass',
        }
  ```
  - after login navigate to contacts page (using routing)
### Contacts page
  - create a table with some predefined contacts
  - create methods for adding, editing and removing a contact ( UserModel: firstName, lastName, phoneNumber, email - all fields required)
### Nice to implement using:
  - Modules ( for Login & Contacts - even though it is a small app, modularity is key point in our projects)
  - Form Builders & Validators
  - Dynamic Routes -bootstrap/material theme

## Development server

Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
Run `npm run build:serve` to build the project and serve it on `http://localhost:4200/`.
## Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
