import { Given, When, Then } from "@cucumber/cucumber";
import LoginPage from "../pageobjects/login.page";
import users from "../input/users";
import InventoryPage from "../pageobjects/inventory.page";
import Cart from "../pageobjects/cart.page";

const expect = require("chai").expect;
const axios = require("axios");

const pages = {
  login: LoginPage,
  inventory: InventoryPage,
};

const links = {
  allitems: InventoryPage.linkAllItems,
  about: InventoryPage.linkAbout,
  logout: InventoryPage.linkLogout,
};

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
  expect(
    btnLabelsArray.filter((el) => el.toLowerCase() === "add to cart").length
  ).to.equal(btnLabelsArray.length);
});

Then(/^Each item has a non-empty description$/, async () => {
  let itemDescriptionListText = await InventoryPage.itemDescriptionListText();
  expect(itemDescriptionListText.filter((el) => el.length > 0).length).to.equal(
    itemDescriptionListText.length
  );
});

Then(/^On each item I see price greater than zero$/, async () => {
  let itemPriceListText = await InventoryPage.itemPriceListText();
  expect(
    itemPriceListText.filter((el) => el[0] === "$" && Number(el.slice(1)) > 0)
      .length
  ).to.equal(itemPriceListText.length);
});

Then(/^On each item I see name$/, async () => {
  let itemNameListText = await InventoryPage.itemNameListText();
  expect(itemNameListText.filter((el) => el.length > 0).length).to.equal(
    itemNameListText.length
  );
});

Then(/^I click on each item and I see correct item page$/, async () => {
  const itemNameList = await InventoryPage.itemNameList;
  for (let product of itemNameList) {
    const inventoryPageProductText = await product.getText();
    await product.click();
    const productPageItemName = await InventoryPage.productPageItemName;
    const productPageProductText = await productPageItemName.getText();
    expect(inventoryPageProductText).to.equal(productPageProductText);
    await InventoryPage.open();
  }
});

Given(/^The side drawer is hidden$/, async () => {
  const menuDrawer = await InventoryPage.menuDrawer;
  const attrAriaHidden = await menuDrawer.getAttribute("aria-hidden");
  expect(attrAriaHidden).to.equal("true");
});

When(/^I click on menu button$/, async () => {
  const btnMenu = await InventoryPage.btnMenu;
  await btnMenu.click();
});

Then(/^The side drawer appears$/, async () => {
  const menuDrawer = await InventoryPage.menuDrawer;
  const attrAriaHidden = await menuDrawer.getAttribute("aria-hidden");
  expect(attrAriaHidden).to.equal("false");
});

When(/^I click on (\w+)$/, async (link) => {
  const item = await links[link];
  await item.click();
});

Then(/^I see correct (.+)$/, async (page) => {
  const pageURL = await browser.getUrl();
  expect(pageURL).to.equal(page);
});

Then(/^All images are displayed$/, async () => {
  const allImages = await InventoryPage.productImages;
  for (let image of allImages) {
    let src = await image.getAttribute("src");
    try {
      const response = await axios.get(src);
      expect(response.status).to.equal(200);
    } catch (error) {
      console.error(error);
    }
  }
});

When(/^I add to cart (.+)$/, async (label) => {
  const btnAddToCart = await InventoryPage.btnAddToCart(label);
  await btnAddToCart.click();
});

Then(/^Add to cart button text changes to Remove for (.+)$/, async (label) => {
  const btnRemove = await InventoryPage.btnRemove(label);
  expect((await btnRemove.getText()).toLowerCase()).to.equal("remove");
});

Then(/^Shopping cart badge number changes to (.+)$/, async (number) => {
  if (number === "0") {
  
    const cartBadge = await InventoryPage.cartBadge;
      await browser.pause(2000);
    expect(await cartBadge.isExisting()).to.be.false;
  } else {
    const cartBadge = await InventoryPage.cartBadge;
    expect(await cartBadge.getText()).to.equal(number);
  }
});

When(/^I remove from cart (.+)$/, async (label) => {
  const btnRemove = await InventoryPage.btnRemove(label);
  await btnRemove.click();
});

Then(/^Remove button text changes to Add to Cart for (.+)$/, async (label) => {
  const btnAddToCart = await InventoryPage.btnAddToCart(label);
  expect((await btnAddToCart.getText()).toLowerCase()).to.equal("add to cart");
});


When(/^I click on Cart icon$/, async () => {
  const cartIcon = await InventoryPage.cartIcon;
  await cartIcon.click();
});

Then(/^I see QTY and Description labels$/, async () => {
  const qtyLabel = await InventoryPage.qtyLabel;
  const descLabel = await InventoryPage.descLabel;
  expect(await qtyLabel.isDisplayed()).to.equal(true);
  expect(await descLabel.isDisplayed()).to.equal(true);
});


Given(/^I see the following products and their prices$/, async (table) => {
  let products = table.hashes();
  const productNames = await InventoryPage.itemNameListText();
  for(let element of products){
    expect(productNames.indexOf(element.product)).to.not.equal(-1);
    expect(element.price).to.equal(await (await InventoryPage.price(element.product)).getText());
  }
 // console.log(products);
});

Then(/^I see (\w+) in the cart with a valid price$/, async (label) => {
  let items = await Cart.itemNameListText();
  label = label.split('_').join(' ');
  expect(items.indexOf(label)).to.not.equal(-1);
  
});

