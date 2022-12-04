const esIndefinido = (a, b, c, d, e, f) => {
  if ((a, b, c, d, e, f) == undefined) {
    return true
  }
};

class productmanager {
  constructor() {
    this.products = []
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
      )
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
        product["id"] = 1
      } else {
        product["id"] = this.products[this.products.length - 1]["id"] + 1
      }

      if (esIndefinido(title, description, price, thumbnail, code, stock)) {
        console.log("hay un valor indefinido")
      }
      this.products.push(product)
    }
  }

  getProducts() {
    return this.products
  }

  getProductById(id) {
    const filterProduct = this.products.find((item) => item.id === id);

    if (filterProduct === undefined) {
      return "Not found"
    } else {
      return filterProduct
    }
  }
}
//
const productlist = new productmanager()
//
productlist.addProduct("Computadora", "PcBasica", 14, "*UrlImage*", 001, 5)
productlist.addProduct("Teclado", "Teclado mecanico", 5, "asdasdsa", 002, 5)
productlist.addProduct("Mouse", "Mouse gamer", 4, "asdasdsa", 003, 5)
productlist.addProduct("Monitor", "Monitor full hd", 9, "asdasdsa", 004, 5)
//
productlist.addProduct("Ventilador", "PcBasica", "*UrlImage*", 005, 5)
productlist.addProduct("Parlantes", "PcBasica", 14, "*UrlImage*", 001, 5)
//
console.log(productlist.getProducts())
console.log(productlist.getProductById(3))
