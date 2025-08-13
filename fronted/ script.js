const API_URL = "http://localhost:3000/customers"; 
Esta línea define una constante llamada API_URL que contiene 
la URL de la API que se utilizará para interactuar con los datos de los clientes

async function loadCustomers() {
  const res = await fetch(API_URL);
  const data = await res.json();
  const table = document.getElementById("customersTable");
  table.innerHTML = "";
  data.forEach(c => {
    table.innerHTML += `
      <tr>
        <td>${c.customer_id}</td>
        <td>${c.name}</td>
        <td>${c.email}</td>
        <td>
          <button onclick="editCustomer(${c.customer_id})" class="btn btn-sm btn-warning">Edit</button>
          <button onclick="deleteCustomer(${c.customer_id})" class="btn btn-sm btn-danger">Delete</button>
        </td>
      </tr>
    `;
  });
}
Esta función loadCustomers() se encarga de cargar los datos de los clientes desde la API y mostrarlos en una tabla HTML. 
Primero, hace una solicitud asíncrona a la API_URL utilizando fetch() y espera la respuesta. 
Luego, convierte la respuesta a formato JSON. A continuación, selecciona el elemento HTML con el ID "customersTable" y vacía su contenido. 
Finalmente, itera sobre los datos de los clientes y agrega una fila a la tabla por cada cliente, incluyendo botones para editar y eliminar.

document.getElementById("customerForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("customer_id").value;
  const customer = {
    name: document.getElementById("name").value,
    identification: document.getElementById("identification").value,
    address: document.getElementById("address").value,
    phone_number: document.getElementById("phone_number").value,
    email: document.getElementById("email").value
  };

  if (id) {
    await fetch(`${API_URL}/${id}`, { method: "PUT", headers: {"Content-Type": "application/json"}, body: JSON.stringify(customer) });
  } else {
    await fetch(API_URL, { method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(customer) });
  }

  e.target.reset();
  loadCustomers();
});
Este código agrega un event listener al formulario HTML con el ID "customerForm". Cuando se envía el formulario, se previene el comportamiento predeterminado del envío. 
Luego, se obtienen los valores de los campos del formulario y se crea un objeto customer con esos datos. Si el campo customer_id tiene un valor, se realiza una solicitud PUT a la API para actualizar el cliente existente. 
De lo contrario, se realiza una solicitud POST para crear un nuevo cliente. Finalmente, se restablece el formulario y se llama a la función loadCustomers() para actualizar la tabla de clientes.

async function editCustomer(id) {
  const res = await fetch(`${API_URL}/${id}`);
  const c = await res.json();
  document.getElementById("customer_id").value = c.customer_id;
  document.getElementById("name").value = c.name;
  document.getElementById("identification").value = c.identification;
  document.getElementById("address").value = c.address;
  document.getElementById("phone_number").value = c.phone_number;
  document.getElementById("email").value = c.email;
}
Esta función editCustomer() se encarga de cargar los datos de un cliente específico desde la API y rellenar los campos del formulario con esos datos. 
Primero, hace una solicitud asíncrona a la API para obtener los datos del cliente con el ID proporcionado. 
Luego, establece los valores de los campos del formulario con los datos del cliente.

async function deleteCustomer(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  loadCustomers();
}
Esta función deleteCustomer() se encarga de eliminar un cliente de la API. Hace una solicitud asíncrona a la API con el método "DELETE" y 
el ID del cliente a eliminar. Después de la eliminación, llama a la función loadCustomers() para actualizar la tabla de clientes.

loadCustomers();
Finalmente, se llama a la función loadCustomers() para cargar los datos de los clientes y mostrarlos en la tabla cuando se carga la página.
