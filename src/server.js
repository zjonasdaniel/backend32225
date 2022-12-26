import express from "express";
import productsRoutes from "./routes/products.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/products", productsRoutes);

app.listen(8080, () => {
  console.log("Listening on port 8080");
});
