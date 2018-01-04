// @flow
import {
    map,
    sumBy,
} from 'lodash'
import moment from 'moment'
import {compose, withProps} from 'recompose'
import type {Transaction} from '../flowtypes'
import {formatCurrency} from '../formatting'
import {connectMonthlyFinances} from '../data'
import {TransactionsTable} from './transactions-table'
import {Flex, Box, Heading, Text} from 'rebass'
import React from 'react'


const TransactionsByMonthView = ({
    monthlyTransactions,
}: {|
    monthlyTransactions: {
        month: string,
        transactions: Array<Transaction>,
    },
|}) => (
    <Box pt={3} px={[0, 1, 2, 3]}>
        {map(monthlyTransactions, ({transactions, month}) => (
            <Box pb={3} key={month}>
                <Heading py={3}>
                    {moment().month(month).format('MMMM')}
                </Heading>
                <Flex pb={3}>
                    <Text pr={1} bold >
                        {'Monthly Balance: '}
                    </Text>
                    <Text>
                        {formatCurrency(sumBy(transactions, 'amount'))}
                    </Text>
                </Flex>
                <TransactionsTable transactions={transactions} />
            </Box>
        ))}
    </Box>
)

export const TransactionsByMonth = compose(
    connectMonthlyFinances(),
    withProps(({monthlyFinances}) => ({
        monthlyTransactions: map(monthlyFinances, ({month, transactions, netIncome}) => ({
            month,
            netIncome,
            transactions,
        })),
    })),
)(TransactionsByMonthView)
