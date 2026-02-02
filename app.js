const tableBody = document.querySelector("#studentTable tbody");
const statusEl = document.querySelector("#status");
const refreshBtn = document.querySelector("#refreshBtn");

// Later you will replace this with your real Azure Function endpoint
const API_URL = "https://your-api-endpoint";

function setStatus(msg) {
  statusEl.textContent = msg;
}

function renderRows(rows) {
  if (!rows || rows.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="2">No data found</td></tr>`;
    return;
  }

  tableBody.innerHTML = rows
    .map(r => `<tr><td>${r.Country}</td><td>${r.StudentCount}</td></tr>`)
    .join("");
}

async function fetchStudentData() {
  try {
    setStatus("Loading...");
    const res = await fetch(API_URL);

    if (!res.ok) throw new Error(`API error: ${res.status}`);

    const data = await res.json();
    renderRows(data);
    setStatus("Updated successfully.");
  } catch (err) {
    setStatus(`Failed to load data: ${err.message}`);
    renderRows([]);
  }
}

refreshBtn.addEventListener("click", fetchStudentData);
fetchStudentData();
