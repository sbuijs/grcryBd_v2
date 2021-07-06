'use strict';

//selectors
//---results
const fullMontlyBudgetSelector = document.getElementById("full-monthly-budget");
const daysLeftSelector = document.getElementById("days-left");
const budgetLeftSelector = document.getElementById("budget-left");
const actualMoneyLeftSelector = document.getElementById("actual-money-left");
const startDaySelector = document.getElementById("start-day");
const dayBudgetSelector = document.getElementById("day-budget");
// console.log(fullMontlyBudgetSelector, daysLeftSelector, budgetLeftSelector, actualMoneyLeftSelector);

//---buttons
const addStartDetailsButton = document.getElementById("add-start-details");
const editMonthlyBudgetButton = document.getElementById("edit-monthly-budget");
const editMonthlyDayButton = document.getElementById("edit-monthly-day");
const saveSpendingsButton = document.getElementById("save-spendings");

// console.log(addStartDetailsButton, editMonthlyBudgetButton, saveSpendingsButton);

//Modal form input fields
// const firstRunBudgetInput = document.getElementById("first-run-budget-input");
const monthlyBudgetInput = document.getElementById("monthly-budget-input");
const monthlyDayInput = document.getElementById("monthly-day-input");
const daySpendingInput = document.getElementById("day-spending-input");
// const firstRunStartDay = document.getElementById("first-run-start-day");
// console.log(firstRunBudgetInput, monthlyBudgetInput, daySpendingInput);


//Form validation
const firstRunForm = document.querySelector('#first-run-form');
const firstRunBudgetInput = document.querySelector('#first-run-budget-input');
const firstRunStartDayInput = document.querySelector('#first-run-start-day-input');

const firstRunBudgetInputEmpty = document.querySelector('#first-run-budget-input');
const firstRunStartDayInputEmpty = document.querySelector('#first-run-start-day-input-empty');




let montlyBudget;
let startDay;
let dayBudget;
let daysLeft;
let budgetLeft;
let budgetShouldHaveLeft;

function calcDaysLeft() {

    //calculate the days in last month
    function calcDaysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    };

    const date = new Date();
    const dayToday = date.getDate();
    const monthToday = date.getMonth();
    const yearToday = date.getFullYear();
    const daysInLastMonth = calcDaysInMonth(monthToday, yearToday);


    // if (dayToday <= startDay) {
    //     daysLeft = startDay - dayToday;
    //     console.log(`if`);
    //     console.log(daysLeft);
    // } else if (startday = startday) {
    //     daysLeft = 0;
    // } else if (startDay === daysInLastMonth || startDay > dayToday) {
    //     daysLeft = (daysInLastMonth - startDay) + startDay;
    //     console.log(`else`);
    //     console.log(daysLeft);
    // }

    daysLeftSelector.innerHTML = daysLeft;
};

// //prevent form submission

firstRunForm.addEventListener('submit', (e) => {
    e.preventDefault();
});



//function that calculates budget based on the amount of days devided by the month budget
function calcDayBudget() {
    dayBudget = montlyBudget / 31;
    dayBudgetSelector.innerHTML = (Math.round(dayBudget * 100) / 100).toFixed(2);
};



//function that calculates how much money you should have today according to the dayly budget
function calcBudgetShouldHaveLeft() {
    budgetShouldHaveLeft = (Math.round((daysLeft * dayBudget) * 100) / 100).toFixed(2);
    budgetLeftSelector.innerHTML = budgetShouldHaveLeft;
};



//function that edits the start day
editMonthlyDayButton.addEventListener('click', editMonthlyDay);
function editMonthlyDay() {
    startDay = Number(monthlyDayInput.value);
    startDaySelector.innerHTML = startDay;
    calcDaysLeft();
    calcBudgetShouldHaveLeft();
    hideModals();
};


//function that saves the first run details
addStartDetailsButton.addEventListener('click', addFirstRunDetails);
function addFirstRunDetails() {

    montlyBudget = Number(firstRunBudgetInput.value);
    fullMontlyBudgetSelector.innerHTML = montlyBudget;

    startDay = Number(firstRunStartDayInput.value);
    startDaySelector.innerHTML = startDay;

    calcDayBudget();
    calcDaysLeft();
    calcBudgetShouldHaveLeft();
    hideModals();
    budgetLeft = montlyBudget;
    actualMoneyLeftSelector.innerHTML = budgetLeft;

};


//function that edits monthly budget
editMonthlyBudgetButton.addEventListener('click', editMonthlyBudget);
function editMonthlyBudget() {
    montlyBudget = Number(monthlyBudgetInput.value);
    fullMontlyBudgetSelector.innerHTML = montlyBudget;
    console.log(montlyBudget);
    actualMoneyLeftSelector.innerHTML = montlyBudget;
    //make sure other things are updated after changing the value
    calcDayBudget();
    calcDaysLeft();
    calcBudgetShouldHaveLeft();
    hideModals();
};

//function that shows the first run modal screen if there is no monlthy budget value
function firstRun() {
    if (!montlyBudget) {
        showModal("first-run-modal");
    }
};











function showTypes() {
    console.log(typeof montlyBudget);
    console.log(typeof startDay);
    console.log(typeof dayBudget);
    console.log(typeof daysLeft);
};





///Modals
let buttons = document.querySelectorAll('.modal-button');
let modals = document.querySelectorAll('.modal');

function showModal(id) {
    let m = document.getElementById(id);
    m.classList.add('visible');
}

function hideModals() {
    modals.forEach(m => {
        m.classList.remove('visible');
    });
}

buttons.forEach(b => {
    b.addEventListener('click', event => {
        hideModals();
        showModal(b.dataset.modal);
    });
});

modals.forEach(m => {
    let x = m.querySelector('button.close');
    x.addEventListener('click', hideModals);
});







document.addEventListener('DOMContentLoaded', function () {
    // console.log(`dom loaded`);
    firstRun();
});

