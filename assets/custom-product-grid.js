document.addEventListener("DOMContentLoaded", () => {
    const popup = document.querySelector("product-popup");
    const popupContent = document.querySelector("#popup-content");
    const closeBtn = document.querySelector("#popup-close");

    // open popup
    document.querySelectorAll(" .open-popup"). forEach(btn=>{
        btn.addEventListener("click", async () => {
            let handle = btn.dataset.handle;
            let res = await fetch(`/products/${handle}.js`);
            let product = await res.json();

            popupContent.innerHTML = `
            <h2>${product.title}</h2>
            <p><strong>Price:</strong> ${(product.price / 100) .toFixed(2)}${Shopify.currency.active}</p>
            <p>${product.description}</p>
            <select id="Variants-select">
            ${product.Variants.map(v => `<option value="${v.id}">${v.title}</option>`).join(" ")}
            </select>
            
            <button id ="add-to-cart">Add to Cart</button>
            `;
            popup.style.display = "flex";

            // Add to Cart 
            document.querySelector("#add-to-cart").onclick = async ()=>{
                let variantId = document.querySelector("#variant-select").value;

                await fetch("/cart/add.js", {
                    method:"POST",
                    headers: {"Content-Type":"application/json"},
                    body: JSON.stringify({id: variantId, quantity:1})
                });

                let selectVariant = product.Variants.find(v => v.id == variantId);
                if(selectedvariant.title.includes("Black") && selectedvariant.title.includes("Medium")) {
                    let jacket= await fetch(`/products/soft-winter-jacket.js`);
                    let jacketData = await jacket.json();
                    let jacketVariant = jacketData.Variants[0];
                    await fetch("/cart/add.js", {
                        method: "POST",
                        headers: {"Content-Type": "applications/json"},
                        body: JSON.stringify({id: jacketVariant.id, quantity: 1})
                    });
                }
                alert("Product added to Cart!");
            };
        });
    });
    // close popup
closeBtn.addEventListener("click", () => popup.style.display = "none");
popup.addEventListener("click", e => {
    if (e.target === popup) popup.style.display = "none";
});
});