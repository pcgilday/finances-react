// @flow
import {
    map,
    sumBy,
} from 'lodash'
import React from 'react'
import styled from 'styled-components'
import {getBudgetProgress} from '../transforms'
import {MonthlySummary} from './monthly-summary'
import type {MonthlyFinances} from '../flowtypes'

type DashboardProps = {|
    monthlyFinances: Array<MonthlyFinances>,
|}

const StyledDashboard = styled.div`
    max-width: 1000px;
`

export const Dashboard = ({monthlyFinances}: DashboardProps) => (
    <StyledDashboard >
        {map(monthlyFinances, ({month, expenses, income, budget}) => (
            <MonthlySummary
                key={month}
                month={month}
                expenseTotal={sumBy(expenses, 'amount')}
                incomeTotal={sumBy(income, 'amount')}
                budgetProgressItems={getBudgetProgress(expenses, budget)}
            />
        ))}
    </StyledDashboard>
)

