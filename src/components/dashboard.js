// @flow
import {
    map,
} from 'lodash'
import React from 'react'
import moment from 'moment'
import {
    Box,
    Flex,
    Heading,
    Text,
} from 'rebass'
import {getBudgetProgress} from '../transforms'
import type {MonthlyFinances, BudgetProgressItem} from '../flowtypes'
import {formatCurrency} from '../formatting'
import {connectMonthlyFinances} from '../data'
import {ProgressSummary} from './progress-summary'


const MonthlySummaryView = ({
    month,
    netIncome,
    budgetProgressItems,
}: {
    month: number,
    budgetProgressItems: Array<BudgetProgressItem>,
    netIncome: number,
}) => (
    <div>
        <Heading py={3} >
            {moment().month(month).format('MMMM')}
        </Heading>
        <Flex>
            <Text pr={2} bold >
                {'Net Income: '}
            </Text>
            <Text>
                {formatCurrency(netIncome)}
            </Text>
        </Flex>
        <Box mt={3}>
            {map(budgetProgressItems, ({category, amountSpent, amountPlanned}) => (
                <ProgressSummary
                    key={category}
                    name={category}
                    planned={amountPlanned}
                    link={`/transactions?category=${category}`}
                    actual={amountSpent} />
            ))}
        </Box>
    </div>
)


const DashboardView = ({
    monthlyFinances,
}: {
    monthlyFinances: Array<MonthlyFinances>,
}) => (
    <Box px={[0, 1, 2, 3]}>
        {map(monthlyFinances, ({month, transactions, budget, netIncome}) => (
            <Box pb={3} key={month}>
                <MonthlySummaryView
                    key={month}
                    month={month}
                    netIncome={netIncome}
                    budgetProgressItems={getBudgetProgress(transactions, budget)}
                />
            </Box>
        ))}
    </Box>
)

export const Dashboard = connectMonthlyFinances()(DashboardView)

