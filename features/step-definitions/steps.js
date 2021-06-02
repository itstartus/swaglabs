import { Given, When, Then } from '@cucumber/cucumber';
import LoginPage from '../pageobjects/login.page';
import users from '../input/users';
import InventoryPage from '../pageobjects/inventory.page';

const expect = require('chai').expect;

const pages = {
    login: LoginPage,
    inventory: InventoryPage
}
        // I am on the login page
        // I am on the inventory page
Given(/^I am on the (\w+) page$/, async (page) => {
    await pages[page].open();
});

When(/^I login with (\w+) and (.+)$/, async (username, password) => {
    await LoginPage.login(username, password);
});

When(/^I login as (\w+\_*)$/, async (user) => {
    await LoginPage.login(users[user].login, users[user].password);
});

Then(/^My page\'s URL equals (.*)$/, async (URL) => {
    expect(await browser.getUrl()).to.equal(URL);
});

Then(/^On each button I see the label (.*)$/, async (label) => {
  let btnLabelsArray = await InventoryPage.btnAddToCartListText();
  expect(btnLabelsArray.filter(el => el.toLowerCase() === 'add to cart').length).to.equal(btnLabelsArray.length);
});

Then(/^Each item has a non-empty description$/, async () => {
    let itemDescriptionListText = await InventoryPage.itemDescriptionListText();
    expect(itemDescriptionListText.filter(el => el.length > 0).length).to.equal(itemDescriptionListText.length);
});

Then(/^On each item I see price greater than zero$/, async () => {
    let itemPriceListText = await InventoryPage.itemPriceListText();
    expect(itemPriceListText.filter(el => el[0] === '$' && Number(el.slice(1)) > 0).length).to.equal(itemPriceListText.length);
});

Then(/^On each item I see name$/, async () => {
    let itemNameListText = await InventoryPage.itemNameListText();
    expect(itemNameListText.filter(el => el.length > 0).length).to.equal(itemNameListText.length);
});




