export async function submitServiceEntry(entry, onSuccess = () => {}, onFailure = () => {}) {
  const endpoint = "https://script.google.com/macros/s/AKfycbyiQJrm2Szvo1yKP-zTreWFsKeq_UFQqY5kY9_Jysqao84fKGgpySaqf4eMPE58huPy/exec";

  // submitServiceEntry.js
export function saveServiceEntry() {
  console.log("Saving service entry...");
}

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
