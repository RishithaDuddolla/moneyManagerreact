import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {optionId: 'INCOME', displayText: 'Income'},
  {optionId: 'EXPENSES', displayText: 'Expenses'},
]

class MoneyManager extends Component {
  state = {
    transactionsList: [],
    titleInput: '',
    amountInput: '',
    optionId: transactionTypeOptions[0].optionId,
  }

  addTransaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state
    const newTransaction = {
      id: uuidv4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: optionId,
    }

    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransaction],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  deleteTransaction = id => {
    const {transactionsList} = this.state
    const updatedTransactionsList = transactionsList.filter(
      transaction => transaction.id !== id,
    )
    this.setState({transactionsList: updatedTransactionsList})
  }

  calculateTotal = type => {
    const {transactionsList} = this.state
    let totalAmount = 0
    transactionsList.forEach(transaction => {
      if (transaction.type === type) {
        totalAmount += transaction.amount
      }
    })
    return totalAmount
  }

  render() {
    const {transactionsList, titleInput, amountInput, optionId} = this.state
    const totalIncome = this.calculateTotal('INCOME')
    const totalExpenses = this.calculateTotal('EXPENSES')
    const totalBalance = totalIncome - totalExpenses

    return (
      <div className="money-manager-container">
        <div>
          <h1>Hi, Richard</h1>
          <p>
            Welcome back to your <span>Money Manager</span>
          </p>
        </div>
        <div className="money-details">
          <MoneyDetails
            totalBalance={totalBalance}
            totalIncome={totalIncome}
            totalExpenses={totalExpenses}
          />
        </div>
        <div className="ff">
          <div className="transaction-form">
            <form onSubmit={this.addTransaction}>
              <h2>Add Transaction</h2>
              <label htmlFor="title">TITLE</label>
              <input
                id="title"
                type="text"
                value={titleInput}
                onChange={e => this.setState({titleInput: e.target.value})}
              />
              <label htmlFor="amount">AMOUNT</label>
              <input
                id="amount"
                type="text"
                value={amountInput}
                onChange={e => this.setState({amountInput: e.target.value})}
              />
              <label htmlFor="type">TYPE</label>
              <select
                id="type"
                value={optionId}
                onChange={e => this.setState({optionId: e.target.value})}
              >
                {transactionTypeOptions.map(option => (
                  <option key={option.optionId} value={option.optionId}>
                    {option.displayText}
                  </option>
                ))}
              </select>
              <button type="submit">Add</button>
            </form>
          </div>
          <div className="transaction-history">
            <h2>History</h2>
            <div className="ff">
              <p>Title</p>
              <p>Amount</p>
              <p>Type</p>
            </div>
            <ul>
              {transactionsList.map(transaction => (
                <TransactionItem
                  key={transaction.id}
                  transaction={transaction}
                  deleteTransaction={this.deleteTransaction}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
