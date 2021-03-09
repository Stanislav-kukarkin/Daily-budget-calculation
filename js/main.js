let startBtn = document.getElementById('start'),
    budgetV = document.getElementsByClassName('budget-value')[0],
    dayBudgetV = document.getElementsByClassName('daybudget-value')[0],
    levelV = document.getElementsByClassName('level-value')[0],
    expensesV = document.getElementsByClassName('expenses-value')[0],
    opExpensesV = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeV = document.getElementsByClassName('income-value')[0],
    monthSavingV = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingV = document.getElementsByClassName('yearsavings-value')[0],


    expensesItem = document.getElementsByClassName('expenses-item'),
    expensesBtn = document.getElementsByTagName('button')[0],
    optionalExpensesBtn = document.getElementsByTagName('button')[1],
    countBtn = document.getElementsByTagName('button')[2],
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    checkbox = document.querySelectorAll('.checksavings'),
    checkSavings = document.querySelector('#savings'),
    sumV = document.querySelector('.choose-sum'),
    percentV = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value'),
    incomeItem = document.querySelector(".choose-income");



let money, time;

expensesBtn.disabled = true;
optionalExpensesBtn.disabled = true;
countBtn.disabled = true;

startBtn.addEventListener('click', function start(){
    time = prompt("введите дату в формате YYYY-MM-DD", '');
    money = +prompt("ваш бюджет", '');

    while(isNaN(money) || money == "" || money == null) {
        money = +prompt("ваш бюджет", '');

    }
    appData.budget = money;
    appData.timeData = time;
    budgetV.textContent = money.toFixed();//toFixed округляет до целого числа
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();

    expensesBtn.disabled = false;
    optionalExpensesBtn.disabled = false;
    countBtn.disabled = false;
});

expensesBtn.addEventListener('click', function(){
    let sum = 0;


    for (let i=0; i< expensesItem.length; i++){
        let a = expensesItem[i].value,
            b = expensesItem[++i].value;

        if ((typeof(a))=== 'string' && (typeof(a)) !=  null && (typeof(b)) !=  null 
        && a != '' && b != '' && a.length<20) {
            console.log('done');

            appData.expenses[a] = b;
            sum += +b;
        }
        else{
            i= i-1;
        }
    }
    expensesV.textContent = sum;
});

optionalExpensesBtn.addEventListener('click', function(){
    for (let i=0; i< optionalExpensesItem.length; i++){
        let opt = optionalExpensesItem[i].value ;
        appData.optionalExpenses[i] = opt;
        opExpensesV.textContent += appData.optionalExpenses[i] + ' ';

    }
});

countBtn.addEventListener('click', function(){

    if (appData.budget != undefined){
        appData.moneyPerDay = ((appData.budget - +expensesV.textContent) / 30).toFixed();
        dayBudgetV.textContent = appData.moneyPerDay;
    
        if(appData.moneyPerDay < 100){
            levelV.textContent= "очень мало";
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000){
            levelV.textContent= "средний уровень достатка";
        } else if (appData.moneyPerDay > 2000) {
            levelV.textContent= 'буржуй';
        } else {
            levelV.textContent= 'error';
        }
    }

    else {
        dayBudgetV.textContent = 'произошла ошибка';
    }

});

incomeItem.addEventListener('input', function(){
    let items = incomeItem.value;
    appData.income = items.split(', ');
    incomeV.textContent = appData.income;

});

checkSavings.addEventListener('click', function(){
    if (appData.savings == true){
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

sumV.addEventListener('input', function(){
    if (appData.savings == true) {
        let sum = +sumV.value;
        let percent = +percentV.value;

        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;

        monthSavingV.textContent = appData.monthIncome.toFixed(1);
        yearSavingV.textContent = appData.yearIncome.toFixed(1);
    }
});
percentV.addEventListener('input', function(){
    if (appData.savings == true) {
        let sum = +sumV.value,
            percent = +percentV.value;

        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;

        monthSavingV.textContent = appData.monthIncome.toFixed(1);
        yearSavingV.textContent = appData.yearIncome.toFixed(1);
    }
});


let appData = {
    budget : money,
    expenses: {},
    optionalExpenses: {},
    income: [],
    timeData: time,
    savings: false
    };

