import express from "express";
import handlebars from 'express-handlebars';
import __dirname from './dirname.js';
import productsRoutes from "./products/products.routes.js";
import cartsRoutes from "./cart/cart.routes.js"
import viewsRouter from './routes/views.routes.js';
import { Server } from 'socket.io';
import productManager from "./productManager.js";

const app = express();
const httpServer = app.listen(3000, () => console.log(`Server on port ${3000}`));
const io = new Server(httpServer);

app.engine('hbs', handlebars.engine({
  extname: 'hbs',
  defaultLayout: 'main'
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);
app.use(express.static(`${__dirname}/public`));

app.use('/', viewsRouter);
app.use("/products", productsRoutes);
app.use("/carts", cartsRoutes);

let products = productManager.getProducts()

io.on('connection', (socket) => {
  console.log("Alguien se ha conectado")
  socket.emit("arrayProducts", products)
  socket.on("newProduct",(data)=>{
    const {title, description, price, thumbnail, code, stock, statusbool, category} = data
    socket.emit("newProductResponse", productManager.addProduct(title, description, parseInt(price), thumbnail, parseInt(code), parseInt(stock), statusbool, category))
  })
  socket.on("deleteProduct",(data)=>{
    productManager.deleteProducts(data)
  })
})