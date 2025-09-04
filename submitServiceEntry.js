// submitServiceEntry.js

/**
 * Handles saving service entry data from the form.
 * Extend this with API calls, PDF generation, or logging as needed.
 */
import { submitServiceEntry } from './submitServiceEntry.js'; // Ensure this import exists if modular

export function saveServiceEntry() {
  const customerName = document.getElementById('customerName').value.trim();
  const serviceDate = document.getElementById('serviceDate').value;
  const remarks = document.getElementById('remarks').value.trim();

  if (!customerName || !serviceDate || !remarks) {
    alert("⚠️ Please fill in all fields before saving.");
    return;
  }

  const entry = {
    customer: customerName,
    date: serviceDate,
    remarks: remarks,
    timestamp: new Date().toISOString()
  };

  console.log("✅ Service entry prepared:", entry);

  // 🔗 Send to backend
  submitServiceEntry(entry,
    () => console.log("🎉 Entry successfully submitted."),
    (err) => console.error("🛠️ Submission failed:", err)
  );
}


export async function submitServiceEntry(entry, onSuccess = () => {}, onFailure = () => {}) {
  const endpoint = "https://script.google.com/macros/s/AKfycbyiQJrm2Szvo1yKP-zTreWFsKeq_UFQqY5kY9_Jysqao84fKGgpySaqf4eMPE58huPy/exec";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(entry),
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Backend error:", response.status, errorText);
      alert("🚨 Backend error. Check console or network.");
      onFailure(errorText);
      return;
    }

    const data = await response.json();
    console.log("✅ Backend response:", data);

    if (data.success) {
      alert("✅ Service entry saved to ServiceForm sheet!");
      onSuccess(data);
    } else {
      alert("❌ Failed to save entry. Try again.");
      onFailure(data);
    }
  } catch (err) {
    console.error("❌ Fetch failed:", err);
    alert("🚨 Network error. Check console.");
    onFailure(err);
  }
}
