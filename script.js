// Get elements from the HTML
const expenseForm = document.getElementById("expense-form");
const expenseName = document.getElementById("expense-name");
const expenseAmount = document.getElementById("expense-amount");
const expenseCategory = document.getElementById("expense-category");
const expenseList = document.getElementById("expense-list");
const totalAmount = document.getElementById("total-amount");

// Store expenses
let expenses = [];

// Add expense
expenseForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = expenseName.value.trim();
  const amount = Number(expenseAmount.value);
  const category = expenseCategory.value;

  // Check if the fields are filled
  if (name === "" || amount <= 0 || category === "") {
    alert("Please fill in all fields correctly.");
    return;
  }

  // Create expense object
  const expense = {
    id: Date.now(),
    name: name,
    amount: amount,
    category: category
  };

  // Add expense to the array
  expenses.push(expense);

  // Update the screen
  displayExpenses();
  updateTotal();

  // Clear the form
  expenseForm.reset();
});


// Display expenses
function displayExpenses() {
  expenseList.innerHTML = "";

  expenses.forEach(function (expense) {
    const expenseItem = document.createElement("div");

    expenseItem.classList.add("expense-item");

    expenseItem.innerHTML = `
      <div>
        <h3>${expense.name}</h3>
        <p>${expense.category}</p>
      </div>

      <div>
        <strong>₦${expense.amount.toLocaleString()}</strong>
        <button onclick="deleteExpense(${expense.id})">
          Delete
        </button>
      </div>
    `;

    expenseList.appendChild(expenseItem);
  });
}


// Calculate total
function updateTotal() {
  const total = expenses.reduce(function (sum, expense) {
    return sum + expense.amount;
  }, 0);

  totalAmount.textContent = `₦${total.toLocaleString()}`;
}


// Delete an expense
function deleteExpense(id) {
  expenses = expenses.filter(function (expense) {
    return expense.id !== id;
  });

  displayExpenses();
  updateTotal();
}