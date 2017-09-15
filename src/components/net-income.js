// @flow
import React from 'react'
import styled from 'styled-components'
import {formatCurrency} from '../formatting'
import {
    Text,
    Flex,
} from 'rebass'


const Wrapper = styled(Flex)`
    @media (max-width: 600px) {
        align-items: space-between;
        flex-direction: column;
    }
`

type NetIncomeProps = {|
    expenseTotal: number,
    incomeTotal: number,
|}

export const NetIncome = ({expenseTotal, incomeTotal}: NetIncomeProps) => (
    <Wrapper pb={1}>
        <Flex pr={2} pb={2}>
            <Text fontSize={2} pr={1} bold >
                {'Income:'}
            </Text>
            <Text fontSize={2}>
                {formatCurrency(incomeTotal)}
            </Text>
        </Flex>

        <Flex pr={2} pb={2}>
            <Text fontSize={2} pr={1} bold >
                {'Expenses:'}
            </Text>
            <Text fontSize={2} >
                {formatCurrency(expenseTotal)}
            </Text>
        </Flex>

        <Flex pr={2} pb={2}>
            <Text fontSize={2} pr={1} bold >
                {'Net:'}
            </Text>
            <Text fontSize={2} color={incomeTotal - expenseTotal < 0 ? 'red' : 'green'}>
                {formatCurrency(incomeTotal - expenseTotal)}
            </Text>
        </Flex>
    </Wrapper>
)
