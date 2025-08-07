import { test, expect, Page, Locator, FrameLocator } from "@playwright/test"

export class Create {
    //Locators
    public createButton: Locator
    public submitButton: Locator
    public titleArea: Locator
    public frame: FrameLocator
    public uploadFileButton:Locator
    public verifyTitle:Locator


    constructor(private page: Page) {
        this.createButton = this.page.locator(`//a[@href="/post"]`)
        this.submitButton = this.page.locator(`//button[@type="submit"]`)
        this.titleArea = this.page.locator(`//input[@type="text" and @name="title"]`)
        this.frame = this.page.frameLocator('//iframe[contains(@id,"tiny-react")]')
        this.uploadFileButton=this.page.locator(`//input[@type="file" and @name="image"]`)
        this.verifyTitle=this.page.locator(`//div[@id="root"]//h1`)

    }

    //click on Create Link
    async clickOnCreate() {
        await this.createButton.click()
    }

    //click on Submit Button
     async clickOnSubmit(){
        await this.submitButton.click()
     }

     //click on upload File button
     async attachFileInUploadButton(path:string){
        await this.uploadFileButton.setInputFiles(path)
     }

    //fill title area
    async fillTitle(sampleTitle: string) {
        const randomText = Array.from({ length: 6 }, () =>
            String.fromCharCode(97 + Math.floor(Math.random() * 26)) // generates a-z
        ).join('');
        const fullTitle = `${sampleTitle} ${randomText}`;
        await this.titleArea.fill(fullTitle);
        return fullTitle;
    }

    //Helper Function to generate Random String
    public generateRandomText(): string {
        return Array.from({ length: 26 }, () =>
            String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');
    }

    //Public method to fill Text Area with random text
    async fillTextArea() {
        const randomText = this.generateRandomText();
        await this.frame.locator('//body[@id="tinymce"]').fill(randomText);
        return randomText; 
    }



}