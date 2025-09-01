let machineCount = 0;
const maxMachines = 10;

const machineOptions = [
  "Automated Slide Stainer",
  "Automated Tissue Processor",
  "Bane Saw Machine",
  "Cryostat Microtome",
  "Grossing station",
  "Rotary Microtome",
  "Tissue Embedding Station",
  "Water Baths"
];

function createMachineDropdown(name) {
  const options = machineOptions
    .map(opt => `<option value="${opt}">${opt}</option>`)
    .join("");
  return `
    <label>Machine Type:
      <select name="${name}" required>
        <option value="" disabled selected>Select machine</option>
        ${options}
      </select>
    </label>
  `;
}

document.getElementById("addMachineBtn").addEventListener("click", () => {
  if (machineCount >= maxMachines) return alert("Max 10 machines allowed.");

  const container = document.getElementById("machineContainer");
  const block = document.createElement("div");
  block.className = "machine-block";

  block.innerHTML = `
    ${createMachineDropdown(`machineType${machineCount}`)}
    <label>Serial Number:
      <input type="text" name="serialNumber${machineCount}" required />
      <small style="color: grey; display: block; margin-top: 6px; margin-bottom: 10px;">This is an optional field</small>
    </label>
    <label>Inside Box Details:
      <input type="text" name="boxdetails${machineCount}" />
    </label>
    <label>Notes:
      <input type="text" name="notes${machineCount}" />
      <small style="color: grey; display: block; margin-top: 6px; margin-bottom: 10px;">Include all the important details and observations during installation</small>
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
  }, 3000);
});
