import { Router } from "express";
import cartManager from "../cartManager.js";

const router = Router();

router.post("/", (req, res) => {
    const products = req.body;
    cartManager.addCart(products);
    res.status(201).json({ info: "Created", body: products});
})
router.post("/:id/product/:pid", (req, res) => {
    const { id , pid} = req.params
    cartManager.addProductToCart(id,pid)
    res.status(201).json({ info: "The product was added to the cart!", updatedcart: cartManager.getCartById(parseInt(id))});
})
router.get("/",(req, res) => {
    const { limit } = req.query;
    const products = cartManager.getCarts;
    if (!limit) {
      return res.status(200).json(cartManager.getCarts());
    }
    const filterProducts = products.filter((item) => item.id / limit <= 1);
    res.json(filterProducts);
  });
router.get("/:id",(req, res) => {
    const { id } = req.params;
    const product = cartManager.getCartById(parseInt(id))
    if (!product) {
      return res.send("Product not found" + id);
    }
    res.json(product);
  });

export default router;