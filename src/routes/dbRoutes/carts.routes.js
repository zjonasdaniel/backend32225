import cartsDao from "../../daos/dbManager/carts.dao.js";
import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const carts = await cartsDao.getAll();
    res.json(carts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const carts = await cartsDao.getById(req.params.id);
    res.json(carts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const carts = await cartsDao.create(req.body);
    res.status(500).json(carts);
    //res.redirect('/')
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:cid/product/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  let enExistencia;
  const { quantity } = req.body;
  try {
    enExistencia = await productDao.getById(pid)
    if (!enExistencia) res.status(404).json({ "error": "El producto no se encuentra en la base de datos" })
    else {
      try {
        let product = { productId: pid, quantity: quantity }
        cartsDao.updateCart(cid, product)
        res.json({ message: 'Carrito Actualizado' })
      } catch (error) {
        res.json({ error })
      }
    }
  } catch (error) {
    res.json({ error })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const carts = await cartsDao.delete(req.params.id);
    res.json( carts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;