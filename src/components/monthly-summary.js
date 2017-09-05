// @flow
import {map} from 'lodash'
import React from 'react'
import moment from 'moment'
import {
    Heading,
} from './base'
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
        <Heading size={1} >
            {moment().month(month).format('MMMM')}
        </Heading>
        <NetIncome expenseTotal={expenseTotal} incomeTotal={incomeTotal} />
        <div>
            {map(budgetProgressItems, ({category, amountSpent, amountPlanned}) => (
                <ProgressSummary
                    key={category}
                    name={category}
                    planned={amountPlanned}
                    actual={amountSpent} />
            ))}
        </div>
    </div>
)
