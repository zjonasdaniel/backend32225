import { Router } from "express";
import productManager from "../../daos/fileManager/productManager.js";

const router = Router();

router.get('/', (req, res) => {
  res.render('home', {
    products : productManager.getProducts()
  })
})
router.get('/realtimeproducts', (req, res) => {
  res.render('realtimeproducts', {
    title: 'realtimeproducts'
  })
})


export default router