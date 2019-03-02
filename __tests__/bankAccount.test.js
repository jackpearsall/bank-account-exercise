const CurrentAccount = require('../src/bankAccount');

describe('constructor', () => {
  const currentAccount = new CurrentAccount('Joe Bloggs');
  it('create a new bank account', () => {
    expect(new CurrentAccount('Joe Bloggs')).toBeInstanceOf(Object);
  });
  it('expects account name to be argument passed when creating account', () => {
    expect(currentAccount.customerName).toEqual('Joe Bloggs');
  });
  it('expects an initial balance of 0', () => {
    expect(currentAccount.balance).toEqual(0);
  });
  it('expects no previous deposits', () => {
    expect(currentAccount.deposits).toEqual([]);
  });
  it('expects no previous withdrawals', () => {
    expect(currentAccount.withdrawals).toEqual([]);
  });
  it('expects no previous transactions', () => {
    expect(currentAccount.transactions).toEqual([]);
  });
});

describe('checks deposits functionality', () => {
  let currentAccount;
  beforeEach(() => {
    currentAccount = new CurrentAccount('Joe Bloggs');
    currentAccount.deposit(2.99);
  });
  it('expects the supplied deposit amount to create an entry in the deposits array equal to the supplied amount', () => {
    expect(currentAccount.deposits).toEqual([2.99]);
    currentAccount.deposit(10);
    expect(currentAccount.deposits).toEqual([2.99, 10]);
  });
  it('expects the supplied deposit amount to create an entry in the transactions array equal to the supplied amount', () => {
    expect(currentAccount.transactions).toEqual([2.99]);
    currentAccount.deposit(10);
    expect(currentAccount.transactions).toEqual([2.99, 10]);
  });
  it('expects the supplied deposit amount to be added to the current account balance', () => {
    expect(currentAccount.balance).toEqual(2.99);
    currentAccount.deposit(10);
    expect(currentAccount.balance).toEqual(12.99);
  });
});

describe('checks withdrawals functionality', () => {
  let currentAccount;
  beforeEach(() => {
    currentAccount = new CurrentAccount('Joe Bloggs');
    currentAccount.deposit(12.99);
    currentAccount.withdraw(2.99);
  });
  it('throws an error if the balance after the attempted withdrawal is greater than the overdraft limit', () => {
    currentAccount.balance = -90;
    expect(() => currentAccount.withdraw(20)).toThrow('you have reached your overdraft limit, please contact us');
    expect(currentAccount.balance).toEqual(-90);
  });
  it('expects the supplied withdrawal amount to create an entry in the withdrwals array equal to the supplied amount', () => {
    expect(currentAccount.withdrawals).toEqual([2.99]);
    currentAccount.withdraw(10);
    expect(currentAccount.withdrawals).toEqual([2.99, 10]);
  });
  it('expects the supplied withdrawal amount to create an entry in the transactions array equal to the supplied amount', () => {
    expect(currentAccount.transactions).toEqual([12.99, -2.99]);
    currentAccount.withdraw(10);
    expect(currentAccount.transactions).toEqual([12.99, -2.99, -10]);
  });
  it('expects the supplied withdrawal amount to be minused from the current account balance', () => {
    expect(currentAccount.balance).toEqual(10);
    currentAccount.withdraw(10);
    expect(currentAccount.balance).toEqual(0);
  });
});
