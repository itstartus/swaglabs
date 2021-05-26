import { Given, When, Then } from '@cucumber/cucumber';
import LoginPage from '../pageobjects/login.page';
import users from '../input/users';

const expect = require('chai').expect;

const pages = {
    login: LoginPage
}

Given(/^I am on the (\w+) page$/, async (page) => {
    await pages[page].open()
});

When(/^I login with (\w+) and (.+)$/, async (username, password) => {
    await LoginPage.login(username, password)
});

When(/^I login as (\w+\_*)$/, async (user) => {
    await LoginPage.login(users[user].login, users[user].password);
});

Then(/^My page\'s URL equals (.*)$/, async (URL) => {
    await expect(await browser.getUrl()).to.equal(URL);
});

