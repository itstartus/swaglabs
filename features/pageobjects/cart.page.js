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

  async btnAddToCart(label) {
    const name = 'add-to-cart-' + label.split(' ').map(el => el.toLowerCase()).join('-');
    return await $(`[name = "${name}"]`);
  }

  async btnRemove(label) {
    if (label){
      const name = 'remove-' + label.split(' ').map(el => el.toLowerCase()).join('-');
      return await $(`[name = "${name}"]`);
    }

    else {
      return await $$(`//button[text() = "Remove"]`);
    }
   
  }

  get cartQuantity(){
    return $$('.cart_quantity');
  }

  get qtyLabel(){
    return $(".cart_quantity_label");
  }

  get descLabel(){
    return $(".cart_desc_label");
  }

}

export default new Cart();
