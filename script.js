const form = document.getElementById('form');
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

nome.oninput = () => {
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
    }
}

