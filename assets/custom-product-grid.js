document.addEventListener("DOMContentLoaded", () => {
  const gridItems = document.querySelectorAll(".grid-item");

  // Hover effect (scale image)
  gridItems.forEach(item => {
    const img = item.querySelector("img");
    if (img) {
      item.addEventListener("mouseenter", () => {
        img.style.transform = "scale(1.05)";
        img.style.transition = "transform 0.3s ease";
      });
      item.addEventListener("mouseleave", () => {
        img.style.transform = "scale(1)";
      });
    }
  });

  // Example: filter functionality (by data-attribute)
  const filterButtons = document.querySelectorAll("[data-filter]");
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");

      gridItems.forEach(item => {
        if (filter === "all" || item.dataset.category === filter) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
});
