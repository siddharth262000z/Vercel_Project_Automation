import {test,expect,Locator,Page} from "@playwright/test"
export class Community{
  //Locators
   public communityBlogTitles:Locator 
   public disCommunityHeader:Locator 
    constructor(private page:Page){
      this.communityBlogTitles=this.page.locator(`//div[@id="root"]//following::div[contains(@class,"hmdnzv")]`)
      this.disCommunityHeader=this.page.locator(`//sample`)
      
    }
}