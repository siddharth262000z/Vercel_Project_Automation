import {test,expect,Locator,Page, BrowserContext} from "@playwright/test"
import { testdata } from "../TestData/testdata"
import { Home } from "../Pages/HomePage"
const BASE_URL=process.env.BASE_URL!

let page:Page
let context:BrowserContext
let homePage_obj:Home

test.beforeAll(async({browser})=>{
    context=await browser.newContext()
    page=await context.newPage()
    homePage_obj=new Home(page)
    await page.goto(BASE_URL)
})
test(`home page and Community Page`,async()=>{

    await test.step(`verify that we are on home page`,async()=>{
        //await page.pause()
        await page.waitForLoadState()
        await expect(homePage_obj.homePageHeader).toContainText(testdata.homePage.headerName)
    })
     await test.step(`verify that we are on community page`,async()=>{
        await homePage_obj.clickCommunityButton()
        let communityText=await homePage_obj.clickOnFirstCommunityBlog()
        await expect(homePage_obj.insidefirstCommunityBlogHeader).toContainText(communityText)  
    })
})

test.afterAll(async()=>{
    await page.close()
})