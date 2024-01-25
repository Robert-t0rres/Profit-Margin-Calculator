// Function to save data to localStorage
function saveData() {
    localStorage.setItem('basePrice', document.getElementById('basePrice').value);
    localStorage.setItem('shippingPrice', document.getElementById('shippingPrice').value);
    localStorage.setItem('dynamicInput', document.getElementById('dynamicInput').value);
    localStorage.setItem('toggleCalculation', document.getElementById('toggleCalculation').checked);
}

// Function to load data from localStorage
function loadData() {
    if(localStorage.getItem('basePrice')) {
        document.getElementById('basePrice').value = localStorage.getItem('basePrice');
    }
    if(localStorage.getItem('shippingPrice')) {
        document.getElementById('shippingPrice').value = localStorage.getItem('shippingPrice');
    }
    if(localStorage.getItem('dynamicInput')) {
        document.getElementById('dynamicInput').value = localStorage.getItem('dynamicInput');
    }
    const toggleCalculationChecked = localStorage.getItem('toggleCalculation') === 'true';
    document.getElementById('toggleCalculation').checked = toggleCalculationChecked;
    toggleMode(toggleCalculationChecked);
}

// Function to toggle mode based on the switch state
function toggleMode(isChecked) {
    const dynamicInputLabel = document.getElementById('dynamicInput').previousElementSibling;
    const dynamicOutputLabel = document.getElementById('dynamicOutput');
    
    if (!isChecked) {
        dynamicInputLabel.textContent = "Profit Margin (%)";
        dynamicOutputLabel.innerHTML = "Final Price: $<span id='dynamicOutputValue'></span>";
    } else {
        dynamicInputLabel.textContent = "Final Price";
        dynamicOutputLabel.innerHTML = "Profit Margin: <span id='dynamicOutputValue'></span>%";
    }
}

// Load data when the document is loaded
document.addEventListener('DOMContentLoaded', loadData);

document.getElementById('calculateButton').addEventListener('click', function() {
    // ... [rest of the click event code] ...
    
    // Save data after calculation
    saveData();
});

document.getElementById('toggleCalculation').addEventListener('change', function() {
    const isChecked = document.getElementById('toggleCalculation').checked;
    toggleMode(isChecked);
    saveData();
});

// ... [rest of the script.js code] ...







document.getElementById('calculateButton').addEventListener('click', function() {
    const basePrice = parseFloat(document.getElementById('basePrice').value);
    const shippingPrice = parseFloat(document.getElementById('shippingPrice').value);
    const dynamicInputValue = parseFloat(document.getElementById('dynamicInput').value);
    const isChecked = document.getElementById('toggleCalculation').checked;

    if (isNaN(basePrice) || isNaN(shippingPrice) || isNaN(dynamicInputValue)) {
        alert("Please enter valid numbers in all fields.");
        return;
    }





    let breakEvenPrice = basePrice + shippingPrice;
    breakEvenPrice += breakEvenPrice * 0.0349 + 0.49;
    const breakEvenPriceBeforeRounding = breakEvenPrice; // Save the value before rounding
    breakEvenPrice = roundUpToNearestFiftyCents(breakEvenPrice);

    document.getElementById('breakEvenBeforePrice').textContent = breakEvenPriceBeforeRounding.toFixed(2);
    document.getElementById('breakEvenAfterPrice').textContent = breakEvenPrice.toFixed(2);





    if (!isChecked) {
        // Calculate Final Price
        const finalPrice = breakEvenPrice / (1 - (dynamicInputValue / 100));
        document.getElementById('dynamicOutputValue').textContent = finalPrice.toFixed(2);
        document.getElementById('profitAmount').textContent = (finalPrice - breakEvenPrice).toFixed(2);
    } else {
        // Calculate Profit Margin
        const finalPrice = dynamicInputValue;
        const profitMargin = ((finalPrice - breakEvenPrice) / finalPrice) * 100;
        document.getElementById('dynamicOutputValue').textContent = profitMargin.toFixed(2);
        document.getElementById('profitAmount').textContent = (finalPrice - breakEvenPrice).toFixed(2);
    }
});

document.getElementById('toggleCalculation').addEventListener('change', function() {
    const isChecked = document.getElementById('toggleCalculation').checked;
    const dynamicInputLabel = document.getElementById('dynamicInput').previousElementSibling;
    const dynamicOutputLabel = document.getElementById('dynamicOutput');

    if (!isChecked) {
        dynamicInputLabel.textContent = "Profit Margin (%)";
        dynamicOutputLabel.innerHTML = "Final Price: $<span id='dynamicOutputValue'></span>";
    } else {
        dynamicInputLabel.textContent = "Final Price";
        dynamicOutputLabel.innerHTML = "Profit Margin: <span id='dynamicOutputValue'></span>%";
    }
});

function roundUpToNearestFiftyCents(amount) {
    return Math.ceil(amount * 2) / 2;
}








