function addRow() {
  const table = document.getElementById("items");
  const row = table.insertRow();

  row.innerHTML = `
    <td><input></td>
    <td><input type="number"></td>
    <td><input></td>
    <td><button onclick="this.parentElement.parentElement.remove()">X</button></td>
  `;
}

function submitForm() {
  const rows = document.querySelectorAll("#items tr");
  let data = [];

  rows.forEach((row, i) => {
    if (i === 0) return;

    const inputs = row.querySelectorAll("input");
    data.push({
      name: inputs[0].value,
      qty: inputs[1].value,
      unit: inputs[2].value
    });
  });

  fetch("ТВОЙ_API_URL", {
    method: "POST",
    body: JSON.stringify({
      department: document.getElementById("department").value,
      items: data,
      comment: document.getElementById("comment").value
    })
  })
  .then(res => res.json())
  .then(res => alert("Создано: " + res.id));
}
