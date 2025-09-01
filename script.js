let machineCount = 0;
const maxMachines = 10;

document.getElementById("addMachineBtn").addEventListener("click", () => {
  if (machineCount >= maxMachines) return alert("Max 7 machines allowed.");

  const container = document.getElementById("machineContainer");
  const block = document.createElement("div");
  block.className = "machine-block";
  block.innerHTML = `
    <label>Machine Name:
      <input type="text" name="machinename${machineCount}" required />
    </label>
    <label>Serial Number:
      <input type="text" name="serialNumber${machineCount}" required />
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
  // Placeholder for backend submission
  document.getElementById("toast").classList.remove("hidden");
  setTimeout(() => {
    document.getElementById("toast").classList.add("hidden");
  }, 3000);
});
