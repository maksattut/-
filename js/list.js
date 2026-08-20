// 🔐 получаем роль
const urlParams = new URLSearchParams(window.location.search);
const role = urlParams.get("role");

// 🚫 если нет роли — назад
if (!role) {
  alert("Нет доступа");
  location.href = "index.html";
}

// 🚀 загрузка данных
fetch("https://script.google.com/macros/s/AKfycbyiz8iCbTtnRH5ZILNouP-0qslUH_XLO5T5DoDRcVOchuB2YkJpwx2xzS8TCoT3YWu1CQ/exec?type=list")
.then(res => res.json())
.then(data => {

  const table = document.getElementById("table");

  // 🎨 цвета статусов
  function getStatusColor(status) {
    if (status === "pending") return "#ff9800";
    if (status === "approved_by_logist") return "#2196f3";
    if (status === "approved") return "#4caf50";
    return "#999";
  }

  data.forEach(doc => {

    // 🔐 фильтр по ролям
    if (role === "logist" && doc.status !== "pending") return;
    if (role === "director" && doc.status !== "approved_by_logist") return;

    const row = table.insertRow();

    row.innerHTML = `
      <td>${doc.id}</td>
      <td>${new Date(doc.date).toLocaleString()}</td>
      <td>${doc.department}</td>
      <td style="color:${getStatusColor(doc.status)};font-weight:bold">
        ${doc.status}
      </td>
      <td>
        <a href="doc.html?id=${doc.id}&role=${role}">Открыть</a>
      </td>
    `;
  });

})
.catch(err => {
  console.error(err);
  alert("Ошибка загрузки данных");
});
