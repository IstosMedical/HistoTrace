function fetchInstallation() {
  const input = document.getElementById('searchInput').value.trim();
  const installations = JSON.parse(localStorage.getItem('installations')) || [];

  const record = installations.find(r =>
    r.customerName.toLowerCase().includes(input.toLowerCase()) ||
    r.equipment.some(eq => eq.qrCode === input)
  );

  if (record) {
    displayInstallation(record);
  } else {
    document.getElementById('installationDetails').innerHTML = "❌ No record found.";
  }
}

function displayInstallation(record) {
  let html = `<h4>📍 ${record.customerName} – ${record.location}</h4><ul>`;
  record.equipment.forEach(eq => {
    html += `<li>🔹 ${eq.instrument} (${eq.model}) – QR: ${eq.qrCode}</li>`;
  });
  html += `</ul>`;
  document.getElementById('installationDetails').innerHTML = html;
}

function saveServiceEntry() {
  const qr = document.getElementById('searchInput').value.trim();
  const serviceLog = JSON.parse(localStorage.getItem('services')) || [];

  const newEntry = {
    linkedQR: qr,
    serviceDate: document.getElementById('serviceDate').value,
    issue: document.getElementById('issueReported').value,
    actionTaken: document.getElementById('actionTaken').value,
    technician: document.getElementById('technicianName').value
  };

  if (!newEntry.serviceDate || !newEntry.issue || !newEntry.actionTaken || !newEntry.technician) {
    alert("⚠️ Please fill all fields before saving.");
    return;
  }

  serviceLog.push(newEntry);
  localStorage.setItem('services', JSON.stringify(serviceLog));
  alert("✅ Service entry saved!");
}
