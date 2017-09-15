// @flow
import {
    map,
    sumBy,
} from 'lodash'
import {compose, withProps} from 'recompose'
import {connectMonthlyFinances} from './connect-monthly-finances'
import {
    Dashboard,
    MonthlyTransactions,
} from './components'

export const DashboardContainer = connectMonthlyFinances()(Dashboard)

export const IncomeContainer = compose(
    connectMonthlyFinances(),
    withProps(({monthlyFinances}) => ({
        monthlyTransactions: map(monthlyFinances, ({month, income, expenses}) => ({
            month,
            transactions: income,
            expenseTotal: sumBy(expenses, 'amount'),
            incomeTotal: sumBy(income, 'amount'),
        })),
    })),
)(MonthlyTransactions)

export const ExpensesContainer = compose(
    connectMonthlyFinances(),
    withProps(({monthlyFinances}) => ({
        monthlyTransactions: map(monthlyFinances, ({month, expenses, income}) => ({
            month,
            transactions: expenses,
            expenseTotal: sumBy(expenses, 'amount'),
            incomeTotal: sumBy(income, 'amount'),
        })),
    })),
)(MonthlyTransactions)

