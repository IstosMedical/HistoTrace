let machineCount = 0;
const maxMachines = 10;

document.getElementById("addMachineBtn").addEventListener("click", () => {
  if (machineCount >= maxMachines) return alert("Max 10 machines allowed.");

  const container = document.getElementById("machineContainer");
  const block = document.createElement("div");
  block.className = "machine-block";

  block.innerHTML = `
    <label>Machine Type:
      <select name="machineType${machineCount}" required>
        <option value="" disabled selected>Select machine</option>
        <option value="Automated Slide Stainer">Automated Slide Stainer</option>
        <option value="Automated Tissue Processor">Automated Tissue Processor</option>
        <option value="Bane Saw Machine">Bane Saw Machine</option>
        <option value="Cryostat Microtome">Cryostat Microtome</option>
        <option value="Grossing station">Grossing station</option>
        <option value="Rotary Microtome">Rotary Microtome</option>
        <option value="Tissue Embedding Station">Tissue Embedding Station</option>
        <option value="Water Baths">Water Baths</option>
      </select>
    </label>
    <label>Serial Number:
      <input type="text" name="serialNumber${machineCount}" />
    </label>
    <label>Inside Box Details:
      <input type="text" name="boxdetails${machineCount}" />
    </label>
    <label>Notes:
      <input type="text" name="notes${machineCount}" />
    </label>
  `;

  container.appendChild(block);
  machineCount++;
});


document.getElementById("installForm").addEventListener("submit", (e) => {
  e.preventDefault();
  document.getElementById("toast").classList.remove("hidden");
  setTimeout(() => {
    document.getElementById("toast").classList.add("hidden");



function showToast(message) {
  const toast = document.createElement('div');
  toast.id = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
}

// Call this after adding a machine block
showToast('Machine added ✅');

  }, 3000);
});
