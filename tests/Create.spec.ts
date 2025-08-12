import { test, expect, Page, Locator, BrowserContext } from "@playwright/test"
import { Create } from "../Pages/CreatePage"
import { testdata } from "../TestData/testdata"
import { Home } from "../Pages/HomePage"
import { Community } from "../Pages/Community"
const BASE_URL = process.env.BASE_URL!

let page: Page
let context: BrowserContext
let create_obj: Create
let homePage_obj: Home
let community_obj: Community

test.beforeAll(async ({ browser }) => {
    context = await browser.newContext()
    page = await context.newPage()
    create_obj = new Create(page)
    homePage_obj = new Home(page)
    community_obj = new Community(page)

    await page.goto(BASE_URL)
})

test.only("Go to Create page section", async () => {
    let fullTitle = '';
    await test.step('Go to create post and verify', async () => {
        await page.pause()
        await page.waitForLoadState();
        await create_obj.clickOnCreate()
        await expect(create_obj.submitButton).toBeVisible()
    })

    await test.step(`create a post`, async () => {
        fullTitle = await create_obj.fillTitle(testdata.createPage.titleName)
        await create_obj.fillTextArea()
        await create_obj.attachFileInUploadButton('./Files/sampleImage.png')
        await create_obj.clickOnSubmit()
        await page.waitForLoadState('networkidle')
        await expect(create_obj.verifyTitle).toContainText(fullTitle)
        await page.screenshot({ path: './ss/' + 'create.png', fullPage: true })

    })
    await test.step(`verify title got created in Community page`, async () => {
        await homePage_obj.clickCommunityButton();
        let found = false;
        let currentPage = 1;
        const totalPages = 5;

        while (!found && currentPage <= totalPages) {
            // Re-fetch after navigation
            let options = community_obj.communityBlogTitles;
            await options.first().waitFor(); // ensure page content loaded
            const count = await options.count();
            for (let i = 0; i < count; i++) {
                const option = options.nth(i);
                const text = (await option.textContent())?.trim();
                if (text?.includes(fullTitle)) {
                    await option.click();
                    await expect(create_obj.verifyTitle).toContainText(text);
                    found = true;
                    break;
                }
            }
            if (!found && currentPage < totalPages) {
                currentPage++;
                await page.locator(`//button[text()='${currentPage}']`).click();
                await page.waitForTimeout(1000); // small wait for DOM update
            } else {
                break;
            }
        }
        expect(found, `Post with title "${fullTitle}" was not found`).toBeTruthy();
    });
})

test.afterAll(async () => {
    await page.close()
})