# WebdriverIO End-to-End Testing

This project now includes WebdriverIO for end-to-end testing of the React application.

## Setup

WebdriverIO has been configured with the following structure:

```
test/
├── pageobjects/          # Page Object Model files
│   ├── home.page.js      # Home page object
│   └── products.page.js  # Products page object
└── specs/                # Test specification files
    ├── basic.e2e.js      # Basic application tests
    └── products.e2e.js   # Products page specific tests
```

## Configuration

-   **Browser**: Chrome (with ChromeDriver service)
-   **Test Framework**: Mocha
-   **Base URL**: http://localhost:5173 (Vite dev server)
-   **Test Runner**: Local runner with up to 10 parallel instances

## Available Scripts

### Run all e2e tests

```bash
npm run test:e2e
```

### Run tests in watch mode

```bash
npm run test:e2e:watch
```

### Run tests with dev server (recommended for development)

```bash
npm run test:e2e:dev
```

This command will:

1. Start the Vite dev server
2. Wait for it to be ready at http://localhost:5173
3. Run the WebdriverIO tests
4. Both processes run concurrently

### Run tests in headless mode

```bash
npm run test:e2e:headless
```

## Test Structure

### Page Objects

The tests use the Page Object Model pattern for better maintainability:

-   `HomePage`: Contains methods for interacting with the home page
-   `ProductsPage`: Contains methods for interacting with the products page

### Test Specs

-   `basic.e2e.js`: Tests basic application functionality like page loading, responsiveness
-   `products.e2e.js`: Tests specific to the products page functionality

## Writing New Tests

1. **Create Page Objects**: Add new page objects in `test/pageobjects/` for new pages
2. **Add Test Specs**: Create new test files in `test/specs/` following the naming convention `*.e2e.js`
3. **Use Selectors**: Prefer `data-testid` attributes, fallback to class names or semantic selectors

### Example Test

```javascript
const HomePage = require('../pageobjects/home.page')

describe('My Feature', () => {
    it('should do something', async () => {
        await HomePage.open()
        // Your test logic here
        expect(await HomePage.isLogoDisplayed()).toBe(true)
    })
})
```

## Best Practices

1. **Use Page Objects**: Keep selectors and page interactions in page object files
2. **Wait for Elements**: Always wait for elements to be displayed before interacting
3. **Descriptive Tests**: Write clear, descriptive test names and assertions
4. **Data Attributes**: Add `data-testid` attributes to your React components for reliable element selection
5. **Responsive Testing**: Include tests for different screen sizes when relevant

## Troubleshooting

-   **ChromeDriver Issues**: Make sure Chrome browser is installed
-   **Port Conflicts**: Ensure port 5173 is available for the dev server
-   **Timeout Errors**: Increase timeouts in `wdio.conf.js` if tests are flaky
-   **Element Not Found**: Check selectors in page objects and add appropriate waits

## Configuration Files

-   `wdio.conf.js`: Main WebdriverIO configuration
-   `package.json`: Contains test scripts and dependencies

## Dependencies Added

-   `@wdio/cli`: WebdriverIO command line interface
-   `@wdio/local-runner`: Local test runner
-   `@wdio/mocha-framework`: Mocha test framework integration
-   `@wdio/spec-reporter`: Spec reporter for test output
-   `@wdio/devtools-service`: DevTools service for debugging
-   `wdio-chromedriver-service`: ChromeDriver service
-   `concurrently`: Run multiple commands concurrently
-   `wait-on`: Wait for resources to be available
