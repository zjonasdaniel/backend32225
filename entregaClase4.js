const fs = require("fs");
const { title } = require("process");

const esIndefinido = (a, b, c, d, e, f) => {
  if ((a, b, c, d, e, f) == undefined) {
    return true;
  }
};

class productManager {
  constructor() {
    this.path = "./products.json";
    if (fs.existsSync(this.path)) {
      this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    } else {
      this.products = [];
    }
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (
      this.products.length > 0 &&
      this.products.some((item) => item.code === code)
    ) {
      console.log(
        'El producto con titulo "' +
          title +
          '" no se agrego, debido a que su propiedad "Code" ya fue ingresada en el sistema!'
      );
    } else if (
      esIndefinido(title, description, price, thumbnail, code, stock)
    ) {
      console.log(
        'El producto con titulo "' +
          title +
          '" no se agrego, debido a que no se ingresaron todos los datos!'
      );
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

      if (esIndefinido(title, description, price, thumbnail, code, stock)) {
        console.log("hay un valor indefinido");
      }
      this.products.push(product);
      fs.promises.writeFile(this.path,JSON.stringify(this.products,null,"\t"))
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

  deleteProducts(){
    
  }

  
  updateProducts(id,propToUpt,info){
    let productToUpdate = this.products.find((item) => item.id === id)
    productToUpdate[propToUpt] = info;
    console.log(productToUpdate)
  }

}
//
const productlist = new productManager();

/*
productlist.addProduct("Computadora", "PcBasica", 14, "*UrlImage*", 001, 5);
productlist.addProduct("Teclado", "Teclado mecanico", 5, "asdasdsa", 002, 5);
productlist.addProduct("Mouse", "Mouse gamer", 4, "asdasdsa", 003, 5);
productlist.addProduct("Monitor", "Monitor full hd", 9, "asdasdsa", 004, 5);
//
productlist.addProduct("Ventilador", "PcBasica", "*UrlImage*", 005, 5);
productlist.addProduct("Parlantes", "PcBasica", 14, "*UrlImage*", 001, 5);
*/

//console.log(productlist.getProducts());
//console.log(productlist.getProductById(3))
productlist.updateProducts(1,"title","Computadoraa")