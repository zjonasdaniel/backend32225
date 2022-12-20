import express from "express"
import productManager from "./productManager.js";

const app = express()
app.use(express.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.send("Hola mundo")
})

app.get("/products", async (req,res)=>{
    const { limit } = req.query;
    const products = await productManager.getProducts()
    if(!limit){
        return res.json(products)
    }
    const filterProducts = products.filter((item)=> item.id/limit <= 1)
    res.json(filterProducts)
})

app.get("/products/:id", async (req,res)=>{
    const {id} = req.params;
    const product = await productManager.getProductById(parseInt(id))
    if(!product){
        return res.send("Product not found" + id)
    }
    res.json(product)
})

app.listen(8080,()=>{console.log("Listening on port 8080")})