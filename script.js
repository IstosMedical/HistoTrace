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

    const qrResultId = `qrResult${machineCount}`;
    const qrManualId = `qrManual${machineCount}`;
    const qrReaderId = `qrReader${machineCount}`;
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

      <label>🔍 Scanned QR ID:
        <input type="text" id="${qrResultId}" readonly />
      </label>

      <div id="${qrReaderId}" style="width: 100%; margin-top: 10px;"></div>
      <button type="button" onclick="startQRScan('${qrReaderId}', '${qrResultId}')">📷 Scan QR Code</button>

      <label>✏️ Manual QR ID (if scan fails):
        <input type="text" id="${qrManualId}" name="ManualQR${machineCount}" />
      </label>
    `;

    machineContainer.appendChild(block);
    machineCount++;
    showToast("✅ Equipment block added");
  }

  // 📷 QR Scan Logic (per block)
  window.startQRScan = function (readerId, resultId) {
    const qrScanner = new Html5Qrcode(readerId);
    qrScanner.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: 250 },
      qrCodeMessage => {
        document.getElementById(resultId).value = qrCodeMessage;
        qrScanner.stop().then(() => {
          document.getElementById(readerId).innerHTML = ""; // Collapse scanner
          showToast("🔍 QR scanned and scanner closed");
        });
      },
      error => {
        console.warn("QR scan error:", error);
        showToast("⚠️ QR scan failed");
      }
    );
  };

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
});
