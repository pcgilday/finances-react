// @flow

export type Month = 0 | 1 |2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11

export type Transaction = {|
    id: string,
    date: string, // ISO date string
    name: string,
    category: string,
    amount: number,
    account: string,
    notes: string,
|}

export type BudgetItem = {|
    name: string,
    amount: number,
    category: string,
    notes: string,
|}

export type BudgetProgressItem = {|
    category: string,
    amountPlanned: number,
    amountSpent: number,
|}

export type MonthlyFinances = {|
    month: Month,
    expenses: Array<Transaction>,
    income: Array<Transaction>,
    budget: Array<BudgetItem>,
    progress: Array<BudgetProgressItem>,
|}
