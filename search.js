document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.querySelector(".az_search_form");
  const searchInput = searchForm.querySelector(".az_search_input");

  
  const meds = [
    "Парацетамол",
    "Ибупрофен",
    "Аспирин",
    "Нурофен"
  ];

 
  const suggestionsContainer = document.createElement("ul");
  suggestionsContainer.style.position = "absolute";
  suggestionsContainer.style.zIndex = "1000";
  suggestionsContainer.style.background = "white";
  suggestionsContainer.style.border = "1px solid #ccc";
  suggestionsContainer.style.listStyle = "none";
  suggestionsContainer.style.margin = 0;
  suggestionsContainer.style.padding = "0";
  suggestionsContainer.style.width = searchInput.offsetWidth + "px";
  suggestionsContainer.style.maxHeight = "200px";
  suggestionsContainer.style.overflowY = "auto";
  suggestionsContainer.style.display = "none";

  searchInput.parentNode.style.position = "relative";
  searchInput.parentNode.appendChild(suggestionsContainer);

  
  searchInput.addEventListener("input", () => {
    const val = searchInput.value.trim().toLowerCase();
    suggestionsContainer.innerHTML = "";
    if (!val) {
      suggestionsContainer.style.display = "none";
      return;
    }

    const filtered = meds.filter(med => med.toLowerCase().includes(val));
    if (filtered.length === 0) {
      suggestionsContainer.style.display = "none";
      return;
    }

    filtered.forEach(med => {
      const li = document.createElement("li");
      li.textContent = med;
      li.style.padding = "5px 10px";
      li.style.cursor = "pointer";

      li.addEventListener("mousedown", e => {
        e.preventDefault(); // чтобы не потерять фокус на input
        searchInput.value = med;
        suggestionsContainer.style.display = "none";
      });

      suggestionsContainer.appendChild(li);
    });

    suggestionsContainer.style.display = "block";
  });

  
  document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
      suggestionsContainer.style.display = "none";
    }
  });

 
  searchForm.addEventListener("submit", e => {
    e.preventDefault();
    const val = searchInput.value.trim();
    if (val) {
      window.location.href = `med.html?search=${encodeURIComponent(val)}`;
    }
  });



  if (window.location.pathname.includes("med.html")) {
    const params = new URLSearchParams(window.location.search);
    const searchQuery = params.get("search");

    const cards = document.querySelectorAll(".med-card");

    if (searchQuery && searchQuery.trim() !== "") {
      let found = false;
      cards.forEach(card => {
        const title = card.querySelector(".med-card-title").textContent.toLowerCase();
        if (title.includes(searchQuery.toLowerCase())) {
          card.style.display = "block";
          found = true;
        } else {
          card.style.display = "none";
        }
      });

      if (!found) {
        const container = document.querySelector(".meds-container");
        const msg = document.createElement("p");
        msg.textContent = "Ничего не найдено.";
        msg.classList.add("text-center", "mt-4", "fs-5");
        container.appendChild(msg);
      }
    } else {
      cards.forEach(card => {
        card.style.display = "block";
      });
    }
  }
});
