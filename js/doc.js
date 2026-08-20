const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const role = urlParams.get("role");

console.log("ID:", id);

// если нет id
if (!id) {
  document.body.innerHTML = "❌ Нет ID заявки";
}

// твой API
const API_URL = "https://script.google.com/macros/s/AKfycbyiz8iCbTtnRH5ZILNouP-0qslUH_XLO5T5DoDRcVOchuB2YkJpwx2xzS8TCoT3YWu1CQ/exec?type=list";

fetch(API_URL)
.then(res => res.json())
.then(data => {

  console.log("DATA:", data);

  const doc = data.find(d => String(d.id) === String(id));

  if (!doc) {
    document.body.innerHTML = "❌ Заявка не найдена";
    return;
  }

  // вставляем данные
  document.getElementById("docId").innerText = doc.id || "-";
  document.getElementById("docDate").innerText = doc.date ? new Date(doc.date).toLocaleString() : "-";
  document.getElementById("docDept").innerText = doc.department || "-";
  document.getElementById("docStatus").innerText = doc.status || "-";
  document.getElementById("docComment").innerText = doc.comment || "-";

  // позиции
  const table = document.getElementById("items");

  try {
    const items = JSON.parse(doc.items || "[]");

    items.forEach(i => {
      const row = table.insertRow();
      row.innerHTML = `
        <td>${i.name}</td>
        <td>${i.qty}</td>
        <td>${i.unit}</td>
      `;
    });

  } catch (e) {
    console.error("Ошибка парсинга items:", e);
  }

})
.catch(err => {
  console.error(err);
  document.body.innerHTML = "❌ Ошибка загрузки";
});
