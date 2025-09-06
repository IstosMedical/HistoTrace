import { createStatusCard } from "./cards.js";

const spinner = document.getElementById("loadingSpinner");
const container = document.getElementById("expiredCards");

spinner.style.display = "block";

fetch("https://script.google.com/macros/s/AKfycbzbTMJTuvtsQEUHZyHfpf5u9SrgPboVptTHYrgTT41myd_c8coeb2djh2aUXaP5zF9t/exec?status=Expired")
  .then(res => res.json())
  .then(data => {
    container.innerHTML = "";

    data.forEach((entry, index) => {
      const card = createStatusCard(entry);
      card.style.animationDelay = `${index * 100}ms`; // Staggered fade-in
      container.appendChild(card);
    });
  })
  .catch(err => {
    container.innerHTML = "<p style='color:red;'>Failed to load Expired data.</p>";
    console.error("Expired fetch error:", err);
  })
  .finally(() => {
    spinner.style.display = "none";
  });
