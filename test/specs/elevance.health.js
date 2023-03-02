const path = require("path");

describe("register and login", () => {
  beforeEach("launch the application", async () => {
    await browser.url("/");
  });
  it("register", async () => {
    await browser.maximizeWindow();
    let element = await $("span=Dismiss");
    if (await element.isExisting()) {
      await element.click();
    } else {
      const account = await $("i=account_circle");
      await account.click();
      await $("#navbarLoginButton").click();
      await $("a=Not yet a customer?").click();
      await $("//input[@id='emailControl']").setValue("test12@gmail.com");
      await $("//input[@id='passwordControl']").setValue("Password#");
      await $("span.mat-slide-toggle-bar").click();
      const elem = await $("span=contains at least one digit");
      await expect(elem).toBeDisplayed();
      const pass = await $("//input[@id='passwordControl']");
      await pass.clearValue();
      await pass.setValue("Password#1");
      const repeat = await $("//input[@id='repeatPasswordControl']");
      await repeat.clearValue();
      await repeat.setValue("Password#1");
      await $(".mat-select-arrow").click();
      await $("span*= Mother's ").click();
      await $("//input[@id='securityAnswerControl']").setValue("Smith");
      await $("#registerButton").click();
    }
  });
  /**
   * Having problem with add product in the cart
   */
  /**
   *  please span=Dismis should comment out for suite lelvel test
   */
  it("login and purchase", async () => {
    await browser.maximizeWindow();
    let element = await $("span=Dismiss");
    if (await element.isExisting()) {
      await element.click();
    } else {
      const account = await $("i=account_circle");
      await account.click();
      await $("#navbarLoginButton").click();
      await $("#email").setValue("test12@gmail.com");
      await $("#password").setValue("Password#1");
      await $("#loginButton").click();
      const listItems = await $$(".ng-star-inserted div.item-name");
      for (let item of listItems) {
        if (item == " Apple Juice (1000ml) ") {
          await $("span= Add to Basket").click();
        }
        if (item == " Apple Pomace ") {
          await $("span*=Add to").click();
        }
      }
    }
  });

  it("Change user password information", async () => {
    await browser.maximizeWindow();
    let element = await $("span=Dismiss");
    if (await element.isExisting()) {
      await element.click();
    } else {
      const account = await $("i=account_circle");
      await account.click();
      await $("#navbarLoginButton").click();
      await $("#email").setValue("test12@gmail.com");
      await $("#password").setValue("Password#1");
      await $("#loginButton").click();
      await $("#navbarAccount").click();
      await $("//body/div[3]/div[2]/div[1]/div[1]/div[1]/button[3]/span[1]").moveTo();
      await $("span=Change Password").click();
      await $("//input[@id='currentPassword']").setValue("Password#1");
      await $("//input[@id='newPassword']").setValue("Password#2");
      await $("//input[@id='newPasswordRepeat']").setValue("Password#2");
      await $("#changeButton").click();
    }
  });
  it("customer feedback", async () => {
    await browser.maximizeWindow();
    let element = await $("span=Dismiss");
    if (await element.isExisting()) {
      await element.click();
    } else {
      const account = await $("i=account_circle");
      await account.click();
      await $("#navbarLoginButton").click();
      await $("#email").setValue("test12@gmail.com");
      await $("#password").setValue("Password#1");
      await $("#loginButton").click();
      await $("//mat-icon[contains(text(),'menu')]").click();
      await $("//span[contains(text(),'Customer Feedback')]").click();
      await $("//mat-slider[@id='rating']").click();
    }
  });
  it("open social media page", async () => {
    await browser.maximizeWindow();
    let element = await $("span=Dismiss");
    if (await element.isExisting()) {
      await element.click();
    } else {
      const account = await $("i=account_circle");
      await account.click();
      await $("#navbarLoginButton").click();
      await $("#email").setValue("test12@gmail.com");
      await $("#password").setValue("Password#1");
      await $("#loginButton").click();
      await $("//mat-icon[contains(text(),'menu')]").click();
      await $("//span[contains(text(),'About Us')]").click();
      const social = await $("svg[data-icon='reddit']");
      await expect(social).toBePresent();
      await social.click();
    }
  });
  it("should upload a pic", async () => {
    const input = $("//input[@id='picture']");
    const submitBtn = $("button=Upload Picture");
    const filePath = path.join(__dirname, "../data/pexels-pixabay-60597.jpg");
    const remoteFilePath = await browser.uploadFile(filePath);
    await browser.maximizeWindow();
    let element = await $("span=Dismiss");
    if (await element.isExisting()) {
      await element.click();
    } else {
      const account = await $("i=account_circle");
      await account.click();
      await $("#navbarLoginButton").click();
      await $("#email").setValue("test12@gmail.com");
      await $("#password").setValue("Password#1");
      await $("#loginButton").click();
      await $("//i[contains(text(),'account_circle')]").click();
      await $("//body/div[3]/div[2]/div[1]/div[1]/div[1]/button[1]/span[1]").click();
      await input.setValue(remoteFilePath);
      await expect(remoteFilePath).toBeDisplayed();
      await submitBtn.click();
    }
  });
});
