document.addEventListener("DOMContentLoaded", () => {
  let machineCount = 0;
  const maxMachines = 10;

  const machineContainer = document.getElementById("machineContainer");
  const addMachineBtn = document.getElementById("addMachineBtn");

  // 🧩 Add Equipment Block
  function addMachineBlock() {
    if (machineCount >= maxMachines) {
      showToast("⚠️ Max 10 machines allowed");
      return;
    }

    const block = document.createElement("div");
    block.className = "machine-block";
    block.innerHTML = `
      <label>🧪 Instrument Type:
        <select name="InstrumentType${machineCount}" required>
          <option value="" disabled selected>Select instrument</option>
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

      <label>📦 Model:
        <input type="text" name="Model${machineCount}" />
      </label>

      <label>🔢 Serial Number:
        <input type="text" name="Serial${machineCount}" required />
      </label>

      <label>👨‍💼 Principal:
        <input type="text" name="Principal${machineCount}" />
      </label>

      <label>🧰 Hardware Version:
        <input type="text" name="Hardware${machineCount}" />
      </label>

      <label>💻 Software Version:
        <input type="text" name="Software${machineCount}" />
      </label>
    `;

    machineContainer.appendChild(block);
    machineCount++;
    showToast("✅ Equipment block added");
  }

  // 📷 QR Scan Logic
  function startQRScan() {
    const qrScanner = new Html5Qrcode("qr-reader");
    qrScanner.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: 250 },
      qrCodeMessage => {
        document.getElementById("qrResult").value = qrCodeMessage;
        qrScanner.stop();
        showToast("🔍 QR scanned");
      },
      error => {
        console.warn("QR scan error:", error);
        showToast("⚠️ QR scan failed");
      }
    );
  }

  // 🔔 Toast Feedback
  function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.style.display = "block";
    setTimeout(() => {
      toast.style.display = "none";
    }, 2000);
  }

  // 🧠 Event Bindings
  addMachineBtn.addEventListener("click", addMachineBlock);
  window.startQRScan = startQRScan;
});
