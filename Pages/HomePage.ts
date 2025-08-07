import {test,expect,Page,Locator} from "@playwright/test"

export class Home{
//Locators
public homePageHeader:Locator
//community Page
public communityButton:Locator
public firstCommunityBlog:Locator
public insidefirstCommunityBlogHeader:Locator

constructor(private page:Page){
this.homePageHeader=this.page.locator(`//div[@id="root"]//following::div[contains(text(),'Unlock success')]`)
this.communityButton=this.page.locator(`//div[@id="root"]//following::a[@href="/community"]`)
this.firstCommunityBlog=this.page.locator(`(//div[@id="root"]//following::div[contains(@class,"hmdnzv")])[1]`)
this.insidefirstCommunityBlogHeader=this.page.locator(`//h1`)
}

//click community button
async clickCommunityButton(){
    await this.communityButton.click()
}

//click On First Community Blog
async clickOnFirstCommunityBlog(){
    let communityText = await this.firstCommunityBlog.textContent()
    if (!communityText) {
        throw new Error("Failed to get text content from the first community blog");
    }
    await this.firstCommunityBlog.click()
    return communityText?.trim();
}


}