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

  get itemPriceList() {
    return $$(".inventory_item_price");
  }

  get itemNameList() {
    return $$(".inventory_item_name");
  }

  get productPageItemName() {
    return $(".inventory_details_name.large_size");
  }

  get btnMenu() {
    return $("#react-burger-menu-btn");
  }

  get menuDrawer() {
    return $(".bm-menu-wrap");
  }

  get linkAllItems() {
    return $("#inventory_sidebar_link");
  }

  get linkAbout() {
    return $("#about_sidebar_link");
  }

  get linkLogout() {
    return $("#logout_sidebar_link");
  }

  get productImages(){
    return $$('.inventory_item_img img');
  }

  get cartBadge(){
    return $(".shopping_cart_badge");
  }

  get cartIcon(){
    return $("#shopping_cart_container");
  }

  get qtyLabel(){
    return $(".cart_quantity_label");
  }

  get descLabel(){
    return $(".cart_desc_label");
  }

  async price(label){
    return await $(`//div[@class='inventory_item_description'][./div[@class='inventory_item_label']/a/div[text()='${label}']]/div[@class='pricebar']/div`);
  }

  async product(label){
    return await $(`//*[@class='inventory_item_name'][text() = '${label}']`);
  }

  async btnAddToCart(label) {
    const name = 'add-to-cart-' + label.split(' ').map(el => el.toLowerCase()).join('-');
    return await $(`[name = "${name}"]`);
  }

  async btnRemove(label) {
    const name = 'remove-' + label.split(' ').map(el => el.toLowerCase()).join('-');
    return await $(`[name = "${name}"]`);
  }
  //remove-sauce-labs-onesie

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

  async itemPriceListText() {
    return await this.getItemTexts(await this.itemPriceList);
  }

  async itemNameListText() {
    return await this.getItemTexts(await this.itemNameList);
  }
}

export default new InventoryPage();
