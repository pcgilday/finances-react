// @flow
import {
    map,
    sumBy,
} from 'lodash'
import React from 'react'
import {getBudgetProgress} from '../transforms'
import {MonthlySummary} from './monthly-summary'
import {spacing} from './base'
import type {MonthlyFinances} from '../flowtypes'

type DashboardProps = {|
    monthlyFinances: Array<MonthlyFinances>,
|}

export const Dashboard = ({monthlyFinances}: DashboardProps) => (
    <div style={{paddingLeft: spacing[1], paddingRight: spacing[1]}} >
        {map(monthlyFinances, ({month, expenses, income, budget}) => (
            <MonthlySummary
                key={month}
                month={month}
                expenseTotal={sumBy(expenses, 'amount')}
                incomeTotal={sumBy(income, 'amount')}
                budgetProgressItems={getBudgetProgress(expenses, budget)}
            />
        ))}
    </div>
)

