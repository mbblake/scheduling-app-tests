# scheduling-app-tests

Trying out adding unit tests for my scheduling app using mocha, chai, and sinon

## Getting Started

### Installing

-   Install git
-   Clone the repo: `git clone https://github.com/mbblake/scheduling-app-tests.git`
-   Install Node 18+
-   Install NPM
-   Install dependencies: `npm install`

### Running the app

-   Use `npm run start` to start the application
-   Use `npm run test` to run unit tests against the application
-   Use `npm run test:coverage` to run unit tests for the application while generating reports and code coverage metrics. An HTML report can be viewed with `coverage/index.html`.

## Help

The app allows you to schedule an event, update an event, cancel an event, and then display the scheduled events. This is essentially a copy of my https://github.com/MattBlakeQA/scheduling-app-ts application, except with unit tests added and some slight changes to the application code to help faciliate writing unit tests. The application should behave the same way:

-   Event names must be unique.
-   Event names can be anything BUT blank.
-   Event time must be specified in `hh:mm` format. E.g. `13:30`.
-   All events must occur sequentially. Their time slots can't overlap.
-   The events are scheduled within a single day (i.e. between `00:00 and 23:59`). E.g. `23:00 to 02:00` is not a valid range.

## Known issues

-   Using backspace when prompted for input doesn't behave too well right now. It simply moves the cursor back but doesn't delete the characters.
