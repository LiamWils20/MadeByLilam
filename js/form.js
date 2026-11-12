const orderType = document.getElementById("orderType");
const groups = document.querySelectorAll("[data-order-type]");
const orderTotal = document.getElementById("orderTotal");
const orderTotalSubmission = document.getElementById("orderTotalSubmission");
const orderForm = document.querySelector("form");

function updateOrderTotal() {
    const activeGroup = document.querySelector(`[data-order-type="${orderType.value}"]`);
    let total = 0;
    let recurringTotal = 0;

    if (activeGroup) {
        activeGroup.querySelectorAll("select option:checked[data-price-id], input[type='checkbox']:checked[data-price-id]").forEach((field) => {
            const { item, discountedAmount } = getPrice(field.dataset.priceId);
            if (item.suffix === "/month") {
                recurringTotal += discountedAmount;
            } else {
                total += discountedAmount;
            }
        });
    }

    const totalText = `${currency.format(total)}${recurringTotal > 0 ? ` + ${currency.format(recurringTotal)}/month` : ""}`;
    orderTotal.textContent = totalText;
    orderTotalSubmission.value = totalText;
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
orderForm.addEventListener("change", updateOrderTotal);
orderForm.addEventListener("submit", () => {
    refreshPrices();
    updateOrderTotal();
});
document.addEventListener("pricesupdated", updateOrderTotal);
updateOrderFields();