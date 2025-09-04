import { collectServiceEntry, validateServiceEntry } from './formHandler.js';
import { submitServiceEntry } from './backend.js';
import { logEntry, logError } from './logger.js';

export function saveServiceEntry() {
  const entry = collectServiceEntry();

  if (!validateServiceEntry(entry)) {
    alert("⚠️ Please fill in all fields before saving.");
    return;
  }

  logEntry(entry);

  submitServiceEntry(entry,
    () => alert("✅ Entry saved to ServiceForm sheet!"),
    (err) => {
      logError("Submission failed", err);
      alert("🚨 Error saving entry. Check console.");
    }
  );
}

export function validateServiceEntry(entry) {
  const { serviceDate, issue, actionTaken, technician } = entry;

  if (!serviceDate || !issue || !actionTaken || !technician) {
    console.warn("⚠️ Incomplete service entry:", entry);
    return false;
  }

  return true;
}


document.getElementById("saveButton").addEventListener("click", saveServiceEntry);
