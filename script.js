let machineCount = 0;
const maxMachines = 7;

document.getElementById("addMachineBtn").addEventListener("click", () => {
  if (machineCount >= maxMachines) return alert("Max 7 machines allowed.");

  const container = document.getElementById("machineContainer");
  const block = document.createElement("div");
  block.className = "machine-block";
  block.innerHTML = `
    <label>Machine Type:
      <input type="text" name="machineType${machineCount}" required />
    </label>
    <label>Serial Number:
      <input type="text" name="serialNumber${machineCount}" required />
    </label>
    <label>Status:
      <input type="text" name="status${machineCount}" />
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
  // Placeholder for backend submission
  document.getElementById("toast").classList.remove("hidden");
  setTimeout(() => {
    document.getElementById("toast").classList.add("hidden");
  }, 3000);
});
