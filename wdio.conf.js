export const config = {
    //
    // ====================
    // Runner Configuration
    // ====================
    runner: 'local',

    //
    // ==================
    // Specify Test Files
    // ==================
    specs: [
        './test/specs/**/*.js'
    ],
    exclude: [
        // 'path/to/excluded/files'
    ],

    //
    // ============
    // Capabilities
    // ============
    maxInstances: 10,
    capabilities: [{
        browserName: 'MicrosoftEdge',
        'ms:edgeOptions': {
            args: [
                '--disable-web-security',
                '--disable-features=VizDisplayCompositor',
                ...(process.argv.includes('--headless') ? ['--headless', '--no-sandbox', '--disable-dev-shm-usage'] : [])
            ]
        }
    }],

    //
    // ===================
    // Test Configurations
    // ===================
    logLevel: 'info',
    bail: 0,
    baseUrl: 'http://localhost:3039/admin',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    //
    // XPath Configuration
    //
    automationProtocol: 'webdriver',
    locatorStrategy: {
        xpathRoot: '//',
        preferXpath: true
    },

    //
    // Test runner services
    services: [
        'edgedriver',
        ['devtools', {
            // Options for the devtools service
        }]
    ],

    //
    // Framework definition
    framework: 'mocha',

    //
    // The number of times to retry the entire specfile when it fails as a whole
    specFileRetries: 1,

    //
    // Delay in seconds between the spec file retry attempts
    specFileRetriesDelay: 0,

    //
    // Whether or not retried specfiles should be retried immediately or deferred to the end of the queue
    specFileRetriesDeferred: false,

    //
    // Test reporter for stdout.
    reporters: ['spec'],

    //
    // Options to be passed to Mocha.
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

    //
    // =====
    // Hooks
    // =====
    beforeSession: function (config, capabilities, specs) {
        // Will be executed before creating the session
    },
    before: function (capabilities, specs) {
        // Will be executed before executing the test suite
    },
    beforeHook: function (test, context) {
        // Will be executed before every hook within the suite starts
    },
    afterHook: function (test, context, { error, result, duration, passed, retries }) {
        // Will be executed after every hook within the suite ends
    },
    beforeTest: function (test, context) {
        // Will be executed before the test starts
    },
    beforeCommand: function (commandName, args) {
        // Will be executed before every webdriver command
    },
    afterCommand: function (commandName, args, result, error) {
        // Will be executed after every webdriver command
    },
    afterTest: function (test, context, { error, result, duration, passed, retries }) {
        // Will be executed after the test and all after hooks have finished running
    },
    afterSuite: function (suite) {
        // Will be executed after a suite has ended
    },
    after: function (result, capabilities, specs) {
        // Will be executed after all tests have finished running
    },
    afterSession: function (config, capabilities, specs) {
        // Will be executed after ending the session
    }
}
