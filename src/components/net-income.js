// @flow
import React from 'react'
import styled from 'styled-components'
import {formatCurrency} from '../formatting'
import {
    Text,
    spacing,
} from './base'

type NetIncomeProps = {|
    expenseTotal: number,
    incomeTotal: number,
|}

const StyledNetIncome = styled.div`
    display: flex;
    padding-bottom: ${spacing[1]};
    @media (max-width: 600px) {
        align-items: space-between;
        flex-direction: column;
    }
`

export const NetIncome = ({expenseTotal, incomeTotal}: NetIncomeProps) => (
    <StyledNetIncome>
        <div style={{paddingBottom: spacing[0]}}>
            <Text size={3} style={{paddingRight: spacing[0]}} bold >
                {'Income:'}
            </Text>
            <Text size={3} style={{paddingRight: spacing[2]}} >
                {formatCurrency(incomeTotal)}
            </Text>
        </div>

        <div style={{paddingBottom: spacing[0]}}>
            <Text size={3} style={{paddingRight: spacing[0]}} bold >
                {'Expenses:'}
            </Text>
            <Text size={3} style={{paddingRight: spacing[2]}} >
                {formatCurrency(expenseTotal)}
            </Text>
        </div>

        <div style={{paddingBottom: spacing[0]}}>
            <Text size={3} style={{paddingRight: spacing[0]}} bold >
                {'Net:'}
            </Text>
            <Text size={3} style={{paddingRight: spacing[2]}} >
                {formatCurrency(incomeTotal - expenseTotal)}
            </Text>
        </div>
    </StyledNetIncome>
)
