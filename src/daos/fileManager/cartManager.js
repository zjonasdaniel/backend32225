import fs from "fs";

class cartManager {
  constructor() {
    this.path = "./carts.json";
    if (fs.existsSync(this.path)) {
      this.carts = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    } else {
      this.carts = [];
    }
  }
  addCart(products) {
    let cart = {
      products,
    };
    if (this.carts.length === 0) {
      cart["id"] = 1;
    } else {
      cart["id"] = this.carts[this.carts.length - 1]["id"] + 1;
    }

    this.carts.push(cart);
    fs.writeFileSync(this.path, JSON.stringify(this.carts, null, "\t"));
  }
  //cartslist.addCart({{id:5},{id:10}})
  getCarts() {
    return this.carts;
  }
  getCartById(id) {
    const filterCart = this.carts.find((item) => item.id === id);

    if (filterCart === undefined) {
      return "Cart not found";
    } else {
      return filterCart;
    }
  }
  addProductToCart(id, productId) { //id= id del carrito a modificar, productId= id del producto que quiero agregar
    let find = true;
    this.carts.forEach((item, indice) => {   
      if (this.carts[indice].id == id) {      
        this.carts[indice].products.forEach((item2, indice2) => {
          if (this.carts[indice].products[indice2].id == productId) {
            if (this.carts[indice].products[indice2].quantity) {
              this.carts[indice].products[indice2].quantity++;
              find = false;
            } else {
              this.carts[indice].products[indice2].quantity = 2;
              find = false;
            }
          }
        });
        if(find){
            this.carts[indice].products[this.carts[indice].products.length]={id:productId}
        }
      }
    });
    fs.writeFileSync(this.path, JSON.stringify(this.carts, null, "\t"));
  }
}

const cartslist = new cartManager();
//cartslist.addCart([{ id: 1, quantity: 2 }, { id: 9 }]);
//cartslist.addProductToCart(1,5)

export default new cartManager();
