// 🌐 Parse POST Data (unchanged)
function parsePostData(e) {
  const raw = e.postData.contents || "";
  return raw.split("&").reduce((acc, pair) => {
    const [key, value = ""] = pair.split("=");
    acc[decodeURIComponent(key.replace(/\+/g, " "))] = decodeURIComponent(value.replace(/\+/g, " "));
    return acc;
  }, {});
}

// 🎛️ Instrument Dropdown Options
function getInstrumentOptions() {
  const instruments = [
    "Automated Slide Stainer", "Automated Tissue Processor", "Bane Saw Machine",
    "Cryostat Microtome", "Grossing station", "Rotary Microtome",
    "Tissue Embedding Station", "Water Baths"
  ];
  return instruments.map(i => `<option value="${i}">${i}</option>`).join("");
}

// 🧩 Equipment Block Template
function createMachineBlock(index) {
  return `
    <div class="machine-block fade-in">
      <div class="block-header">🧩 Equipment Block ${index + 1}</div>

      <label>🧪 Instrument Type:
        <select name="InstrumentType[]" required>
          <option value="" disabled selected>Select instrument</option>
          ${getInstrumentOptions()}
        </select>
      </label>

      <label>🛡️ Warranty Period:
        <select name="warranty[]" required>
          <option value="" disabled selected>Duration</option>
          <option value="1 Year">1 Year</option>
          <option value="2 Years">2 Years</option>
          <option value="3 Years">3 Years</option>
        </select>
      </label>

      <label for="model${index}">Model
        <input type="text" id="model${index}" name="model[]" class="quarter-width" />
      </label>

      <label>🔍 Scan / fetch serial number:
        <input type="text" id="qrResult${index}" name="qrResult[]" readonly />
      </label>

      <div id="qrReader${index}" class="qr-reader"></div>
      <button type="button" data-reader="qrReader${index}" data-result="qrResult${index}" class="scan-btn">📷 Scan</button>

      <label>✏️ Manual QR ID:
        <input type="text" id="qrManual${index}" name="ManualQR[]" />
      </label>

      <label>🔤 Remarks:
        <textarea name="remarks[]" class="full-width" rows="2" placeholder="Add any relevant notes..."></textarea>
      </label>
    </div>
  `;
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
  block.scrollIntoView({ behavior: "smooth", block: "start" });
  showToast(`✅ Equipment block ${count + 1} added`);
  return count + 1;
}

// 📷 QR Scanner Handler
function startQRScan(readerId, resultId) {
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
    errorMessage => console.warn("QR scan error:", errorMessage)
  );
}

// 🍞 Toast Feedback
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.style.display = "block";
  setTimeout(() => (toast.style.display = "none"), 3000);
}

// 🔘 Submit Button State
function toggleSubmitState(isSubmitting) {
  const btn = document.getElementById("submitBtn");
  const spinner = document.getElementById("spinner");
  const overlay = document.getElementById("formOverlay");

  if (spinner) spinner.style.display = isSubmitting ? "block" : "none";
  if (overlay) overlay.style.display = isSubmitting ? "block" : "none";
  if (btn) {
    btn.disabled = isSubmitting;
    btn.textContent = isSubmitting ? "⏳ Submitting..." : "✅ Submit Record";
  }
}

// 🚀 Submit Form Handler
async function handleFormSubmit(e, form, container, resetCounter) {
  e.preventDefault();
  toggleSubmitState(true);

  try {
    const formData = new FormData(form);
    const payload = new URLSearchParams();
    payload.append("submissionTimestamp", new Date().toISOString());

    for (const [key, value] of formData.entries()) {
      payload.append(key, value);
    }

    const response = await fetch("https://script.google.com/macros/s/AKfycbyesB2CEglAW9p0RHy3U4WMLfGiOgSkLJwUKSedOjkrGse29woYUvbjDZnwht_c4v4y/exec", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: payload.toString()
    });

    const result = await response.text();
    console.log("📨 Server response:", result);
    showToast("✅ Record submitted successfully");
    form.reset();
    container.innerHTML = "";
    resetCounter();

  } catch (error) {
    console.error("❌ Submission error:", error);
    showToast("⚠️ Submission failed. Please try again.");
  } finally {
    toggleSubmitState(false);
  }
}

// 📦 DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  const MAX_MACHINES = 10;
  let machineCount = 0;

  const machineContainer = document.getElementById("machineContainer");
  const addMachineBtn = document.getElementById("addMachineBtn");
  const mainForm = document.getElementById("mainForm");

  addMachineBtn?.addEventListener("click", () => {
    machineCount = addMachineBlock(machineContainer, machineCount, MAX_MACHINES);
  });

  document.addEventListener("click", e => {
    if (e.target.classList.contains("scan-btn")) {
      const readerId = e.target.dataset.reader;
      const resultId = e.target.dataset.result;
      startQRScan(readerId, resultId);
    }
  });

  mainForm?.addEventListener("submit", e => {
    handleFormSubmit(e, mainForm, machineContainer, () => (machineCount = 0));
  });
});
