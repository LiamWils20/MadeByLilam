const orderType = document.getElementById("orderType");
const groups = document.querySelectorAll("[data-order-type]");
const orderTotal = document.getElementById("orderTotal");

function updateOrderTotal() {
    const activeGroup = document.querySelector(`[data-order-type="${orderType.value}"]`);
    let total = 0;
    let recurringTotal = 0;

    if (activeGroup) {
        activeGroup.querySelectorAll("select option:checked[data-price-id], input[type='checkbox']:checked[data-price-id]").forEach((field) => {
        const { item, discountedAmount } = getPrice(field.dataset.priceId);
            if (item.suffix) {
                recurringTotal += discountedAmount;
            } else {
                total += discountedAmount;
            }
        });
    }

    orderTotal.textContent = `${currency.format(total)}${recurringTotal > 0 ? ` + ${currency.format(recurringTotal)}/month` : ""}`;
}

function updateOrderFields() {
    groups.forEach((group) => {
        const isActive = group.dataset.orderType === orderType.value;

        group.hidden = !isActive;
        group.querySelectorAll("input, select, textarea").forEach((field) => {
            field.disabled = !isActive;
        });
    });
    updateOrderTotal();
}

orderType.addEventListener("change", updateOrderFields);
document.querySelector("form").addEventListener("change", updateOrderTotal);
document.addEventListener("pricesupdated", updateOrderTotal);
updateOrderFields();