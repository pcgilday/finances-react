// @flow
import {
    get,
    keys,
    groupBy,
    orderBy,
    map,
    uniq,
    toInteger,
} from 'lodash'
import {withProps, compose} from 'recompose'
import qs from 'query-string'
import moment from 'moment'
import type {
    Transaction,
    BudgetItem,
    Month,
    MonthlyFinances,
} from './flowtypes'
import {filterTransactions} from './transforms'
import {connectFinances} from './connect-finances'



export const _getMonthlyFinances = (
    {income, expenses, budget}:
    {income: Array<Transaction>, expenses: Array<Transaction>, budget: {[Month]: BudgetItem},
}): Array<MonthlyFinances> => {
    const monthlyExpenses = groupBy(expenses, (expense: Transaction) => {
        return moment(get(expense, 'date')).month()
    })
    const monthlyIncome = groupBy(income, (income: Transaction) => {
        return moment(get(income, 'date')).month()
    })
    const months = uniq([...keys(monthlyExpenses), ...keys(monthlyIncome)])
    return map(months, (month) => ({
        month: toInteger(month),
        expenses: get(monthlyExpenses, month),
        income: get(monthlyIncome, month),
        budget: get(budget, month),
    }))
}

export const connectMonthlyFinances = () => compose(
    connectFinances(),
    withProps((props) => ({
        monthlyFinances: _getMonthlyFinances(props),
    })),
    withProps(({monthlyFinances}) => ({
        monthlyFinances: orderBy(monthlyFinances, 'month', 'desc'),
    })),
    withProps(({location, monthlyFinances}) => ({
        monthlyFinances: filterTransactions(
            monthlyFinances,
            qs.parse(location.search),
        ),
    })),
)

