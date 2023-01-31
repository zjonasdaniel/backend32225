import express from "express";
import handlebars from 'express-handlebars';
import __dirname from './dirname.js';
import fileProductsRoutes from "./routes/fileRoutes/products.routes.js";
import fileCartsRoutes from "./routes/fileRoutes/cart.routes.js"
import fileViewsRouter from './routes/fileRoutes/views.routes.js';
import dbProductsRoutes from "./routes/dbRoutes/products.routes.js";
import dbCartsRoutes from "./routes/dbRoutes/carts.routes.js";
import dbMessagesRoutes from "./routes/dbRoutes/messages.routes.js";
import dbViewsRoutes from "./routes/dbRoutes/views.routes.js"
import { Server } from 'socket.io';
import productManager from "./daos/fileManager/productManager.js";
import Handlebars from 'handlebars';
import mongoose from 'mongoose';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access'

const app = express();
const httpServer = app.listen(8080, () => console.log(`Server on port ${8080}`));
const io = new Server(httpServer);

mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://zjonasdaniel:admin@cluster0.y0y6vlw.mongodb.net/?retryWrites=true&w=majority', (error) => {
  if(error) {
    console.log('Error al conectar a MongoDB', error);
  } else {
    console.log('Conectado a MongoDB');
  }
})

// Handlebars
app.engine('hbs', handlebars.engine({
  extname: '.hbs',
  defaultLayout: 'main.hbs',
  handlebars: allowInsecurePrototypeAccess(Handlebars)
}));


app.set('view engine', 'hbs')
app.set('views', `${__dirname}/views`)
app.use(express.json())
app.use(express.static(`${__dirname}/public`))
app.use(express.urlencoded({ extended: true }))


app.use('/', dbViewsRoutes);
app.use("/products", dbProductsRoutes);
app.use("/carts", dbCartsRoutes);

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