// @flow
import {
    map,
    sumBy,
} from 'lodash'
import React from 'react'
import {Box} from 'rebass'
import {getBudgetProgress} from '../transforms'
import type {MonthlyFinances} from '../flowtypes'
import {MonthlySummary} from './monthly-summary'

type DashboardProps = {|
    monthlyFinances: Array<MonthlyFinances>,
|}

export const Dashboard = ({monthlyFinances}: DashboardProps) => (
    <Box px={[0, 1, 2, 3]}>
        {map(monthlyFinances, ({month, expenses, income, budget}) => (
            <Box pb={3}>
                <MonthlySummary
                    key={month}
                    month={month}
                    expenseTotal={sumBy(expenses, 'amount')}
                    incomeTotal={sumBy(income, 'amount')}
                    budgetProgressItems={getBudgetProgress(expenses, budget)}
                />
            </Box>
        ))}
    </Box>
)

