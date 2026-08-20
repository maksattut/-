const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

if (!id) {
  document.body.innerHTML = "❌ Нет ID заявки";
}

fetch("https://script.google.com/macros/s/AKfycbyiz8iCbTtnRH5ZILNouP-0qslUH_XLO5T5DoDRcVOchuB2YkJpwx2xzS8TCoT3YWu1CQ/exec?type=list")
.then(res => res.json())
.then(data => {

  const doc = data.find(d => d.id === id);

  if (!doc) {
    document.body.innerHTML = "❌ Заявка не найдена";
    return;
  }

  document.getElementById("docId").innerText = doc.id;
  document.getElementById("docDate").innerText = new Date(doc.date).toLocaleString();
  document.getElementById("docDept").innerText = doc.department;
  document.getElementById("docStatus").innerText = doc.status;
  document.getElementById("docComment").innerText = doc.comment;

  const items = JSON.parse(doc.items);
  const table = document.getElementById("items");

  items.forEach(i => {
    const row = table.insertRow();
    row.innerHTML = `
      <td>${i.name}</td>
      <td>${i.qty}</td>
      <td>${i.unit}</td>
    `;
  });

});
