import express from "express";
import productsRoutes from "./products/products.routes.js";
import cartsRoutes from "./cart/cart.routes.js"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/products", productsRoutes);
app.use("/carts", cartsRoutes);

app.listen(8080, () => {
  console.log("Listening on port 8080");
});
