// ✅ ISTOS Acknowledgment PDF Logic

function populateAcknowledgment(data) {
  document.getElementById('ack-date').textContent = data.date;
  document.getElementById('ack-customer-name').textContent = data.customerName;
  document.getElementById('ack-customer-name-2').textContent = data.customerName;
  document.getElementById('ack-customer-address').textContent = data.address;
  document.getElementById('ack-engineer').textContent = data.engineer;
  document.getElementById('ack-remarks').textContent = data.remarks;

  const list = document.getElementById('ack-equipment-list');
  list.innerHTML = '';
  data.equipment.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    list.appendChild(li);
  });

  document.getElementById('acknowledgment').style.display = 'block';
  document.getElementById('pdf-button').style.display = 'inline-block';
}

function generatePDF() {
  const element = document.getElementById('acknowledgment');
  const opt = {
    margin: 0.5,
    filename: `istos_acknowledgment_${document.getElementById('ack-customer-name').textContent}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  html2pdf().set(opt).from(element).save();
}
