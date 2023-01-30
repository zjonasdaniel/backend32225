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

router.delete("/:id", async (req, res) => {
  try {
    const carts = await cartsDao.delete(req.params.id);
    res.json( carts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;