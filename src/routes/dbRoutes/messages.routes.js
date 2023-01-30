import messagesDao from "../../daos/dbManager/messages.dao.js";
import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const messages = await messagesDao.getAll();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const messages = await messagesDao.getById(req.params.id);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const messages = await messagesDao.create(req.body);
    res.status(500).json(req.body);
    //res.redirect('/')
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
