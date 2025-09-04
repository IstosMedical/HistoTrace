// 📦 Import backend handler
import { submitServiceEntry } from './submitServiceEntry.js';

// 🧾 Expose inline save for HTML onclick
window.saveServiceEntry = saveServiceEntry;

// 🔍 Fetch installation details from localStorage
function fetchInstallation() {
  const input = document.getElementById('searchInput').value.trim();
  const installations = JSON.parse(localStorage.getItem('installations')) || [];

  const record = installations.find(r =>
    r.customerName.toLowerCase().includes(input.toLowerCase()) ||
    r.equipment.some(eq => eq.qrCode === input)
  );

  if (record) {
    displayInstallation(record);
    showServiceHistory(input);
  } else {
    document.getElementById('installationDetails').innerHTML = "❌ No record found.";
    document.getElementById('serviceHistory').innerHTML = "";
  }
}

// 🖼️ Render installation block
function displayInstallation(record) {
  let html = `<h4>📍 ${record.customerName} – ${record.location}</h4><ul>`;
  record.equipment.forEach(eq => {
    html += `<li>🔹 ${eq.instrument} (${eq.model}) – QR: ${eq.qrCode}</li>`;
  });
  html += `</ul>`;
  document.getElementById('installationDetails').innerHTML = html;
}

// 🧾 Inline form save
function saveServiceEntry() {
  const qr = document.getElementById('searchInput').value.trim();
  const serviceDate = document.getElementById('serviceDate').value;
  const issue = document.getElementById('issueReported').value.trim();
  const actionTaken = document.getElementById('actionTaken').value.trim();
  const technician = document.getElementById('technicianName').value.trim();

  if (!serviceDate || !issue || !actionTaken || !technician) {
    alert("⚠️ Please fill all fields before saving.");
    return;
  }

  const entry = {
    qrCode: qr,
    serviceDate,
    issue,
    actionTaken,
    technician,
    timestamp: new Date().toISOString()
  };

  console.log("📦 Submitting service entry:", entry);

  submitServiceEntry(
    entry,
    () => {
      console.log("✅ Entry saved successfully.");
      showServiceHistory(qr);
    },
    (err) => {
      console.warn("❌ Save failed:", err);
      alert("🚨 Could not save entry. Check console or network.");
    }
  );
}

// 🧾 Modal form save
function saveModalServiceEntry() {
  const qr = document.getElementById('searchInput').value.trim();
  const serviceDate = document.getElementById("modalServiceDate").value;
  const issue = document.getElementById("modalIssueReported").value.trim();
  const actionTaken = document.getElementById("modalActionTaken").value.trim();
  const technician = document.getElementById("modalTechnicianName").value.trim();

  if (!serviceDate || !issue || !actionTaken || !technician) {
    alert("⚠️ Please fill all fields before saving.");
    return;
  }

  const entry = {
    qrCode: qr,
    serviceDate,
    issue,
    actionTaken,
    technician,
    timestamp: new Date().toISOString()
  };

  console.log("📦 Submitting modal entry:", entry);

  submitServiceEntry(
    entry,
    () => {
      console.log("✅ Modal entry saved.");
      showServiceHistory(qr);
    },
    (err) => {
      console.warn("❌ Modal save failed:", err);
      alert("🚨 Could not save modal entry.");
    }
  );

  closeServiceModal();
}

// 📋 Show service history (still local for now)
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

// 🏷️ Status badge logic
function getStatusBadge(entry) {
  if (!entry.actionTaken || entry.actionTaken.toLowerCase().includes("pending")) {
    return "🔧 In Progress";
  }
  return "✅ Completed";
}

// 🪟 Modal controls
function openServiceModal() {
  document.getElementById("serviceModal").classList.remove("hidden");
}

function closeServiceModal() {
  document.getElementById("serviceModal").classList.add("hidden");
}
