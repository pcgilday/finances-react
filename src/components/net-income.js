// @flow
import React from 'react'
import {formatCurrency} from '../formatting'
import {
    Flex,
    Text,
    spacing,
} from './base'

type NetIncomeProps = {|
    expenseTotal: number,
    incomeTotal: number,
|}

export const NetIncome = ({expenseTotal, incomeTotal}: NetIncomeProps) => (
    <Flex style={{paddingBottom: spacing[2]}}>
        <Text bold style={{paddingRight: spacing[2]}} >
            {`Net: ${formatCurrency(incomeTotal - expenseTotal)}`}
        </Text>
        <Text bold style={{paddingRight: spacing[2]}} >
            {`Income: ${formatCurrency(incomeTotal)}`}
        </Text>
        <Text bold style={{paddingRight: spacing[2]}} >
            {`Expenses: ${formatCurrency(expenseTotal)}`}
        </Text>
    </Flex>
)
