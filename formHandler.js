export function collectServiceEntry() {
  const dateInput = document.getElementById('serviceDate');
  const issueReported = document.getElementById('issueReported');
  const actionTaken = document.getElementById('actionTaken');
  const technicianName = document.getElementById('technicianName');

  if (!dateInput || !issueReported || !actionTaken || !technicianName) {
    console.error("❌ Missing form fields. Check HTML IDs.");
    alert("🚨 Form setup error. Contact admin.");
    return {};
  }

  return {
    serviceDate: dateInput.value.trim(),
    issue: issueReported.value.trim(),
    actionTaken: actionTaken.value.trim(),
    technician: technicianName.value.trim(),
    timestamp: new Date().toISOString()
  };
}

export function validateServiceEntry(entry) {
  const { serviceDate, issue, actionTaken, technician } = entry;

  if (!serviceDate || !issue || !actionTaken || !technician) {
    console.warn("⚠️ Incomplete service entry:", entry);
    return false;
  }

  return true;
}
