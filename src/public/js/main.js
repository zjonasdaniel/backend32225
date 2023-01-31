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

socket.on("newProductResponse",(data)=> {
  if(data!= null){
    alert(data)
  }
})

let user;
const chatbox = document.querySelector("#chatbox");

Swal.fire({
  title: "Identificate",
  input: "text",
  text: "Ingrese su nombre para identificarte en el chat",
  inputValidator: (value) => {
    return !value && "Debes ingresar un nombre";
  },
  allowOutsideClick: false,
}).then((res) => {
  user = res.value;
  // console.log(res.value);
  socket.emit("inicio", "Inicio de sesion");
});

chatbox.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    if (chatbox.value.trim().length > 0) {
      console.log(chatbox.value);
      socket.emit("message", { message: chatbox.value, user });
      chatbox.value = "";
    }
  }
});

socket.on("connected", (data) => {
  if (user !== undefined) {
    Swal.fire({
      text: "Nuevo cliente conectado",
      toast: true,
      position: "top-right",
    });
  }
});

socket.on("messageLogs", (data) => {
  let log = document.querySelector("#messageLogs");
  let messages = "";

  data.forEach((message) => {
    messages =
      messages + `<strong>${message.user}</strong>: ${message.message} <br>`;
  });

  log.innerHTML = messages;
});