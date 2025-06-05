const form = document.querySelector('form');
const expense = document.getElementById('expense');
const category = document.getElementById('category');
const amount = document.getElementById('amount');

const expenseList = document.querySelector('ul');

const expenseTotal = document.querySelector('aside header h2');

const expenseQuantily = document.querySelector('aside header p span');

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

function formatCurrencyBR(value) {
    value = value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })
    return value
}

function expenseAdd(newExpense) {
    try {

        // Cria o item da despesa
        const expenseItem = document.createElement('li');
        expenseItem.classList.add('expense');


        // Cria o ícone da despesa
        const expenseIcon = document.createElement('img');
        expenseIcon.setAttribute('src', `img/${newExpense.category_id}.svg`);
        expenseIcon.setAttribute('alt', newExpense.category_name);


        // Cria o nome da despesa
        const expenseInfo = document.createElement('div');
        expenseInfo.classList.add('expense-info');

        const expenseName = document.createElement('strong');
        expenseName.textContent = newExpense.expense;

        const expenseCategory = document.createElement('span');
        expenseCategory.textContent = newExpense.category_name;

        expenseInfo.append(expenseName, expenseCategory);


        // Cria o valor da despesa
        const expanseAmount = document.createElement('span');
        expanseAmount.classList.add('expense-amount');
        expanseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}` 


        // Cria o botão de remover despesa
        const expenseIconRemove = document.createElement('img');
        expenseIconRemove.classList.add('expense-remove');
        expenseIconRemove.setAttribute('src', 'img/remove.svg');
        expenseIconRemove.setAttribute('alt', 'remover');


        expenseItem.append(expenseIcon, expenseInfo, expanseAmount, expenseIconRemove);
        expenseList.append(expenseItem);

        updateTotal()

    } catch (error) {
        alert("Não foi possível adicionar a despesa");
    }
}

function updateTotal() {
    try {
        const items = expenseList.children
        expenseQuantily.textContent = `${items.length} ${items.length > 1 ? 'itens' : 'item'}`;

        let total = 0;

        for (let item = 0; item < items.length; item++) {
            const itemAmount = items[item].querySelector('.expense-amount');

            // Remover caracteres não numéricos e substituira a vírgula por ponto
            let value = itemAmount.textContent.replace(/[^\d,]/g, '').replace(',', '.');


            value = parseFloat(value);

            if(isNaN(value)) {
                return alert("Não foi possível atualizar o total");
            }

            total += Number(value);
        }

        // Cria a span para adcionar o R$ formatado
        const symbolBRL = document.createElement('small');
        symbolBRL.textContent = 'R$';

        total = formatCurrencyBR(total).toUpperCase().replace('R$', '');

        expenseTotal.innerHTML = ""
        expenseTotal.append(symbolBRL, total);

    } catch {
        alert("Não foi possível atualizar o total");
    }
}

expenseList.addEventListener('click', (event) => {
    if(event.target.classList.contains('expense-remove')) {
        event.target.closest('.expense').remove();
        updateTotal();
    }
})