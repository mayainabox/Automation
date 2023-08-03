const {chromium } = require('playwright');
(async()=>{
    const browser  = await chromium.launch({headless:false});
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://asos.com");
    
    await page.fill("id=chrome-search", "shirt");
    await page.press("id=chrome-search", 'Enter');

    try {
        // Wait for the products container to be available on the page
        await page.waitForSelector('.results_eRAdS');

        // Get all the individual product elements (assuming they are represented by <article> tags)
        const productElements = await page.$$('.results_eRAdS article');

        if (productElements.length === 0) {
            console.log('No products found on the page.');
            return;
        }

        // Extract the product IDs from the elements
        const productIDs = [];
        for (const productElement of productElements) {
            const productID = await productElement.evaluate(el => el.id);
            productIDs.push(productID);
        }

        // Generate a random index to select a random product
        const randomIndex = Math.floor(Math.random() * productElements.length);

        // Get the ID of the randomly selected product
        const randomProductID = productIDs[randomIndex];

        // Click on the randomly selected product
        await page.click(`#${randomProductID}`);

        // Wait for the element with class 'C09ug' to be available on the page
        await page.waitForSelector('.C09ug');

        // Get the dropdown element
        const dropdown = await page.$('.C09ug');

        // Click on the dropdown to open the options
        await dropdown.click();

        // Wait for a brief moment for the options to load (you may need to adjust the wait time based on the page)
        await page.waitForTimeout(100);

        // Find all the available size options
        const sizeOptions = await page.$$('div[data-testid^="size-"]');

       
    } catch (error) {
        console.error('Error occurred:', error);
    }

    await page.waitForTimeout(80000);


    await browser.close()
})()