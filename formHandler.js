export function collectServiceEntry() {
  return {
    customer: document.getElementById('customerName').value.trim(),
    date: document.getElementById('serviceDate').value,
    remarks: document.getElementById('remarks').value.trim(),
    timestamp: new Date().toISOString()
  };
}

export function validateServiceEntry(entry) {
  return entry.customer && entry.date && entry.remarks;
}

