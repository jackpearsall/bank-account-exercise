function CurrentAccount(customerName) {
  this.customerName = customerName;
  this.balance = 0;
  this.deposits = [];
  this.withdrawals = [];
  this.transactions = [];
}

CurrentAccount.prototype.deposit = function deposit(amount) {
  this.balance += amount;
  this.deposits.push(amount);
  this.transactions.push(amount);
};

module.exports = CurrentAccount;
