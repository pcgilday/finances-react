// @flow
import {map} from 'lodash'
import React from 'react'
import moment from 'moment'
import {
    Heading,
    Box,
} from 'rebass'
import type {BudgetProgressItem} from '../flowtypes'
import {ProgressSummary} from './progress-summary'
import {NetIncome} from './net-income'


type MonthlySummaryProps = {|
    month: number,
    expenseTotal: number,
    incomeTotal: number,
    budgetProgressItems: Array<BudgetProgressItem>,
|}


export const MonthlySummary = ({
    month,
    expenseTotal,
    incomeTotal,
    net,
    budgetProgressItems,
}: MonthlySummaryProps) => (
    <div>
        <Heading py={3} >
            {moment().month(month).format('MMMM')}
        </Heading>
        <NetIncome expenseTotal={expenseTotal} incomeTotal={incomeTotal} />
        <Box mt={3}>
            {map(budgetProgressItems, ({category, amountSpent, amountPlanned}) => (
                <ProgressSummary
                    key={category}
                    name={category}
                    planned={amountPlanned}
                    link={`/expenses?category=${category}`}
                    actual={amountSpent} />
            ))}
        </Box>
    </div>
)
