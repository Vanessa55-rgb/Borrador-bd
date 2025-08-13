const API_URL = "http://localhost:3000/customers";

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

async function deleteCustomer(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  loadCustomers();
}

loadCustomers();