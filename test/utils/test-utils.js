/**
 * Test utilities for WebdriverIO tests
 */

class TestUtils {
    /**
     * Wait for an element to be clickable and click it
     * @param {WebdriverIO.Element} element - The element to click
     * @param {number} timeout - Timeout in milliseconds
     */
    static async clickWhenReady(element, timeout = 5000) {
        await element.waitForClickable({ timeout });
        await element.click();
    }

    /**
     * Fill an input field with text
     * @param {WebdriverIO.Element} input - The input element
     * @param {string} text - Text to enter
     */
    static async fillInput(input, text) {
        await input.waitForDisplayed();
        await input.clearValue();
        await input.setValue(text);
    }

    /**
     * Wait for page to be fully loaded
     * @param {number} timeout - Timeout in milliseconds
     */
    static async waitForPageLoad(timeout = 10000) {
        await browser.waitUntil(
            async () => {
                const readyState = await browser.execute(() => document.readyState);
                return readyState === 'complete';
            },
            {
                timeout,
                timeoutMsg: 'Page did not load completely'
            }
        );
    }

    /**
     * Take a screenshot with a custom name
     * @param {string} name - Screenshot name
     */
    static async takeScreenshot(name) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        await browser.saveScreenshot(`./test/screenshots/${name}-${timestamp}.png`);
    }

    /**
     * Scroll to element
     * @param {WebdriverIO.Element} element - Element to scroll to
     */
    static async scrollToElement(element) {
        await element.scrollIntoView();
        await browser.pause(500); // Brief pause after scrolling
    }

    /**
     * Wait for loading indicators to disappear
     * @param {string} selector - Loading indicator selector
     * @param {number} timeout - Timeout in milliseconds
     */
    static async waitForLoadingToFinish(selector = '.loading, .spinner, [data-testid="loading"]', timeout = 10000) {
        try {
            const loadingElement = await $(selector);
            await loadingElement.waitForDisplayed({ timeout: 2000, reverse: true });
        } catch (error) {
            // Loading element might not exist, which is fine
        }
    }

    /**
     * Check if element exists without waiting
     * @param {string} selector - Element selector
     * @returns {Promise<boolean>} - True if element exists
     */
    static async elementExists(selector) {
        try {
            const element = await $(selector);
            return await element.isExisting();
        } catch (error) {
            return false;
        }
    }

    /**
     * Get random test data
     * @param {string} type - Type of data ('email', 'name', 'text')
     * @returns {string} - Random test data
     */
    static getRandomTestData(type) {
        const timestamp = Date.now();

        switch (type) {
            case 'email':
                return `test.user.${timestamp}@example.com`;
            case 'name':
                return `Test User ${timestamp}`;
            case 'text':
                return `Test text ${timestamp}`;
            default:
                return `test-${timestamp}`;
        }
    }

    /**
     * Wait for React to finish rendering
     * This is useful when testing React applications
     */
    static async waitForReact() {
        await browser.waitUntil(
            async () => {
                // Wait for React to be available and not rendering
                const reactReady = await browser.execute(() => {
                    if (typeof window.React === 'undefined') {
                        // React might not be globally available, check for typical React indicators
                        return document.querySelector('#root') &&
                            document.querySelector('#root').children.length > 0;
                    }
                    return true;
                });
                return reactReady;
            },
            {
                timeout: 10000,
                timeoutMsg: 'React application did not finish rendering'
            }
        );
    }
}

module.exports = TestUtils;
