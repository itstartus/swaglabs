class Cart {
  async itemPrice(label) {
    return $(
      `//div[@class='cart_item_label'][.//div[@class='inventory_item_name'][text()='${label}']]/div[@class='item_pricebar']/div`
    );
  }
  get items() {
    return $$(".inventory_item_name");
  }
  async getItemTexts(arrayElem) {
    const itemTexts = arrayElem.map(async (elem) => await elem.getText());
    return await Promise.all(itemTexts);
  }
  async itemNameListText() {
    return await this.getItemTexts(await this.items);
  }

  get itemDescriptions() {
    return $$(".inventory_item_desc");
  }

  get btnContinueShopping(){
    return $('#continue-shopping');
  }

  get btnCheckout(){
    return $('#checkout');
  }
}

export default new Cart();
