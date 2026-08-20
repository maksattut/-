const urlParams = new URLSearchParams(window.location.search);
const role = urlParams.get("role");

// 👉 ВАЖНО: твой рабочий URL
const API_URL = "https://script.google.com/macros/s/AKfycbyiz8iCbTtnRH5ZILNouP-0qslUH_XLO5T5DoDRcVOchuB2YkJpwx2xzS8TCoT3YWu1CQ/exec?type=list";

fetch(API_URL)
  .then(res => {
    if (!res.ok) {
      throw new Error("Ошибка сети: " + res.status);
    }
    return res.json();
  })
  .then(data => {

    console.log("DATA:", data); // 🔍 смотри в F12

    const table = document.getElementById("table");

    if (!data || data.length === 0) {
      const row = table.insertRow();
      row.innerHTML = `<td colspan="5">Нет заявок</td>`;
      return;
    }

    function getStatusColor(status) {
      if (status === "pending") return "orange";
      if (status === "approved_by_logist") return "blue";
      if (status === "approved") return "green";
      return "gray";
    }

    data.forEach(doc => {

      // 🔐 фильтрация по ролям
      if (role === "logist" && doc.status !== "pending") return;
      if (role === "director" && doc.status !== "approved_by_logist") return;

      const row = table.insertRow();

      row.innerHTML = `
        <td>${doc.id || "-"}</td>
        <td>${doc.date ? new Date(doc.date).toLocaleString() : "-"}</td>
        <td>${doc.department || "-"}</td>
        <td style="color:${getStatusColor(doc.status)}; font-weight:bold;">
          ${doc.status || "-"}
        </td>
        <td>
          <a href="doc.html?id=${doc.id}&role=${role}">Открыть</a>
        </td>
      `;
    });

  })
  .catch(err => {
    console.error("Ошибка загрузки:", err);

    const table = document.getElementById("table");
    const row = table.insertRow();

    row.innerHTML = `
      <td colspan="5" style="color:red;">
        Ошибка загрузки данных
      </td>
    `;
  });
