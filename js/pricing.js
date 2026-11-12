// Edit each amount and percentage discount here; ranges use minDiscount and maxDiscount.
// The configured discounts apply until this date/time (UTC; the UK is on GMT in November).
const promotionEndsAt = new Date("2026-11-30T23:59:59Z");

const pricing = {
    websiteServices: {
        name: "Website Services",
        minAmount: 20,
        maxAmount: 350,
        minDiscount: 10,
        maxDiscount: 40
    },
    gameDevServices: {
        name: "Game-Dev Services",
        minAmount: 20,
        maxAmount: 300,
        minDiscount: 10,
        maxDiscount: 40
    },
    printingServices: {
        name: "Printing Services",
        minAmount: 5,
        maxAmount: 150,
        minDiscount: 10,
        maxDiscount: 40
    },
    
    
    websiteStarter: { name: "Starter Pack", amount: 99, discount: 25 },
    websiteBasic: { name: "Basic Pack", amount: 150, discount: 30 },
    websiteUltimate: { name: "Ultimate Pack", amount: 350, discount: 40 },

    websiteAdditionalPage: { name: "Additional Page", amount: 40, discount: 10 },
    websiteAdditionalRevision: { name: "Additional Revision", amount: 20, discount: 10},
    websiteGallery: { name: "Gallery Section", amount: 25, discount: 10 },
    websiteMaintenance: { name: "Monthly Maintenance", amount: 35, discount: 0, suffix: "/month" },

    gameFixer: { name: "The Fixer", amount: 40, discount: 25 },
    gameBuilder: { name: "The Builder", amount: 100, discount: 30 },
    gameCreator: { name: "The Creator", amount: 300, discount: 40 },

    gameSmallScript: { name: "Small Script Modifications", amount: 20, discount: 10 },
    gameUnityUI: { name: "Unity UI Implementation", amount: 40, discount: 10 },
    gameHealthSystem: { name: "Health System Implementation", amount: 50, discount: 10 },
    gameInventory: { name: "Inventory System Implementation", amount: 90, discount: 10 },
    gameCharacterController: { name: "Character Controller", amount: 120, discount: 10 },
    gameEnemyAI: { name: "Basic Enemy AI", amount: 60, discount: 10 },
    gameSaveLoad: { name: "Save and Load Functionality", amount: 65, discount: 10 },
    gameGameplayMechanic: { name: "Gameplay Mechanic Implementation", amount: 25, discount: 10 },
    gameProjectDebugging: { name: "Project Playtest / Debugging Session", amount: 25, discount: 10 },
    gameCodeReview: { name: "Code Review and Optimisation", amount: 50, discount: 10 },

    printMyModel: { name: "Print My Model", amount: 5, suffix: "+ A free quote will be sent to your inbox", discount: 10 },
    customiseMyModel: { name: "Customise My Model", amount: 10, suffix: "+ A free quote will be sent to your inbox", discount: 10 },
    createMyModel: { name: "Create My Model", amount: 20, suffix: "+ A free quote will be sent to your inbox", discount: 10 }
};

const currency = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 2
});

function getPrice(priceId) {
    const item = pricing[priceId];
    if (!item) {
        throw new Error(`No pricing configured for "${priceId}".`);
    }

    const isRange = item.minAmount !== undefined || item.maxAmount !== undefined;
    const validAmount = (amount) => Number.isFinite(amount) && amount >= 0;
    const minDiscount = isRange
        ? item.minDiscount !== undefined ? item.minDiscount : item.discount
        : item.discount;
    const maxDiscount = isRange
        ? item.maxDiscount !== undefined ? item.maxDiscount : item.discount
        : item.discount;
    const validDiscount = (discount) =>
        Number.isFinite(discount) && discount >= 0 && discount <= 100;
    if ((isRange
            ? !validAmount(item.minAmount) || !validAmount(item.maxAmount) || item.minAmount > item.maxAmount
            : !validAmount(item.amount)) ||
        (isRange
            ? !validDiscount(minDiscount) || !validDiscount(maxDiscount)
            : !validDiscount(item.discount))) {
        throw new Error(`Invalid price or discount configured for "${priceId}".`);
    }

    const promotionActive = Date.now() < promotionEndsAt.getTime();
    const discount = promotionActive ? item.discount : 0;
    const appliedMinDiscount = isRange && promotionActive ? minDiscount : 0;
    const appliedMaxDiscount = isRange && promotionActive ? maxDiscount : 0;
    const applyDiscount = (amount, percentage) =>
        Math.round(amount * (1 - percentage / 100) * 100) / 100;
    return {
        item,
        discount,
        isRange,
        minDiscount: appliedMinDiscount,
        maxDiscount: appliedMaxDiscount,
        discountedAmount: isRange ? undefined : applyDiscount(item.amount, discount),
        discountedMinAmount: isRange ? applyDiscount(item.minAmount, appliedMinDiscount) : undefined,
        discountedMaxAmount: isRange ? applyDiscount(item.maxAmount, appliedMaxDiscount) : undefined
    };
}

function updatePriceDisplay(element) {
    const {
        item,
        discount,
        isRange,
        minDiscount,
        maxDiscount,
        discountedAmount,
        discountedMinAmount,
        discountedMaxAmount
    } =
        getPrice(element.dataset.priceId);
    const suffix = item.suffix || "";
    const formatRange = (minAmount, maxAmount) =>
        `${currency.format(minAmount)}–${currency.format(maxAmount)}`;
    const discountedPrice = isRange
        ? formatRange(discountedMinAmount, discountedMaxAmount)
        : currency.format(discountedAmount);
    const originalPrice = isRange
        ? formatRange(item.minAmount, item.maxAmount)
        : currency.format(item.amount);
    const value = `${item.name} | ${discountedPrice}${suffix}`;
    const hasDiscount = isRange ? minDiscount > 0 || maxDiscount > 0 : discount > 0;
    const discountDescription = isRange
        ? `minimum ${minDiscount}% off and maximum ${maxDiscount}% off`
        : `${discount}% off`;

    if (element instanceof HTMLImageElement) {
        let wrapper = element.parentElement;
        if (!wrapper || !wrapper.classList.contains("price-image")) {
            wrapper = document.createElement("span");
            wrapper.className = "price-image";
            element.parentNode.insertBefore(wrapper, element);
            wrapper.appendChild(element);
        } else {
            const existingTag = wrapper.querySelector(".price-tag");
            if (existingTag) {
                existingTag.remove();
            }
        }

        const tag = document.createElement("span");
        tag.className = isRange ? "price-tag price-tag--center" : "price-tag";
        tag.setAttribute("aria-label", hasDiscount
            ? `${originalPrice} reduced to ${discountedPrice}${suffix}, ${discountDescription}`
            : `${discountedPrice}${suffix}`);

        if (hasDiscount) {
            tag.innerHTML = `<del class="price-original">${originalPrice}${suffix}</del>
                <span class="price-current">${discountedPrice}${suffix}</span>
                <span class="price-discount">${isRange
                    ? `Min: ${minDiscount}% OFF · Max: ${maxDiscount}% OFF`
                    : `${discount}% OFF`}</span>`;
        } else {
            tag.innerHTML = `<span class="price-current">${discountedPrice}${suffix}</span>`;
        }

        wrapper.appendChild(tag);
        return;
    }

    if (element instanceof HTMLOptionElement) {
        element.textContent = value;
        element.value = value;
        return;
    }

    element.textContent = value;
}

function refreshPrices() {
    document.querySelectorAll("img[data-price-id], option[data-price-id], [data-price-label]").forEach((element) => {
        if (element.hasAttribute("data-price-label")) {
            element.dataset.priceId = element.dataset.priceLabel;
        }
        updatePriceDisplay(element);
    });

    document.querySelectorAll('input[type="checkbox"][data-price-id]').forEach((element) => {
        const { item, isRange, discountedAmount, discountedMinAmount, discountedMaxAmount } =
            getPrice(element.dataset.priceId);
        const price = isRange
            ? `${currency.format(discountedMinAmount)}–${currency.format(discountedMaxAmount)}`
            : currency.format(discountedAmount);
        element.value = `${item.name} | ${price}${item.suffix || ""}`;
    });

    document.dispatchEvent(new Event("pricesupdated"));
}

const countdownElement = document.getElementById("specialEventCountdown");
const countdownLabel = document.getElementById("specialEventCountdownLabel");
const eventBanner = document.getElementById("specialEventBanner");
const eventMessage = document.getElementById("specialEventMessage");

function updatePromotionCountdown() {
    const remaining = promotionEndsAt.getTime() - Date.now();
    if (remaining <= 0) {
        countdownLabel.textContent = "Offer status";
        countdownElement.textContent = "Offer ended";
        countdownElement.setAttribute("aria-label", "Black Friday offer ended");
        eventMessage.textContent = "The Black Friday offer has ended. Standard pricing is now in effect.";
        eventBanner.classList.add("event-ended");
        refreshPrices();
        clearInterval(countdownInterval);
        return;
    }

    const totalSeconds = Math.floor(remaining / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

refreshPrices();
const countdownInterval = setInterval(updatePromotionCountdown, 1000);
updatePromotionCountdown();
