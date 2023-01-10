const socket = io();

const postProduct = () => {
  let product = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    category: document.getElementById("category").value,
    price: document.getElementById("price").value,
    stock: document.getElementById("stock").value,
    code: document.getElementById("code").value,
  };
  socket.emit("newProduct", product);
};

const deleteProduct = (a) => {
socket.emit("deleteProduct", a);
};

socket.on("arrayProducts", (data) => {
  let products = document.getElementById("productos");
  products.innerHTML = "";
  data.forEach((Item) => {
    products.innerHTML += `
                            <tr>
                              <td> ${Item.title} </td>
                              <td>${Item.description}</td>
                              <td>${Item.category}</td>
                              <td>$ ${Item.price}</td>
                              <td>${Item.code}</td>
                              <td>${Item.stock} Unidades</td>
                              <td><button onclick="deleteProduct(${Item.id})">Eliminar</button></td>
                            </tr>
    `;
  });
});
