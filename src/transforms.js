// @flow
import {
    get,
    forEach,
    keys,
    isEmpty,
    filter,
    map,
    mapValues,
    uniq,
} from 'lodash'

import numeral from 'numeral'

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
    transactions,
    ...props
}) => ({
    ...props,
    transactions: isEmpty(filterParams) ? transactions : filter(transactions, filterParams),
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
    return mapValues(totals, (value) => numeral(value.toFixed(2)).value())
}


export const getBudgetProgress = (
    transactions: Array<Transaction>,
    budget: Array<BudgetItem>,
): Array<BudgetProgressItem> => {

    const budgetCategories = getCategoryTotals(budget)
    const transactionCategories = getCategoryTotals(transactions)
    const categories  = uniq([...keys(budgetCategories), ...keys(transactionCategories)])

    return map(categories, (category) => ({
        category,
        amountPlanned: Math.abs(get(budgetCategories, category, 0)),
        amountSpent: Math.abs(get(transactionCategories, category, 0)),
    }))
}

