#!/usr/bin/env node

/**
 * WebdriverIO Setup Validation Script
 * Run this script to validate your WebdriverIO setup
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Validating WebdriverIO setup...\n');

// Check if required files exist
const requiredFiles = [
    'wdio.conf.js',
    'package.json'
];

const requiredDirs = [
    'test',
    'test/specs',
    'test/pageobjects',
    'test/utils',
    'test/screenshots'
];

let allGood = true;

// Check directories
console.log('📁 Checking directories:');
requiredDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
        console.log(`✅ ${dir}`);
    } else {
        console.log(`❌ ${dir} - Missing`);
        allGood = false;
    }
});

console.log('\n📄 Checking files:');
// Check files
requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file}`);
    } else {
        console.log(`❌ ${file} - Missing`);
        allGood = false;
    }
});

// Check package.json for WebdriverIO dependencies
console.log('\n📦 Checking dependencies:');
try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const devDeps = packageJson.devDependencies || {};

    const requiredDeps = [
        '@wdio/cli',
        '@wdio/local-runner',
        '@wdio/mocha-framework',
        '@wdio/spec-reporter',
        'wdio-chromedriver-service'
    ];

    requiredDeps.forEach(dep => {
        if (devDeps[dep]) {
            console.log(`✅ ${dep} - v${devDeps[dep]}`);
        } else {
            console.log(`❌ ${dep} - Missing`);
            allGood = false;
        }
    });

    // Check scripts
    console.log('\n🚀 Checking npm scripts:');
    const scripts = packageJson.scripts || {};
    const requiredScripts = ['test:e2e', 'test:e2e:dev'];

    requiredScripts.forEach(script => {
        if (scripts[script]) {
            console.log(`✅ ${script}`);
        } else {
            console.log(`❌ ${script} - Missing`);
            allGood = false;
        }
    });

} catch (error) {
    console.log('❌ Error reading package.json:', error.message);
    allGood = false;
}

console.log('\n' + '='.repeat(50));

if (allGood) {
    console.log('🎉 WebdriverIO setup is complete!');
    console.log('\nNext steps:');
    console.log('1. Create test files in test/specs/ directory');
    console.log('2. Create page objects in test/pageobjects/ directory');
    console.log('3. Start your dev server: npm run dev');
    console.log('4. Run tests: npm run test:e2e:dev');
    console.log('\nFor more information, see E2E_TESTING.md');
} else {
    console.log('❌ WebdriverIO setup has issues.');
    console.log('Please check the missing files/dependencies above.');
    process.exit(1);
}

console.log('\n✨ Happy testing!');
