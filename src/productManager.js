//const fs = require("fs");
import fs from 'fs';

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

      this.products.push(product);
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t"));
    }
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const filterProduct = this.products.find((item) => item.id === id);

    if (filterProduct === undefined) {
      return "Product not found";
    } else {
      return filterProduct;
    }
  }

  deleteProducts(id) {
    if (this.products.some((item) => item.id == id)) {
      this.products = this.products.filter((item) => item.id != id);
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t"));
    } else {
      console.log("No existe un elemento con ese ID");
    }
  }

  updateProducts(id, propToUpt, info) {
    this.products[id - 1][propToUpt] = info;
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t"));
  }
}
//
const productlist = new productManager();
//
//console.log(productlist.getProducts());

/*
// Cargar productos
productlist.addProduct("Computadora", "PcBasica", 14, "*UrlImage*", 1, 5);
productlist.addProduct("Teclado", "Teclado mecanico", 5, "asdasdsa", 2, 5);
productlist.addProduct("Mouse", "Mouse gamer", 4, "asdasdsa", 3, 5);
productlist.addProduct("Monitor", "Monitor full hd", 9, "asdasdsa", 4, 5);
productlist.addProduct("Monitor", "Monitor medio hd", 5, "asdasdsa", 5, 5);
productlist.addProduct("Monitor", "no hd", 3, "asdasdsa", 6, 5);
productlist.addProduct("Parlantes", "parlantes random", 2, "asdasdsa", 7, 5);
productlist.addProduct("Parlantes", "parlantes premium", 5, "asdasdsa", 8, 5);
productlist.addProduct("Ojotas", "Ojota 3.0", 2, "asdasdsa", 9, 5);
productlist.addProduct("Remeras", "Remera seleccion", 15, "asdasdsa", 10, 5);

// Productos que no cumplen las condiciones
productlist.addProduct("Ventilador", "PcBasica", "*UrlImage*", 5 , 5);
productlist.addProduct("Parlantes", "PcBasica", 14, "*UrlImage*", 1 , 5);
*/

//Obtener lista de productos
//console.log(productlist.getProducts());

//Obtener producto por Id
//console.log(productlist.getProductById(3))

//Editar producto por Id 
//productlist.updateProducts(1,"title","ComputadoraEdit")

//Eliminar un producto por Id
//productlist.deleteProducts(4);

export default new productManager()