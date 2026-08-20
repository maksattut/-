const urlParams = new URLSearchParams(window.location.search);
const role = urlParams.get("role");

const API_URL = "https://script.google.com/macros/s/AKfycbyiz8iCbTtnRH5ZILNouP-0qslUH_XLO5T5DoDRcVOchuB2YkJpwx2xzS8TCoT3YWu1CQ/exec?type=list";

fetch(API_URL)
  .then(res => res.json())
  .then(data => {

    const container = document.getElementById("list");

    if (!data || data.length === 0) {
      container.innerHTML = "Нет заявок";
      return;
    }

    function getStatusClass(status) {
      if (status === "pending") return "pending";
      if (status === "approved_by_logist") return "logist";
      if (status === "approved") return "approved";
      return "";
    }

    data.forEach(doc => {

      // фильтр ролей
      if (role === "logist" && doc.status !== "pending") return;
      if (role === "director" && doc.status !== "approved_by_logist") return;

      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <div class="row">
          <div class="label">ID</div>
          <div class="value">${doc.id}</div>
        </div>

        <div class="row">
          <div class="label">Дата</div>
          <div class="value">${new Date(doc.date).toLocaleString()}</div>
        </div>

        <div class="row">
          <div class="label">Цех</div>
          <div class="value">${doc.department}</div>
        </div>

        <div class="row">
          <div class="label">Статус</div>
          <div class="status ${getStatusClass(doc.status)}">
            ${doc.status}
          </div>
        </div>

        <button class="btn" onclick="openDoc('${doc.id}')">
          Открыть
        </button>
      `;

      container.appendChild(card);
    });

  })
  .catch(() => {
    document.getElementById("list").innerHTML = "Ошибка загрузки";
  });

function openDoc(id) {
  window.location.href = `doc.html?id=${id}&role=${role}`;
}
