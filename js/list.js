const params = new URLSearchParams(window.location.search);
const role = params.get("role");

function getStatusColor(status){
  if(status === "pending") return "orange";
  if(status === "approved_by_logist") return "blue";
  if(status === "approved") return "green";
  return "gray";
}

function getStatusText(status){
  if(status==="pending") return "Ожидает";
  if(status==="approved_by_logist") return "У логиста";
  if(status==="approved") return "Подписано";
  return status;
}

fetch("https://script.google.com/macros/s/AKfycbyiz8iCbTtnRH5ZILNouP-0qslUH_XLO5T5DoDRcVOchuB2YkJpwx2xzS8TCoT3YWu1CQ/exec?type=list")
.then(res => res.json())
.then(data => {

  const table = document.getElementById("table");

  data.forEach(doc => {

    // фильтр по роли
    if (role === "logist" && doc.status !== "pending") return;
    if (role === "director" && doc.status !== "approved_by_logist") return;

    const row = table.insertRow();

    row.innerHTML = `
      <td>${doc.id}</td>
      <td>${new Date(doc.date).toLocaleString()}</td>
      <td>${doc.department}</td>
      <td style="color:${getStatusColor(doc.status)}; font-weight:bold;">
        ${getStatusText(doc.status)}
      </td>
      <td><a href="doc.html?id=${doc.id}&role=${role}">Открыть</a></td>
    `;
  });

});
