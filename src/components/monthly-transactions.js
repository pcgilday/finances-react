// @flow
import {
    map,
} from 'lodash'
import moment from 'moment'
import type {Transaction} from '../flowtypes'
import {NetIncome} from './net-income'
import {TransactionsTable} from './transactions-table'
import {Heading} from './base'
import React from 'react'

type Props  = {|
    monthlyTransactions: {
        month: string,
        transactions: Array<Transaction>,
        expenseTotal: number,
        incomeTotal: number,
    },
|}

export const MonthlyTransactions = ({monthlyTransactions}: Props) => (
    <div>
        {map(monthlyTransactions, ({transactions, month, expenseTotal, incomeTotal}) => (
            <div key={month}>
                <Heading size={1}>
                    {moment().month(month).format('MMMM')}
                </Heading>
                <NetIncome expenseTotal={expenseTotal} incomeTotal={incomeTotal} />
                <TransactionsTable transactions={transactions} />
            </div>
        ))}
    </div>
)
