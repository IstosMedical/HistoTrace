document.addEventListener("DOMContentLoaded", () => {
  const MAX_MACHINES = 10;
  let machineCount = 0;

  const machineContainer = document.getElementById("machineContainer");
  const addMachineBtn = document.getElementById("addMachineBtn");
  const installForm = document.getElementById("installForm");

  // 🧩 Equipment Block Template
  function createMachineBlock(index) {
    const qrResultId = `qrResult${index}`;
    const qrManualId = `qrManual${index}`;
    const qrReaderId = `qrReader${index}`;
    const modelId = `model${index}`;

    return `
      <div class="machine-block">
        <label>🧪 Instrument Type:
          <select name="InstrumentType${index}" required>
            <option value="" disabled selected>Select instrument</option>
            ${getInstrumentOptions()}
          </select>
        </label>

        <label for="${modelId}">Model</label>
        <input type="text" id="${modelId}" name="model${index}" class="quarter-width" />

        <label>🔍 Scan QR ID / fetch serial number:
          <input type="text" id="${qrResultId}" name="qrResult${index}" readonly />
        </label>

        <div id="${qrReaderId}" style="width: 100%; margin-top: 10px;"></div>
        <button type="button" onclick="startQRScan('${qrReaderId}', '${qrResultId}')">📷 Scan QR Code</button>

        <label>✏️ Manual QR ID (if scan fails):
          <input type="text" id="${qrManualId}" name="ManualQR${index}" />
        </label>
      </div>
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
    block.innerHTML = createMachineBlock(machineCount);
    machineContainer.appendChild(block);
    machineCount++;
    showToast("✅ Equipment block added");
  }

  // 📷 QR Scan Logic using Html5QrcodeScanner
  window.startQRScan = function (readerId, resultId) {
    const scanner = new Html5QrcodeScanner(readerId, {
      fps: 10,
      qrbox: 250,
      rememberLastUsedCamera: true,
      showTorchButtonIfSupported: true,
      aspectRatio: 1.5
    });

    scanner.render(
      qrCodeMessage => {
        document.getElementById(resultId).value = qrCodeMessage;
        scanner.clear();
        showToast("✅ QR scanned successfully");
      },
      errorMessage => {
        console.warn("QR scan error:", errorMessage);
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
    }, 3000);
  }

  // 📤 Form Submission
  installForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const payload = new URLSearchParams();

    for (const [key, value] of formData.entries()) {
      payload.append(key, value);
    }

    fetch("https://script.google.com/macros/s/AKfycbyiQJrm2Szvo1yKP-zTreWFsKeq_UFQqY5kY9_Jysqao84fKGgpySaqf4eMPE58huPy/exec", {
      method: "POST",
      body: payload
    })
      .then(response => response.text())
      .then(data => {
        showToast(data);
        this.reset();
        machineContainer.innerHTML = "";
        machineCount = 0;
      })
      .catch(error => {
        console.error("Submission error:", error);
        showToast("⚠️ Submission failed");
      });
  });

  // 🧠 Bind Events
  addMachineBtn.addEventListener("click", addMachineBlock);
});
