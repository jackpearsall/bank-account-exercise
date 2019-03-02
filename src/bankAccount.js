const OVERDRAFT_LIMIT = -100;

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

CurrentAccount.prototype.withdraw = function withdraw(amount) {
  if ((this.balance - amount) < OVERDRAFT_LIMIT) {
    throw new Error('you have reached your overdraft limit, please contact us');
  } else {
    this.balance -= amount;
    this.withdrawals.push(amount);
    this.transactions.push(-amount);
  }
};

module.exports = CurrentAccount;
