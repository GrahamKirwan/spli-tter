const billAmount = document.querySelector('#bill-amount');
const numPeople = document.querySelector('#num-people');
const percent5 = document.querySelector('.percent5');
const percent10 = document.querySelector('.percent10');
const percent15 = document.querySelector('.percent15');
const percent25 = document.querySelector('.percent25');
const percent50 = document.querySelector('.percent50');
const percentCustom = document.querySelector('.percent-custom');

const tipAmountDOM = document.querySelector('#tip-amount');
const totalAmountDOM = document.querySelector('#total-amount');

const resetBtn = document.querySelector('.reset');

const percentArr = [percent5, percent10, percent15, percent25, percent50, percentCustom];
let bill;
let tip = .15;
let people;

let tipAmountPP;
let totalPP;

// Get the value of the bill
billAmount.addEventListener('keyup', function(){
    bill = billAmount.value;

    // Calculate if we have bill and people
    if(bill && people) {
        calculateTip();
    }
});

// Get the number of people
numPeople.addEventListener('keyup', function(){
    people = numPeople.value;

    // Calculate if we have bill and people
    if(bill && people) {
        calculateTip();
    }
});

// Listen for clicks on all tip buttons and assign tip variable
for(let i=0; i<percentArr.length; i++){
    percentArr[i].addEventListener('click', function(){
        removeActive();

        // If its a custom tip percent
        if(i == 5) {
            percentCustom.addEventListener('keyup', function(){
                tip = percentCustom.value / 100;
                if(bill && people) {
                    calculateTip();
                }
            })
        } else {
            percentArr[i].classList.add("active");
            tip = percentArr[i].getAttribute('value');
            percentCustom.placeholder = "Custom";
            percentCustom.value = '';
        }

        if(bill && people) {
            calculateTip();
        }
    })
}

resetBtn.addEventListener('click', function(){
    reset();
})

function removeActive(){
    for(let i=0; i<percentArr.length; i++){
        percentArr[i].classList.remove("active");
    }
}

function calculateTip() {
    tipAmountPP = (bill * tip) / people;
    totalPP = (bill / people) + tipAmountPP;
    tipAmountPP = tipAmountPP.toFixed(2);
    totalPP = totalPP.toFixed(2);

    tipAmountDOM.innerHTML = "$" + tipAmountPP;
    totalAmountDOM.innerHTML = "$" + totalPP;
}

function reset() {
    tipAmountDOM.innerHTML = "$0.00";
    totalAmountDOM.innerHTML = "$0.00";
    billAmount.placeholder = '0';
    billAmount.value = '';
    numPeople.placeholder = "0";
    numPeople.value = '';
    percentCustom.placeholder = "Custom";
    percentCustom.value = '';
}