// Loads JSON
var data = null;
window.addEventListener("load", (event) => {
  data = fetch('data.json')
  .then((response) => response.json())
  .then((result) => (this.data = result));
});

document.getElementById('dropDownWages').addEventListener('change', () => {
    getHourlyComp();
    performCalculations();
});

document.getElementById('startComp').addEventListener('keyup', resetCustomWageDropDown);
document.getElementById('endComp').addEventListener('keyup', resetCustomWageDropDown);
document.getElementById('clearButton').addEventListener('click', clear);

const inputFields = document.querySelectorAll('input');
inputFields.forEach(input => {input.addEventListener('keyup', performCalculations);});

function performCalculations() {
    if (allInputFieldsNotEmpty()) {
        calculateTimePrice();
        finishSentence();
    }
}

function getHourlyComp() {
    var selectElement = document.getElementById('dropDownWages');
    let startComp;
    let endComp;
  
    switch (selectElement.value) {
      case "Custom Wage":
        startComp = document.getElementById("startComp").value;
        endComp = document.getElementById("endComp").value;
        break;
      case "U.S. Blue Collar":
        startComp = data.data[startYear.value - 1800].usBlueCollar;
        endComp = data.data[endYear.value - 1800].usBlueCollar;
        break;
      case "U.S. Unskilled":
        startComp = data.data[startYear.value - 1800].usUnskilled;
        endComp = data.data[endYear.value - 1800].usUnskilled;
        break;
      case "U.S. Upskilling":
        startComp = data.data[startYear.value - 1800].usUnskilled;
        endComp = data.data[endYear.value - 1800].usBlueCollar;
        break;
      case "U.K. Wage":
        startComp = data.data[startYear.value - 1800].ukWage;
        endComp = data.data[endYear.value - 1800].ukWage;
        break;
    }
    
    document.getElementById("startComp").value = startComp.toFixed(2).toString();
    document.getElementById("endComp").value = endComp.toFixed(2).toString();
  }

function calculateTimePrice() {
    var startPrice = document.getElementById('startPrice').value;
    var endPrice = document.getElementById('endPrice').value;
    var startComp = document.getElementById('startComp').value;
    var endComp = document.getElementById('endComp').value;

    var startTimePrice = startPrice / startComp
    var endTimePrice = endPrice / endComp
    var timePriceChange = endTimePrice - startTimePrice
    var timePricePercentageChange = timePriceChange / startTimePrice * 100;
    var timePricePercentageChangeFormatted = timePricePercentageChange >= 0 ? timePricePercentageChange.toFixed(2) : (-timePricePercentageChange).toFixed(2);

    document.getElementById("startTimePrice").innerHTML = startTimePrice.toFixed(2);
    document.getElementById("startTimePrice").classList.add('boldBlue');
    document.getElementById("endTimePrice").innerHTML = endTimePrice.toFixed(3);
    document.getElementById("endTimePrice").classList.add('boldBlue');
    document.getElementById("timePricePercentageChange").innerHTML = timePricePercentageChangeFormatted;
    document.getElementById("timePricePercentageChange").style.fontWeight = "900";
}

function finishSentence() {
    var product = document.getElementById('product').value;
    var startYear = document.getElementById('startYear').value;
    var endYear = document.getElementById('endYear').value;

    document.getElementById("productSentence").innerHTML = product;
    document.getElementById("startYearSentence").innerHTML = startYear;
    document.getElementById("endYearSentence").innerHTML = endYear;

    var startPrice = document.getElementById('startPrice').value;
    var endPrice = document.getElementById('endPrice').value;
    var startComp = document.getElementById('startComp').value;
    var endComp = document.getElementById('endComp').value;

    var startTimePrice = startPrice / startComp
    var endTimePrice = endPrice / endComp
    var multiplier = startTimePrice / endTimePrice;
    
    document.getElementById("personalMultiplier").innerHTML = multiplier.toFixed(2);
    document.getElementById("personalMultiplier").classList.add('boldBlue');
}

function clear() {
  // Reset input fields to their original values or empty strings
  document.getElementById('product').value = '';
  document.getElementById('startYear').value = '';
  document.getElementById('endYear').value = '';
  document.getElementById('startPrice').value = '';
  document.getElementById('endPrice').value = '';
  document.getElementById('startComp').value = '';
  document.getElementById('endComp').value = '';

  // Reset span elements to their default values
  document.getElementById('startTimePrice').innerHTML = '---';
  document.getElementById('endTimePrice').innerHTML = '---';
  document.getElementById('timePricePercentageChange').innerHTML = '----';
  document.getElementById('productSentence').innerHTML = '____';
  document.getElementById('startYearSentence').innerHTML = '----';
  document.getElementById('personalMultiplier').innerHTML = '----';
  document.getElementById('endYearSentence').innerHTML = '----';

  // Remove any additional classes added for styling
  document.getElementById('startTimePrice').classList.remove('boldBlue');
  document.getElementById('endTimePrice').classList.remove('boldBlue');
  document.getElementById('personalMultiplier').classList.remove('boldBlue');

  // Reset dropdown to default value
  document.getElementById('dropDownWages').value = 'Custom Wage';
}

function resetCustomWageDropDown() {
    document.getElementById('dropDownWages').value = "Custom Wage";
}

function allInputFieldsNotEmpty() {
    const inputFields = document.querySelectorAll('input');

for (const inputField of inputFields) {
    if (inputField.value.trim() === '') {
    return false; // At least one input field is empty, so return false.
    }
}

return true;
}