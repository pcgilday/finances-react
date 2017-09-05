// @flow
import {
    get,
    forEach,
    keys,
    isEmpty,
    filter,
    map,
    uniq,
} from 'lodash'

import type {
    Transaction,
    BudgetItem,
    BudgetProgressItem,
    MonthlyFinances,
} from './flowtypes'


export const filterTransactions = (
    monthlyFinances: Array<MonthlyFinances>,
    filterParams: {[string]: string},
): Array<MonthlyFinances> => map(monthlyFinances, ({
    income, expenses, ...props
}) => ({
    ...props,
    income: isEmpty(filterParams) ? income : filter(income, filterParams),
    expenses: isEmpty(filterParams) ? expenses : filter(expenses, filterParams),
}))


export const getCategoryTotals = (
    items: Array<{category: string, amount: number}>,
): {[string]: number} => {
    const categories = uniq(map(items, 'category'))
    const totals = {}
    forEach(categories, (category) => totals[category] = 0)
    forEach(items, ({amount, category}) =>
        totals[category] += amount
    )
    return totals
}


export const getBudgetProgress = (
    expenses: Array<Transaction>,
    budget: Array<BudgetItem>,
): Array<BudgetProgressItem> => {

    const budgetCategories = getCategoryTotals(budget)
    const expensesCategories = getCategoryTotals(expenses)

    const categories  = uniq([...keys(budgetCategories), ...keys(expensesCategories)])

    return map(categories, (category) => ({
        category,
        amountPlanned: get(budgetCategories, category),
        amountSpent: get(expensesCategories, category),
    }))
}

