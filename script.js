const form = document.querySelector('form');
const expense = document.getElementById('expense');
const category = document.getElementById('category');
const amount = document.getElementById('amount');

const expenseList = document.querySelector('ul');

function formatCurrencyBR(value) {
    value = value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })
    return value
}

amount.oninput = () => {
    let value = amount.value.replace(/\D/g, '');
    value = Number(value) / 100
    amount.value = formatCurrencyBR(value);

}

form.onsubmit = (event) => {
    event.preventDefault();

    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        createAt: new Date(),
    }

    expenseAdd(newExpense);

}

function expenseAdd(newExpense) {
    try {
        //
        const expenseItem = document.createElement('li');
        expenseItem.classList.add('expense');

        const expenseIcon = document.createElement('img');
        expenseIcon.setAttribute('src', `img/${newExpense.category_id}.svg`);
        expenseIcon.setAttribute('alt', newExpense.category_name);

        expenseItem.append(expenseIcon, expenseInfo);

        expenseList.append(expenseItem);

        //
        const expenseInfo = document.createElement('div');
        expenseInfo.classList.add('expense-info');

        const expenseName = document.createElement('strong');
        expenseName.textContent = newExpense.expense;

        const expenseCategory = document.createElement('span');
        expenseCategory.textContent = newExpense.category_name;

        expenseInfo.append(expenseName, expenseCategory);

        expenseItem.append(expenseInfo);

        //
        const expenseAmount = document.createElement('span');
        
        expenseAmount.textContent.classList.add('expense-amount');

        expenseAmount.append(formatCurrencyBR(newExpense.amount));

        expenseItem.append(expenseAmount);

        //
        const expenseIconRemove = document.createElement('img');
        expenseIconRemove.setAttribute('src', 'img/remove.svg');
        expenseIconRemove.setAttribute('alt', 'remover');

        expenseItem.append(expenseIconRemove, expenseInfo);

        expenseList.append(expenseItem);

        updateTotal()

    } catch (error) {
        alert("Não foi possível adicionar a despesa");
    }
}

function updateTotal(){
    try{
        const itens = expenseList.children
    } catch{
        alert("Não foi possível atualizar o total");
    }
}