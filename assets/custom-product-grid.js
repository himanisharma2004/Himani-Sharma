document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("product-popup");
  const popupTitle = document.getElementById("popup-title");
  const popupPrice = document.getElementById("popup-price");
  const popupDesc = document.getElementById("popup-description");
  const popupVariants = document.getElementById("popup-variants");
  const popupAddBtn = document.getElementById("popup-add-to-cart");
  const closeBtn = document.querySelector(".product-popup-close");

  let selectedVariant = null;

  // Open popup on grid item click
  document.querySelectorAll(".grid-item").forEach(item => {
    item.addEventListener("click", async () => {
      const handle = item.dataset.handle;
      const res = await fetch(`/products/${handle}.js`);
      const product = await res.json();

      popupTitle.textContent = product.title;
      popupPrice.textContent = (product.price / 100).toFixed(2) + " " + Shopify.currency.active;
      popupDesc.innerHTML = product.description;

      // Variants dropdown
      popupVariants.innerHTML = "";
      if (product.variants.length > 1) {
        const select = document.createElement("select");
        product.variants.forEach(v => {
          const opt = document.createElement("option");
          opt.value = v.id;
          opt.textContent = v.title + " - " + (v.price / 100).toFixed(2) + " " + Shopify.currency.active;
          select.appendChild(opt);
        });
        select.addEventListener("change", e => {
          selectedVariant = e.target.value;
        });
        popupVariants.appendChild(select);
        selectedVariant = product.variants[0].id;
      } else {
        selectedVariant = product.variants[0].id;
      }

      popup.classList.remove("hidden");
    });
  });

  // Close popup
  closeBtn.addEventListener("click", () => {
    popup.classList.add("hidden");
  });

  // Add to Cart
  popupAddBtn.addEventListener("click", async () => {
    if (!selectedVariant) return;

    await fetch("/cart/add.js", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: selectedVariant, quantity: 1 })
    });

    // Bonus Rule: If Black + Medium, also add Soft Winter Jacket
    const selectedText = document.querySelector("#popup-variants select")?.selectedOptions[0]?.textContent || "";
    if (selectedText.includes("Black") && selectedText.includes("Medium")) {
      const jacket = await fetch("/products/soft-winter-jacket.js").then(r => r.json());
      const jacketVariant = jacket.variants[0].id;
      await fetch("/cart/add.js", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: jacketVariant, quantity: 1 })
      });
    }

    alert("Added to cart!");
    popup.classList.add("hidden");
  });
});
