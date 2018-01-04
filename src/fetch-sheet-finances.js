// @flow
import {
    map,
    split,
    forEach,
    isEqual,
    slice,
    trim,
} from 'lodash'
import numeral from 'numeral'
import moment from 'moment'
import {GOOGLE_SHEET_ID} from './config'
import type {Transaction, BudgetItem, Month} from './flowtypes'


// FIXME make more specific
type GoogleApiClient = {
    sheets: any,
}

const getSheetRanges = () => [
    'chase-sapphire',
    'usaa',
    'k-chase',
    'k-mastercard',
    'wells-fargo',
    'k-citi',
    'discover',
    'budget-january',
    'budget-june',
    'budget-july',
    'budget-august',
    'budget-september',
    'budget-october',
    'budget-november',
    'budget-december',
]


function parseSheetDate(date: string): string {
    const [month, day, year] = split(date, '/')
    // convert to ISO 8601
    return `${year}-${month}-${day}`
}

export function _parseTransaction(transaction: Array<string>): Transaction {
    // column order
    const [date, name, amount, category, notes] = transaction

    return {
        date: parseSheetDate(date),
        name,
        category,
        amount: numeral(amount).value(),
        notes,
    }
}

function parseTransactions(transactions: Array<Array<string>>): Array<Transaction> {
    return map(transactions, (transaction, index) => ({
        // FIXME should be cell range id
        id: index,
        ..._parseTransaction(transaction),
    }))
}

export function _parseBudget(budget: Array<string>): BudgetItem {
    const [name, amount, category, notes] = budget
    return {
        name,
        amount: numeral(amount).value(),
        category,
        notes,
    }
}

function processRanges(valueRanges): {
    transactions: Array<Transaction>,
    budget: {[Month]: Array<BudgetItem>},
} {
    const transactions = []
    const budget = {}
    forEach(valueRanges, ({values}) => {
        const tabType = values[0][0]

        if (isEqual(tabType, 'Account')) {
            const accountName = values[0][1]
            transactions.push(...map(parseTransactions(slice(values, 5)), (t, i) => ({
                ...t,
                id: `${accountName}-${i}`,
                account: accountName,
            })))
        } else if (isEqual(tabType, 'Budget')) {

            const monthValue = trim(values[0][1])
            const month = moment().month(monthValue).month()
            // months are 0 indexed
            budget[month] = map(slice(values, 5), _parseBudget)
        }
    })
    return {transactions, budget}
}

export function fetchSheetFinances(client: GoogleApiClient) {
    return client.sheets.spreadsheets.values
        .batchGet({
            spreadsheetId: GOOGLE_SHEET_ID,
            ranges: getSheetRanges(),
            majorDimension: 'ROWS',
        })
        .then((response) => {
            const ranges = response.result.valueRanges
            return processRanges(ranges)
        })
}
