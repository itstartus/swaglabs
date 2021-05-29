import Page from "./page";

class InventoryPage extends Page {
  // get inputUsername () { return $('#user-name') }

  open() {
    return super.open("inventory.html");
  }

  get btnAddToCartList() {
    return $$('[id*="add-to-cart"]');
  }

  get itemDescriptionList() {
    return $$(".inventory_item_desc");
  }

  //this method takes array of elements as a parameter and returns the array of texts that these
  //elements contain

  async getItemTexts(arrayElem) {
    const itemTexts = arrayElem.map(async (elem) => await elem.getText());
    return await Promise.all(itemTexts);
  }

  //this method returns the array of descriptions on the page
  async itemDescriptionListText() {
    return await this.getItemTexts(await this.itemDescriptionList);
  }

  //this method returns the array of Add To Cart button labels
  async btnAddToCartListText() {
    return await this.getItemTexts(await this.btnAddToCartList);
  }
}

export default new InventoryPage();
