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

const StyledContainer = styled.div`
    display: flex;
    padding-bottom: ${spacing[2]};
    @media (max-width: 600px) {
        flex-direction: column;
    }
`

export const NetIncome = ({expenseTotal, incomeTotal}: NetIncomeProps) => (
    <StyledContainer>
        <div>
            <Text size={3} style={{paddingRight: spacing[0]}} bold >
                {'Income:'}
            </Text>
            <Text size={3} style={{paddingRight: spacing[2]}} >
                {formatCurrency(incomeTotal)}
            </Text>
        </div>

        <div>
            <Text size={3} style={{paddingRight: spacing[0]}} bold >
                {'Expenses:'}
            </Text>
            <Text size={3} style={{paddingRight: spacing[2]}} >
                {formatCurrency(expenseTotal)}
            </Text>
        </div>

        <div>
            <Text size={3} style={{paddingRight: spacing[0]}} bold >
                {'Net:'}
            </Text>
            <Text size={3} style={{paddingRight: spacing[2]}} >
                {formatCurrency(incomeTotal - expenseTotal)}
            </Text>
        </div>
    </StyledContainer>
)
