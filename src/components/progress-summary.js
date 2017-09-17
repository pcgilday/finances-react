// @flow
import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {formatCurrency} from '../formatting'
import {
    Flex,
    Text,
    Border,
    Progress,
} from 'rebass'
import theme from './theme'


const StyledLink = styled(Link)`
    text-decoration: none;
`

const StyledProgressSummary = styled(Border)`
    color: ${theme.colors.black};
    &:hover {
        background-color: ${theme.colors.lightGray};
    }
`

export const ProgressSummary = (
    {name, planned, actual, link}:
    {name: string, planned: number, actual: number, link: string},
) => (
    <StyledLink to={link} >
        <StyledProgressSummary p={2} mb={2} borderWidth={2} color='lightGray' >
            <Flex justify='space-between' pb={2} align='baseline' >
                <Text fontSize={[2, 3]} bold >
                    {name}
                </Text>

                <Flex>
                    <Text fontSize={[1, 2]} bold >
                        {formatCurrency(actual)}
                    </Text>
                    <Text fontSize={1} px={1} >
                        {'of'}
                    </Text>
                    <Text fontSize={[1, 2]} bold >
                        {formatCurrency(planned)}
                    </Text>
                </Flex>
            </Flex>
            <Progress
                style={{height: '15px'}}
                value={actual / planned}
                color={actual > planned ? 'red' : 'green'} />
        </StyledProgressSummary>
    </StyledLink>
)
