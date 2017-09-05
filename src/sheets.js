// @flow
import {
    map,
    split,
} from 'lodash'
import numeral from 'numeral'
import {GOOGLE_SHEET_ID} from './config'
import type {Transaction, BudgetItem} from './flowtypes'


// FIXME make more specific
type GoogleApiClient = {
    sheets: any,
}


const getSheetRanges = () => [
    // accountsRange,
    'data!D3:D',
    // categoriesRange,
    'data!A3:A',
    // expenses
    'expenses!A5:F',
    'expenses!H5:M',
    // income
    'income!A3:E',
    'income!H3:L',
    // budgets
    'budget-june!A5:D',
    'budget-july!A5:D',
    'budget-august!A5:D',
    'budget-september!A5:D',
]


function parseSheetDate(date: string): string {
    const [month, day, year] = split(date, '/')
    // convert to ISO 8601
    return `${year}-${month}-${day}`
}

export function _parseTransaction(transaction: Array<string>): Transaction {
    // column order
    const [date, name, amount, category, account, notes] = transaction

    return {
        date: parseSheetDate(date),
        name,
        category,
        amount: numeral(amount).value(),
        account,
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

export function fetchSheetData(client: GoogleApiClient) {
    return client.sheets.spreadsheets.values
        .batchGet({
            spreadsheetId: GOOGLE_SHEET_ID,
            ranges: getSheetRanges(),
        })
        .then((response) => {
            const ranges = response.result.valueRanges
            return {
                accounts: ranges[0].values.map(items => items[0]),
                categories: ranges[1].values.map(items => items[0]),
                expenses: parseTransactions([...ranges[2].values, ...ranges[3].values]),
                income: parseTransactions([...ranges[4].values, ...ranges[5].values]),
                budget: {
                    // FIXME dynamically load
                    '5': map(ranges[6].values, _parseBudget),
                    '6': map(ranges[7].values, _parseBudget),
                    '7': map(ranges[8].values, _parseBudget),
                    '8': map(ranges[9].values, _parseBudget),
                },
            }
        })
}
