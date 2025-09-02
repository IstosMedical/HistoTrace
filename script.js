// 🌐 Parse POST Data (unchanged)
function parsePostData(e) {
  const raw = e.postData.contents || "";
  return raw.split("&").reduce((acc, pair) => {
    const [key, value = ""] = pair.split("=");
    const decodedKey = decodeURIComponent(key.replace(/\+/g, " "));
    const decodedValue = decodeURIComponent(value.replace(/\+/g, " "));
    acc[decodedKey] = decodedValue;
    return acc;
  }, {});
}


function createMachineBlock(index) {
  return `
    <div class="machine-block">
      <div class="block-header" style="margin-bottom: 8px; font-weight: bold; font-size: 1.1em;">
        🧩 Equipment Block ${index + 1}
      </div>

      <label>🧪 Instrument Type:
        <select name="InstrumentType[]" required>
          <option value="" disabled selected>Select instrument</option>
          ${getInstrumentOptions()}
        </select>
      </label>

      <label for="model${index}">Model</label>
      <input type="text" id="model${index}" name="model[]" class="quarter-width" />

      <label>🔍 Scan QR ID / fetch serial number:
        <input type="text" id="qrResult${index}" name="qrResult[]" readonly />
      </label>

      <div id="qrReader${index}" style="width: 100%; margin-top: 10px;"></div>
      <button type="button" data-reader="qrReader${index}" data-result="qrResult${index}" class="scan-btn">📷 Scan QR Code</button>

      <label>✏️ Manual QR ID (if scan fails):
        <input type="text" id="qrManual${index}" name="ManualQR[]" />
      </label>
    </div>
  `;
}


// 🧩 Equipment Block Template (array-style names)
function createMachineBlock(index) {
  return `
    <div class="machine-block">
      <label>🧪 Instrument Type:
        <select name="InstrumentType[]" required>
          <option value="" disabled selected>Select instrument</option>
          ${getInstrumentOptions()}
        </select>
      </label>

      <label for="model${index}">Model</label>
      <input type="text" id="model${index}" name="model[]" class="quarter-width" />

      <label>🔍 Scan QR ID / fetch serial number:
        <input type="text" id="qrResult${index}" name="qrResult[]" readonly />
      </label>

      <div id="qrReader${index}" style="width: 100%; margin-top: 10px;"></div>
      <button type="button" data-reader="qrReader${index}" data-result="qrResult${index}" class="scan-btn">📷 Scan QR Code</button>

      <label>✏️ Manual QR ID (if scan fails):
        <input type="text" id="qrManual${index}" name="ManualQR[]" />
      </label>
    </div>
  `;
}

// 🎛️ Instrument Dropdown Options
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
function addMachineBlock(container, count, max) {
  if (count >= max) {
    showToast("⚠️ Max 10 machines allowed");
    return count;
  }
  const block = document.createElement("div");
  block.innerHTML = createMachineBlock(count);
  container.appendChild(block);
  showToast(`✅ Equipment block ${count + 1} added`);
  return count + 1;
}

// 📦 DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  const MAX_MACHINES = 10;
  let machineCount = 0;

  const machineContainer = document.getElementById("machineContainer");
  const addMachineBtn = document.getElementById("addMachineBtn");

  addMachineBtn?.addEventListener("click", () => {
    machineCount = addMachineBlock(machineContainer, machineCount, MAX_MACHINES);
  });

  // 📷 QR Scanner Delegation
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("scan-btn")) {
      const readerId = e.target.dataset.reader;
      const resultId = e.target.dataset.result;
      startQRScan(readerId, resultId);
    }
  });
});

// 📷 QR Scanner Handler
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

// 🍞 Toast Feedback
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.style.display = "block";
  setTimeout(() => {
    toast.style.display = "none";
  }, 3000);
}

// ⚙️ Spinner Helpers
function showSpinner() {
  document.getElementById("spinner").style.display = "block";
}

function hideSpinner() {
  document.getElementById("spinner").style.display = "none";
}

// 📤 Form Submission Handler
installForm.addEventListener("submit", function (e) {
  e.preventDefault();
  showSpinner();

  const formData = new FormData(this);
  const payload = new URLSearchParams();

  for (const [key, value] of formData.entries()) {
    payload.append(key, value);
  }

  fetch("https://script.google.com/macros/s/AKfycbyiQJrm2Szvo1yKP-zTreWFsKeq_UFQqY5kY9_Jysqao84fKGgpySaqf4eMPE58huPy/exec", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: payload.toString()
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
    })
    .finally(() => {
      hideSpinner();
    });
});
