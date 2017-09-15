// @flow
import {
    map,
} from 'lodash'
import moment from 'moment'
import type {Transaction} from '../flowtypes'
import {NetIncome} from './net-income'
import {TransactionsTable} from './transactions-table'
import {Box, Heading} from 'rebass'
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
    <Box pt={3} px={[0, 1, 2, 3]}>
        {map(monthlyTransactions, ({transactions, month, expenseTotal, incomeTotal}) => (
            <Box pb={3} key={month}>
                <Heading py={3}>
                    {moment().month(month).format('MMMM')}
                </Heading>
                <Box pb={3}>
                    <NetIncome expenseTotal={expenseTotal} incomeTotal={incomeTotal} />
                </Box>
                <TransactionsTable transactions={transactions} />
            </Box>
        ))}
    </Box>
)
