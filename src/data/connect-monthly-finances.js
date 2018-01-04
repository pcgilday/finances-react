// @flow
import {
    get,
    keys,
    groupBy,
    orderBy,
    map,
    uniq,
    sumBy,
    toInteger,
} from 'lodash'
import {withProps, compose} from 'recompose'
import qs from 'query-string'
import moment from 'moment'
import type {
    Transaction,
    BudgetItem,
    MonthlyFinances,
} from '../flowtypes'
import {filterTransactions} from '../transforms'
import {connectFinances} from './connect-finances'


export const _getMonthlyFinances = ({
    budget,
    transactions,
}: {
    transactions: Array<Transaction>,
    budget: Array<BudgetItem>,
}): Array<MonthlyFinances> => {
    const monthlyTransactions = groupBy(transactions, (transaction: Transaction) => {
        return moment(get(transaction, 'date')).month()
    })
    const months = uniq(keys(monthlyTransactions))
    return map(months, (month) => ({
        month: toInteger(month),
        transactions: get(monthlyTransactions, month),
        netIncome: sumBy(get(monthlyTransactions, month), 'amount'),
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

