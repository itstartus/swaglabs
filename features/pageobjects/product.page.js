class Product {

  get productName() {
    return $(".inventory_details_name.large_size");
  }

  async btnAddToCart(label) {
    const name =
      "add-to-cart-" +
      label
        .split(" ")
        .map((el) => el.toLowerCase())
        .join("-");
    return await $(`[name = "${name}"]`);
  }

  async btnRemove(label) {
    const name =
      "remove-" +
      label
        .split(" ")
        .map((el) => el.toLowerCase())
        .join("-");
    return await $(`[name = "${name}"]`);
  }

  get btnBackToProducts() {
    return $("#back-to-products");
  }

  get itemPrice(){
    return $('.inventory_details_price');
  }



}

export default new Product();
