import {test,expect,Locator,Page} from "@playwright/test"
export class Community{
  //Locators
   public communityBlogTitles:Locator 
   public sample:Locator 
    constructor(private page:Page){
      this.communityBlogTitles=this.page.locator(`//div[@id="root"]//following::div[contains(@class,"hmdnzv")]`)
      this.sample=this.page.locator(``)
      this.sample=this.page.locator(``)
    }
}