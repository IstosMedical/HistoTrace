document.addEventListener("DOMContentLoaded", () => {
  const MAX_MACHINES = 10;
  let machineCount = 0;

  const machineContainer = document.getElementById("machineContainer");
  const addMachineBtn = document.getElementById("addMachineBtn");

  // 🧩 Equipment Block Template
  function createMachineBlock(index) {
    const qrResultId = `qrResult${index}`;
    const qrManualId = `qrManual${index}`;
    const qrReaderId = `qrReader${index}`;

    return `
      <label>🧪 Instrument Type:
        <select name="InstrumentType${index}" required>
          <option value="" disabled selected>Select instrument</option>
          ${getInstrumentOptions()}
        </select>
      </label>

      <label>📦 Model:
        <input type="text" name="Model${index}" />
      </label>

      <label>🔢 Serial Number:
        <input type="text" name="Serial${index}" required />
      </label>

      <label>🔍 Scanned QR ID:
        <input type="text" id="${qrResultId}" readonly />
      </label>

      <div id="${qrReaderId}" style="width: 100%; margin-top: 10px;"></div>
      <button type="button" onclick="startQRScan('${qrReaderId}', '${qrResultId}')">📷 Scan QR Code</button>

      <label>✏️ Manual QR ID (if scan fails):
        <input type="text" id="${qrManualId}" name="ManualQR${index}" />
      </label>
    `;
  }

  // 🎛️ Instrument Options
  function getInstrumentOptions() {
    const instruments = [
      "Automated Slide Stainer",
      "Automated Tissue Processor",
      "Bane Saw Machine",
      "Cryostat Microtome",
      "Grossing station",
      "Rotary Microtome",
      "Tissue Embedding Station",
      "Water Baths"
    ];
    return instruments.map(i => `<option value="${i}">${i}</option>`).join("");
  }

  // ➕ Add Equipment Block
  function addMachineBlock() {
    if (machineCount >= MAX_MACHINES) {
      showToast("⚠️ Max 10 machines allowed");
      return;
    }

    const block = document.createElement("div");
    block.className = "machine-block";
    block.innerHTML = createMachineBlock(machineCount);

    machineContainer.appendChild(block);
    machineCount++;
    showToast("✅ Equipment block added");
  }

  // 📷 QR Scan Logic
  window.startQRScan = function (readerId, resultId) {
    const qrScanner = new Html5Qrcode(readerId);
    qrScanner.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: 250 },
      qrCodeMessage => {
        document.getElementById(resultId).value = qrCodeMessage;
        qrScanner.stop().then(() => {
          document.getElementById(readerId).innerHTML = "";
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

  // 🧠 Bind Events
  addMachineBtn.addEventListener("click", addMachineBlock);
});
