## EmployeeRecords

The application is built using React, Redux, Formik, and styled components.

The project is built with three views; a start page, a list view, and a create view. The data consists of a list of `employee` records store in redux.

- Run `npm install`
- Run `npm start`

## Testing

cypress test 

### Running tests

npx cypress open

If you want to run Cypress in headless mode instead, run the following command:

npx cypress run


Added features

- Success message after saving updating
- handling duplication of employee records by email
- added error handling for birthDate for format
