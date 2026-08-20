fetch("https://script.google.com/macros/s/AKfycbzioB_TlUiC6kcJYf2CsMhhVMsyar2z0t9tcN1mVZkSp31P7jljWOnrwxRMp1kXIpor0g/exec?type=list")
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
