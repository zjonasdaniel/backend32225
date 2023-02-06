import productsDao from "../../daos/dbManager/products.dao.js";
import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  let result, limit, query, sort, page;
  try {
    limit = parseInt(req.query.limit);
    sort = parseInt(req.query.sort);
    page = parseInt(req.query.page);
    if (req.query.query) {
      query = JSON.parse(req.query.query);
    }
    result = await productsDao.getAll(limit, query, sort, page);
  } catch (e) {
    result = await productsDao.getAll(limit, query, sort, page);
  }
  try {
    res.json({
      status: "success",
      payload: result,
    });
  } catch (error) {
    res.json({ error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    res.json(await productsDao.getById(req.params.id));
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    let products = await productsDao.getAll();
    if (products.some((item) => item.code === req.body.code)) {
      res.status(500).json({ error: "La propiedad code ya fue ingresada" });
    } else {
      const product = await productsDao.create(req.body);
      res.status(500).json(req.body);
      //res.redirect('/')
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const product = await productsDao.update(req.params.id, req.body);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const product = await productsDao.delete(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
