describe('Price Comparison App - Example Test', () => {
    it('should load the application and verify basic functionality', async () => {
        // Navigate to the home page
        await browser.url('/')

        // Wait for the page to load completely
        await browser.waitUntil(async () => (await browser.execute(() => document.readyState)) === 'complete', {
            timeout: 10000,
            timeoutMsg: 'Page did not load within 10 seconds'
        })

        // Verify the page title is not empty
        const pageTitle = await browser.getTitle()
        expect(pageTitle).not.toBe('')
        console.log(`✓ Page title: "${pageTitle}"`)

        // Verify the main React app container is present and visible
        const appContainer = await $('#root')
        expect(await appContainer.isExisting()).toBe(true)
        expect(await appContainer.isDisplayed()).toBe(true)
        console.log('✓ React app container is visible')

        // Check that the page has some content
        const bodyText = await $('body').getText()
        expect(bodyText.length).toBeGreaterThan(0)
        console.log('✓ Page has content')

        // Test responsive behavior by changing window size to mobile
        await browser.setWindowSize(375, 667)
        await browser.pause(500) // Allow time for responsive changes

        // Verify app still works on mobile viewport
        expect(await appContainer.isDisplayed()).toBe(true)
        console.log('✓ App works on mobile viewport (375x667)')

        // Reset to desktop size
        await browser.setWindowSize(1920, 1080)
        expect(await appContainer.isDisplayed()).toBe(true)
        console.log('✓ App works on desktop viewport (1920x1080)')

        console.log('🎉 All basic functionality tests passed!')
    })
})
