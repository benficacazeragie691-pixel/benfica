// GANTI nomor di bawah dengan nomor WhatsApp usaha kamu, gunakan kode negara tanpa tanda +.
// Contoh Indonesia: 6281234567890
const WHATSAPP_NUMBER =  "6281234567890";

const productSelect = document.getElementById("product");
const quantityInput = document.getElementById("quantity");
const totalElement = document.getElementById("total");

function rupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency", currency: "IDR", maximumFractionDigits: 0
  }).format(value);
}

function selectedPrice() {
  return Number(productSelect.options[productSelect.selectedIndex].dataset.price || 0);
}

function updateTotal() {
  let quantity = Math.max(1, Math.min(99, Number(quantityInput.value) || 1));
  quantityInput.value = quantity;
  totalElement.textContent = rupiah(selectedPrice() * quantity);
}

productSelect.addEventListener("change", updateTotal);
quantityInput.addEventListener("input", updateTotal);
document.getElementById("minus").addEventListener("click", () => {
  quantityInput.value = Math.max(1, Number(quantityInput.value || 1) - 1);
  updateTotal();
});
document.getElementById("plus").addEventListener("click", () => {
  quantityInput.value = Math.min(99, Number(quantityInput.value || 1) + 1);
  updateTotal();
});

document.querySelectorAll(".select-product").forEach(button => {
  button.addEventListener("click", () => {
    const card = button.closest(".product-card");
    productSelect.value = card.dataset.product;
    updateTotal();
    document.getElementById("pesanan").scrollIntoView({ behavior: "smooth" });
  });
});

document.getElementById("order-form").addEventListener("submit", event => {
  event.preventDefault();
  if (WHATSAPP_NUMBER === "6281234567890") {
    const proceed = confirm("Nomor WhatsApp masih contoh. Tetap buka WhatsApp untuk melihat format pesan? Ganti nomor di file script.js sebelum web dipublikasikan.");
    if (!proceed) return;
  }
  const product = productSelect.value;
  const size = document.getElementById("size").value;
  const quantity = Math.max(1, Number(quantityInput.value) || 1);
  const customer = document.getElementById("customer").value.trim();
  const notes = document.getElementById("notes").value.trim();
  const total = selectedPrice() * quantity;
  const message = [
    "Halo KAOSKU, saya ingin memesan kaos.",
    "",
    `Nama: ${customer}`,
    `Produk: ${product}`,
    `Ukuran: ${size}`,
    `Jumlah: ${quantity} pcs`,
    `Estimasi total: ${rupiah(total)}`,
    notes ? `Catatan: ${notes}` : "",
    "",
    "Mohon info ketersediaan stok dan ongkir. Terima kasih!"
  ].filter(Boolean).join("\\n");
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
});
updateTotal();
