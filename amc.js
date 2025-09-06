import { createStatusCard } from "./cards.js";

const spinner = document.getElementById("loadingSpinner");
const container = document.getElementById("amcCards");

spinner.style.display = "block";

fetch("https://script.google.com/macros/s/AKfycbyesB2CEglAW9p0RHy3U4WMLfGiOgSkLJwUKSedOjkrGse29woYUvbjDZnwht_c4v4y/exec?status=AMC")
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
    container.innerHTML = "<p style='color:red;'>Failed to load AMC data.</p>";
    console.error("AMC fetch error:", err);
  })
  .finally(() => {
    spinner.style.display = "none";
  });
