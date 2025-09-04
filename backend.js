export async function submitServiceEntry(entry, onSuccess = () => {}, onFailure = () => {}) {
  const endpoint = "https://script.google.com/macros/s/AKfycbyiQJrm2Szvo1yKP-zTreWFsKeq_UFQqY5kY9_Jysqao84fKGgpySaqf4eMPE58huPy/exec";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(entry),
      headers: { "Content-Type": "application/json" }
    });

    if (!response.ok) {
      const errorText = await response.text();
      onFailure(errorText);
      return;
    }

    const data = await response.json();
    data.success ? onSuccess(data) : onFailure(data);
  } catch (err) {
    onFailure(err);
  }
}

