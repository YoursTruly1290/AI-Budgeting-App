document.addEventListener('DOMContentLoaded', () => {
    updateBudget();

    document.getElementById('add-transaction').addEventListener('click', addTransaction);
    document.getElementById('view-history').addEventListener('click', viewHistory);
});

function addTransaction() {
    const amount = parseFloat(document.getElementById('amount').value);
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;
    const type = document.getElementById('type').value;

    if (!isNaN(amount) && description.trim() !== '') {
        fetch('/add_transaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `amount=${amount}&description=${description}&category=${category}&type=${type}`
        })
        .then(response => response.json())
        .then(data => {
            updateBudget();
            clearInputs();
        })
        .catch(error => console.error('Error:', error));
    }
}

function updateBudget() {
    fetch('/get_balance')
    .then(response => response.json())
    .then(data => {
        document.getElementById('balance').innerText = `Balance: $${data.balance.toFixed(2)}`;
    })
    .catch(error => console.error('Error:', error));

    fetch('/get_expenses')
    .then(response => response.json())
    .then(data => {
        const expensesList = document.getElementById('expenses-list');
        expensesList.innerHTML = '';
        data.expenses.forEach(expense => {
            const li = document.createElement('li');
            li.textContent = `${expense[1]} (${expense[2]}): $${expense[0].toFixed(2)}`;
            expensesList.appendChild(li);
        });
    })
    .catch(error => console.error('Error:', error));
}

function clearInputs() {
    document.getElementById('amount').value = '';
    document.getElementById('description').value = '';
    document.getElementById('category').value = 'Food';
}

function viewHistory() {
    const historySection = document.getElementById('history-section');
    if (historySection.style.display === 'none') {
        historySection.style.display = 'block';
        fetch('/get_transaction_history')
        .then(response => response.json())
        .then(data => {
            const historyList = document.getElementById('history-list');
            historyList.innerHTML = '';
            data.transaction_history.forEach(transaction => {
                const li = document.createElement('li');
                const formattedDate = new Date(transaction[2]).toLocaleString();
                if (transaction[0] === 'Income') {
                    li.textContent = `Income: +${transaction[1]} at ${formattedDate}`;
                } else {
                    li.textContent = `Expense: -${transaction[1]} (${transaction[3]}) at ${formattedDate}`;
                }
                historyList.appendChild(li);
            });
        })
        .catch(error => console.error('Error:', error));
    } else {
        historySection.style.display = 'none';
    }
}
