/*
title (nombre del producto)
description (descripción del producto)
price (precio)
thumbnail (ruta de imagen)
code (código identificador)
stock (número de piezas disponibles)

if (
        (this.products.some((item) => {
            item.code === code;
          }))
    ) {
      console.log("El producto agregado tiene un code repedito.");
    }

    &&
      this.products.some((item) => item.code === code)

*/

class productmanager {
  constructor() {
    this.products = [];
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (
      this.products.length > 0  &&
      this.products.some((item) => item.code === code)
    ) {
      console.log('El producto con titulo "' + title + '" no se agrego, debido a que su propiedad "Code" estaba repetida!');
    } else {
      let product = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };

      if (this.products.length === 0) {
        product["id"] = 1;
      } else {
        product["id"] = this.products[this.products.length - 1]["id"] + 1;
      }

      if(typeof product.item == "undefined"){
        console.log("hay un valor indefinido")
      }
      this.products.push(product);
    }
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const filterProduct = this.products.find((item) => item.id === id);

    if (filterProduct === undefined) {
      return "Not found";
    } else {
      return filterProduct;
    }
  }
}

const productlist = new productmanager();

productlist.addProduct("lalala", "kakaka", 14, "asdasdsa", 151515,15);
productlist.addProduct("lalala", "kakaka", 14, "asdasdsa", 151515, 10);

console.log(productlist.getProducts());
