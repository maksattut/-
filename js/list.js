fetch("ТВОЙ_API_URL?type=list")
.then(res => res.json())
.then(data => {
  const table = document.getElementById("table");

  data.forEach(doc => {
    const row = table.insertRow();

    row.innerHTML = `
      <td>${doc.id}</td>
      <td>${doc.date}</td>
      <td>${doc.department}</td>
      <td>${doc.status}</td>
      <td><a href="doc.html?id=${doc.id}">Открыть</a></td>
    `;
  });
});
