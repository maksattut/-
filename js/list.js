const urlParams = new URLSearchParams(window.location.search);
const role = urlParams.get("role");

fetch("https://script.google.com/macros/s/AKfycbyiz8iCbTtnRH5ZILNouP-0qslUH_XLO5T5DoDRcVOchuB2YkJpwx2xzS8TCoT3YWu1CQ/exec?type=list")
.then(res => res.json())
.then(data => {

  const table = document.getElementById("table");

  function getStatusColor(status) {
    if (status === "pending") return "orange";
    if (status === "approved_by_logist") return "blue";
    if (status === "approved") return "green";
    return "gray";
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

});
