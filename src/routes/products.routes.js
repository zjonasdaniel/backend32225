import e, { Router } from "express";
import productManager from "../productManager.js";

const router = Router();

router.get("/", async (req, res) => {
  const { limit } = req.query;
  const products = await productManager.getProducts();
  if (!limit) {
    return res.status(200).json(productManager.getProducts());
  }
  const filterProducts = products.filter((item) => item.id / limit <= 1);
  res.json(filterProducts);
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const product = await productManager.getProductById(parseInt(id));
  if (!product) {
    return res.send("Product not found" + id);
  }
  res.json(product);
});
router.post("/", (req, res) => {
  const { title, description, price, thumbnail, code, stock, statusbool, category } = req.body;
  let error = productManager.addProduct(
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    statusbool,
    category
  );
  if(error){
    throw new Error(error)
  }
  res.status(201).json({ info: "Created"});
});
//en produccion
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const context = req.body;
  productManager.updateProducts(id,context)
  res.status(201).json({ info: "Created"});
});

export default router;
