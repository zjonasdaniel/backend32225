import { Router} from "express";
import productsDao from "../../daos/dbManager/products.dao.js";


const router = Router();

router.get("/", async (req,res)=>{
    const products = await productsDao.getAll()
    res.render("home",{title: "home", products: products})
})

router.get('/edit/:id', async (req, res) => {
    const product = await productsDao.getById(req.params.id);
    res.render('edit', { title: 'Edit', product });
})
router.get('/delete/:id', async (req, res) => {
    const products = await productsDao.getAll()
    await productsDao.delete(req.params.id);
    res.render("index", { title: "home", products });
})

export default router