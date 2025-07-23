describe('Price Comparison App - Example Test', () => {
    it('login', async () => {
        // Maximize browser window to full screen
        await browser.maximizeWindow()

        // Navigate to the production login page
        await browser.url('https://price-comparison.site/admin')

        // Wait for 10 seconds
        await browser.pause(10000)

        // Find the username input field using XPath and enter email
        const usernameInput = await $('//input[@name="username"]')
        await usernameInput.waitForDisplayed({ timeout: 10000 })
        await usernameInput.setValue('john@example.com')

        // Find the password input field using XPath and enter password
        const passwordInput = await $('//input[@name="password"]')
        await passwordInput.waitForDisplayed({ timeout: 10000 })
        await passwordInput.setValue('admin123')

        const loginButton = await $('//button[text()="Sign in"]')
        await loginButton.waitForDisplayed({ timeout: 10000 })
        await loginButton.click()

        const H4Title = await $('//h4[text()="Hi, Welcome back 👋"]')
        await H4Title.waitForDisplayed({ timeout: 10000 })
        expect(await H4Title.isDisplayed()).toBe(true)
    })

    it('ui: Shop crawler', async () => {
        // Maximize browser window to full screen
        await browser.maximizeWindow()

        // Navigate to the production login page
        await browser.url('https://price-comparison.site/admin')

        const H4Title = await $('//h4[text()="Hi, Welcome back 👋"]')
        await H4Title.waitForDisplayed({ timeout: 10000 })
        expect(await H4Title.isDisplayed()).toBe(true)

        const shopCrawlerSpan = await $('//span[text()="Shop crawler"]')
        await shopCrawlerSpan.click()

        const shopCrawlerTitle = await $('//h4[text()="Shop Crawlers"]')
    })

    it('ui: Category crawler', async () => {
        // Maximize browser window to full screen
        await browser.maximizeWindow()

        // Navigate to the production login page
        await browser.url('https://price-comparison.site/admin')

        const H4Title = await $('//h4[text()="Hi, Welcome back 👋"]')
        await H4Title.waitForDisplayed({ timeout: 10000 })
        expect(await H4Title.isDisplayed()).toBe(true)

        const shopCrawlerSpan = await $('//span[text()="Category crawler"]')
        await shopCrawlerSpan.click()

        const shopCrawlerTitle = await $('//h4[text()="Category Crawlers"]')
    })

    it('ui: Product crawler', async () => {
        // Maximize browser window to full screen
        await browser.maximizeWindow()

        // Navigate to the production login page
        await browser.url('https://price-comparison.site/admin')

        const H4Title = await $('//h4[text()="Hi, Welcome back 👋"]')
        await H4Title.waitForDisplayed({ timeout: 10000 })
        expect(await H4Title.isDisplayed()).toBe(true)

        const shopCrawlerSpan = await $('//span[text()="Product crawler"]')
        await shopCrawlerSpan.click()

        const shopCrawlerTitle = await $('//h4[text()="Product Crawlers"]')
    })

    it('ui: Search crawler', async () => {
        // Maximize browser window to full screen
        await browser.maximizeWindow()

        // Navigate to the production login page
        await browser.url('https://price-comparison.site/admin')

        const H4Title = await $('//h4[text()="Hi, Welcome back 👋"]')
        await H4Title.waitForDisplayed({ timeout: 10000 })
        expect(await H4Title.isDisplayed()).toBe(true)

        const shopCrawlerSpan = await $('//span[text()="Search product"]')
        await shopCrawlerSpan.click()

        const shopCrawlerTitle = await $('//h4[text()="Search Product"]')
    })

    it('ui: Configurations', async () => {
        // Maximize browser window to full screen
        await browser.maximizeWindow()

        // Navigate to the production login page
        await browser.url('https://price-comparison.site/admin')

        const H4Title = await $('//h4[text()="Hi, Welcome back 👋"]')
        await H4Title.waitForDisplayed({ timeout: 10000 })
        expect(await H4Title.isDisplayed()).toBe(true)

        const shopCrawlerSpan = await $('//span[text()="Configurations"]')
        await shopCrawlerSpan.click()

        const shopCrawlerTitle = await $('//h4[text()="Crawler Configuration"]')
    })

    it('feature: add Shop crawler', async () => {
        // Maximize browser window to full screen
        await browser.maximizeWindow()

        // Navigate to the production login page
        await browser.url('https://price-comparison.site/admin')

        const H4Title = await $('//h4[text()="Hi, Welcome back 👋"]')
        await H4Title.waitForDisplayed({ timeout: 10000 })
        expect(await H4Title.isDisplayed()).toBe(true)

        const shopCrawlerSpan = await $('//span[text()="Shop crawler"]')
        await shopCrawlerSpan.click()

        const shopCrawlerTitle = await $('//h4[text()="Shop Crawlers"]')
        const addShopCrawler = await $('//button[text()="New link"]')
        addShopCrawler.click()

        const inputCrawlerName = await $('//input[@name="crawlerName"]')
        const inputShopLink = await $('//input[@name="shopLink"]')

        await inputCrawlerName.setValue('Test Shop Crawler')
        await inputShopLink.setValue('https://example.com/shop')

        const siteDropdown = await $('//div[@id="ecommerce-select"]')
        await siteDropdown.click()

        const siteOption = await $('//li[text()="Shopee"]')
        await siteOption.click()

        const saveButton = await $('//button[text()="Add link"]')
        await saveButton.click()
    })

    it('ui: add Category crawler', async () => {
        // Maximize browser window to full screen
        await browser.maximizeWindow()

        // Navigate to the production login page
        await browser.url('https://price-comparison.site/admin')

        const H4Title = await $('//h4[text()="Hi, Welcome back 👋"]')
        await H4Title.waitForDisplayed({ timeout: 10000 })
        expect(await H4Title.isDisplayed()).toBe(true)

        const shopCrawlerSpan = await $('//span[text()="Category crawler"]')
        await shopCrawlerSpan.click()

        const shopCrawlerTitle = await $('//h4[text()="Category Crawlers"]')

        const addShopCrawler = await $('//button[text()="New link"]')
        addShopCrawler.click()

        const inputCrawlerName = await $('//input[@name="crawlerName"]')
        const inputShopLink = await $('//input[@name="categoryLink"]')

        await inputCrawlerName.setValue('Test Shop Crawler')
        await inputShopLink.setValue('https://example.com/shop')

        const siteDropdown = await $('//div[@id="ecommerce-select"]')
        await siteDropdown.click()

        const siteOption = await $('//li[text()="Shopee"]')
        await siteOption.click()

        const saveButton = await $('//button[text()="Add link"]')
        await saveButton.click()
    })

    it('ui: Product crawler', async () => {
        // Maximize browser window to full screen
        await browser.maximizeWindow()

        // Navigate to the production login page
        await browser.url('https://price-comparison.site/admin')

        const H4Title = await $('//h4[text()="Hi, Welcome back 👋"]')
        await H4Title.waitForDisplayed({ timeout: 10000 })
        expect(await H4Title.isDisplayed()).toBe(true)

        const shopCrawlerSpan = await $('//span[text()="Product crawler"]')
        await shopCrawlerSpan.click()

        const shopCrawlerTitle = await $('//h4[text()="Product Crawlers"]')

        const addShopCrawler = await $('//button[text()="New link"]')
        addShopCrawler.click()

        const inputCrawlerName = await $('//input[@name="crawlerName"]')
        const inputShopLink = await $('//input[@name="productLink"]')

        await inputCrawlerName.setValue('Test Shop Crawler')
        await inputShopLink.setValue('https://example.com/shop')

        const siteDropdown = await $('//div[@id="ecommerce-select"]')
        await siteDropdown.click()

        const siteOption = await $('//li[text()="Shopee"]')
        await siteOption.click()

        const saveButton = await $('//button[text()="Add link"]')
        await saveButton.click()
    })
})
