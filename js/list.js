const urlParams = new URLSearchParams(window.location.search);
const role = urlParams.get("role");

fetch("https://script.google.com/macros/s/AKfycbyiz8iCbTtnRH5ZILNouP-0qslUH_XLO5T5DoDRcVOchuB2YkJpwx2xzS8TCoT3YWu1CQ/exec?type=list")
.then(res => res.json())
.then(data => {

  const container = document.getElementById("table");

  function getStatusColor(status) {
    if (status === "pending") return "#f59e0b";
    if (status === "approved_by_logist") return "#3b82f6";
    if (status === "approved") return "#10b981";
    return "#6b7280";
  }

  data.forEach(doc => {

    // 🔐 фильтр по ролям
    if (role === "logist" && doc.status !== "pending") return;
    if (role === "director" && doc.status !== "approved_by_logist") return;

    const card = document.createElement("div");
    card.style.background = "white";
    card.style.padding = "15px";
    card.style.marginBottom = "10px";
    card.style.borderRadius = "10px";
    card.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";

    card.innerHTML = `
      <b>Заявка #${doc.id}</b><br>
      <small>${new Date(doc.date).toLocaleString()}</small><br><br>

      🏭 <b>${doc.department}</b><br>

      <span style="color:${getStatusColor(doc.status)};font-weight:bold">
        ${doc.status}
      </span>

      <br><br>

      <a href="doc.html?id=${doc.id}&role=${role}">
        <button style="padding:8px 12px;border:none;background:#2d6cdf;color:white;border-radius:6px;">
          Открыть
        </button>
      </a>
    `;

    container.appendChild(card);
  });

});
