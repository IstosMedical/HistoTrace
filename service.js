function fetchInstallation() {
  const input = document.getElementById('searchInput').value.trim();
  const installations = JSON.parse(localStorage.getItem('installations')) || [];
  showServiceHistory(input); // after displaying installation
  showServiceHistory(qr); // after saving service entry

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
  const serviceDate = document.getElementById('serviceDate').value;
  const issue = document.getElementById('issueReported').value;
  const actionTaken = document.getElementById('actionTaken').value;
  const technician = document.getElementById('technicianName').value;

  if (!serviceDate || !issue || !actionTaken || !technician) {
    alert("⚠️ Please fill all fields before saving.");
    return;
  }

  const payload = {
    qrCode: qr,
    serviceDate,
    issue,
    actionTaken,
    technician
  };

  fetch("https://script.google.com/macros/s/https://script.google.com/macros/s/AKfycbyiQJrm2Szvo1yKP-zTreWFsKeq_UFQqY5kY9_Jysqao84fKGgpySaqf4eMPE58huPy/exec", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      alert("✅ Service entry saved to ServiceForm sheet!");
      showServiceHistory(qr); // Refresh history
    } else {
      alert("❌ Failed to save entry. Try again.");
    }
  })
  .catch(err => {
    console.error("Error saving entry:", err);
    alert("🚨 Backend error. Check console or network.");
  });
}




function getStatusBadge(entry) {
  if (!entry.actionTaken || entry.actionTaken.toLowerCase().includes("pending")) {
    return "🔧 In Progress";
  }
  return "✅ Completed";
}

function showServiceHistory(qrCode) {
  const serviceLog = JSON.parse(localStorage.getItem('services')) || [];
  const filtered = serviceLog.filter(entry => entry.linkedQR === qrCode);

  if (filtered.length === 0) {
    document.getElementById('serviceHistory').innerHTML = "📭 No service history found.";
    return;
  }

  let html = "<ul>";
  filtered.forEach(entry => {
    html += `<li>
      ${entry.serviceDate} – ${entry.issue} – ${entry.actionTaken} 
      <strong>${getStatusBadge(entry)}</strong> 
      <br/><em>👨‍🔧 ${entry.technician}</em>
    </li>`;
  });
  html += "</ul>";

  document.getElementById('serviceHistory').innerHTML = html;
}



function openServiceModal() {
  document.getElementById("serviceModal").classList.remove("hidden");
}

function closeServiceModal() {
  document.getElementById("serviceModal").classList.add("hidden");
}

function saveModalServiceEntry() {
  const date = document.getElementById("modalServiceDate").value;
  const issue = document.getElementById("modalIssueReported").value;
  const action = document.getElementById("modalActionTaken").value;
  const tech = document.getElementById("modalTechnicianName").value;

  // You can reuse saveServiceEntry logic or modularize it
  console.log("Saving modal entry:", { date, issue, action, tech });

  closeServiceModal();
}



