let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function updateSummary() {
  let total = expenses.reduce((sum, e) => sum + e.amount, 0);
  document.getElementById("total").textContent = total;

  let byMonth = {}, byCategory = {};
  expenses.forEach(({ date, amount, category }) => {
    let month = date.slice(0, 7); // YYYY-MM
    byMonth[month] = (byMonth[month] || 0) + amount;
    byCategory[category] = (byCategory[category] || 0) + amount;
  });

  document.getElementById("monthly").innerHTML = `<h3>Monthly</h3>` +
    Object.entries(byMonth).map(([m, a]) => `${m}: ₹${a}`).join("<br>");

  document.getElementById("categorywise").innerHTML = `<h3>By Category</h3>` +
    Object.entries(byCategory).map(([c, a]) => `${c}: ₹${a}`).join("<br>");
}

document.getElementById("expense-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const amount = +document.getElementById("amount").value;
  const date = document.getElementById("date").value;
  const category = document.getElementById("category").value;

  expenses.push({ name, amount, date, category });
  localStorage.setItem("expenses", JSON.stringify(expenses));
  this.reset();
  updateSummary();
});

updateSummary();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("serviceWorker.js");
}