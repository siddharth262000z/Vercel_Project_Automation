import {test,expect,Page,Locator, BrowserContext} from "@playwright/test"
import { testdata } from "../TestData/testdata"
import { Home } from "../Pages/HomePage"
import { Community } from "../Pages/Community"
import { Create } from "../Pages/CreatePage"
const BASE_URL=process.env.BASE_URL!

let page:Page
let context:BrowserContext
let homePage_obj:Home
let community_obj:Community
let create_obj:Create

test.beforeAll(async({browser})=>{
    context=await browser.newContext()
    page=await context.newPage()
    //Initialize Objects
    homePage_obj=new Home(page)
    community_obj=new Community(page)
    create_obj=new Create(page)
    //Navigate to URL
    await page.goto(BASE_URL)
})

test('Inside community section, go inside any particular blog',async()=>{

    await test.step(`Perform search for a Blog`,async()=>{
         await homePage_obj.clickCommunityButton()
         let found=false
         while(!found){
            const options= community_obj.communityBlogTitles
             const count=await options.count();
             for(let i=0;i<count;i++){
                 const option=await options.nth(i)
                 const text= await option.textContent()
                 if(text?.includes('Trial one')){
                      await option.click();
                      await expect(create_obj.verifyTitle).toContainText(text)
                     await page.waitForTimeout(2000)
                     await page.screenshot({path:'./ss/'+"communitySelection.png",fullPage:true})
                     found=true
                      break;
                 }       
             }
             if(!found){
                 await page.locator(`//button[text()='2']`).click() 
             }
               
                
         }
                     
    })
})

test.afterAll(async()=>{
    await page.close()
})