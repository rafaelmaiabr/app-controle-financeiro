  //usei open/close mas poderia usar toogle add ou remove classe
const Modal = {
  //Abre Modal
  open() {
    document
      .querySelector('.modal-overlay')
      .classList
      .add('active')
  },
  //Fecha Modal
  close() {
    document
      .querySelector('.modal-overlay')
      .classList
      .remove('active')
  }
}

const transactions = [
  {
    id: 1,
    description: 'Luz',
    amount: -10047,
    date: '23/01/2021'
  },
  {
    id: 2,
    description: 'Website',
    amount: 20025,
    date: '24/01/2021'
  },
  {
    id: 3,
    description: 'Internet',
    amount: -10004,
    date: '25/01/2021'
  },
  {
    id: 4,
    description: 'APP',
    amount: 20007,
    date: '27/01/2021'
  }
];

const Transaction = {
  incomes() {
    let income = 0;
    transactions.forEach(transaction => {
      if (transaction.amount > 0) {
        income += transaction.amount;
      }
    })

    return income;
  },
  expenses() {
    let expense = 0;
    transactions.forEach(transaction => {
      if (transaction.amount < 0) {
        expense += transaction.amount;
      }
    })

    return expense;
  },
  total() {

    return Transaction.incomes() + Transaction.expenses();

  }
}

const DOM = {
  transactionsContainer: document.querySelector('#data-table tbody'),
  
  addTransaction(transaction, index) {
    const tr = document.createElement('tr')
    tr.innerHTML = DOM.innerHTMLTransaction(transaction)

    DOM.transactionsContainer.appendChild(tr)

  },
  innerHTMLTransaction(transaction) {
    const CSSclass = transaction.amount > 0 ? "income" : "expense"

    const amount = Utils.formatCurrency(transaction.amount)

    const html = `
      <tr>
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
          <img src="./assets/minus.svg" alt="Imagem Remove Transação">
        </td>
      </tr>
    `
    return html
  },
  updateBalance() {
    document
      .getElementById('incomeDisplay')
      .innerHTML = Utils.formatCurrency(Transaction.incomes())
    document
      .getElementById('expenseDisplay')
      .innerHTML = Utils.formatCurrency(Transaction.expenses())
    document
      .getElementById('totalDisplay')
      .innerHTML = Utils.formatCurrency(Transaction.total())
    
  }
}

const Utils = {
  formatCurrency(value) {
    //Valor negativo ou positivo
    const signal = Number(value) < 0 ? "-" : ""

    value = String(value).replace(/\D/g, "")

    //Transforma valor em decimal 10000 = 100,00
    value = Number(value) / 100

    //Transforma em moeda
    value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })
    
    return signal + value
  }
}

transactions.forEach(function(transaction) {
  DOM.addTransaction(transaction)
})

DOM.updateBalance()

